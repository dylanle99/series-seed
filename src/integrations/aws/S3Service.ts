import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { config } from '@/config/appConfig'
import { LoggingService } from '@/lib/services/logging-service'

export class S3Service {
  private s3Client: S3Client
  private defaultExpiration: number = 3600 // Default expiration time for presigned URLs (1 hour)

  private loggingService: LoggingService;

  constructor() {
    this.loggingService = new LoggingService();
    const region = config.aws.region;
    const accessKeyId = config.aws.accessKeyId;
    const secretAccessKey = config.aws.secretAccessKey;

    if (!region) {
      this.loggingService.warn('AWS_REGION environment variable is not defined');
    }

    if (!accessKeyId || !secretAccessKey) {
      this.loggingService.warn('AWS credentials are not properly configured');
    }

    this.s3Client = new S3Client({
      region: region || 'us-east-1', // Fallback to a default region
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    })
  }

  async uploadFile(fileBuffer: Buffer, key: string): Promise<string> {
    const bucket = config.aws.bucket;

    if (!bucket) {
      throw new Error('AWS_S3_BUCKET environment variable is not defined');
    }

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
    })

    try {
      await this.s3Client.send(command)

      // Return just the key - the calling code should use getPresignedUrl if it needs a URL
      return key
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error}`)
    }
  }

  async getFileBuffer(key: string): Promise<Buffer> {
    try {
      const bucket = config.aws.bucket;

      if (!bucket) {
        throw new Error('AWS_S3_BUCKET environment variable is not defined');
      }

      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
      });

      const response = await this.s3Client.send(command);
      const chunks: Uint8Array[] = [];

      // @ts-expect-error - 'Body' is actually a Readable stream
      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error) {
      throw new Error(`Failed to get file from S3: ${error}`)
    }
  }

  /**
   * Generates a presigned URL for an S3 object
   * @param key - The S3 key (path to the file)
   * @param expiresIn - How long the URL should be valid for (in seconds)
   * @returns A presigned URL that can be used to access the file
   */
  async getPresignedUrl(key: string | null, expiresIn: number = this.defaultExpiration): Promise<string | null> {
    if (!key) return null;

    try {
      const bucket = config.aws.bucket;

      if (!bucket) {
        this.loggingService.error('AWS_S3_BUCKET environment variable is not defined');
        return null;
      }

      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      // Generate presigned URL
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      this.loggingService.error(`Error generating presigned URL for key ${key}`, { error });
      return null;
    }
  }

  /**
   * Get URLs for multiple S3 keys using presigned URLs
   * @param keys - Array of S3 keys
   * @param expiresIn - How long the URLs should be valid for (in seconds)
   * @returns Array of presigned URLs (maintains 1:1 correspondence with input keys, null for failed URLs)
   */
  async getPresignedUrls(keys: (string | null)[], expiresIn: number = this.defaultExpiration): Promise<(string | null)[]> {
    if (!keys || !Array.isArray(keys) || keys.length === 0) return [];

    // Process all presigned URL promises in parallel
    const urlPromises = keys.map(key => this.getPresignedUrl(key, expiresIn));
    const urls = await Promise.all(urlPromises);

    // Return all URLs including nulls to maintain 1:1 correspondence
    return urls;
  }

  /**
   * Converts an S3 key to a base64 data URL for direct image display
   * @param key - The S3 key (path to the file)
   * @returns Base64 data URL of the image
   */
  async getBase64Image(key: string): Promise<string> {
    try {
      const buffer = await this.getFileBuffer(key);

      // Attempt to determine MIME type from key extension
      const extension = key.split('.').pop()?.toLowerCase();
      let mimeType = 'image/jpeg'; // Default

      // Map common extensions to MIME types
      if (extension === 'png') mimeType = 'image/png';
      else if (extension === 'gif') mimeType = 'image/gif';
      else if (extension === 'svg') mimeType = 'image/svg+xml';
      else if (extension === 'webp') mimeType = 'image/webp';

      // Convert buffer to base64 data URL
      return `data:${mimeType};base64,${buffer.toString('base64')}`;
    } catch (error) {
      this.loggingService.error(`Error getting base64 image for key ${key}`, { error });

      throw new Error(`Failed to get base64 image: ${error}`);
    }
  }

  /**
   * DEPRECATED: This method is no longer recommended as it may not work if the bucket is not properly configured for public access.
   * Use getPresignedUrl instead.
   * 
   * Converts an S3 key to a full URL
   * @param key - The S3 key (path to the file)
   * @returns The full URL to the S3 object
   */
  getS3Url(key: string | null): string | null {
    if (!key) return null;

    const bucket = config.aws.bucket;
    const region = config.aws.region;

    if (!bucket || !region) {
      this.loggingService.error('Missing S3 configuration: bucket or region not defined');
      return null;
    }

    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}
