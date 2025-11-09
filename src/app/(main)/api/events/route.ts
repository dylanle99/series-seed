import { config } from "@/config/appConfig";
import { S3Service } from "@/integrations/aws/S3Service";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
  );

  const { data, error } = await supabase
    .from("events")
    .select(
      `
        id,
        title,
        occured_at,
        type,
        in_person_location,
        virtual_location,
        description,
        banner_image
      `
    );

  if (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json([]);
  }

  // Process banner images: use URLs as-is, convert S3 keys to presigned URLs
  const s3Service = new S3Service();
  const eventsWithUrls = await Promise.all(
    data.map(async (event) => {
      let bannerImageUrl = event.banner_image;

      if (event.banner_image) {
        try {
          // Check if it's already a valid URL
          new URL(event.banner_image);
          // It's already a URL, use it as-is
          bannerImageUrl = event.banner_image;
        } catch {
          // Not a URL, assume it's an S3 key and try to generate presigned URL
          const presignedUrl = await s3Service.getPresignedUrl(event.banner_image);
          bannerImageUrl = presignedUrl || event.banner_image;
        }
      }

      return {
        ...event,
        banner_image: bannerImageUrl,
      };
    })
  );

  return NextResponse.json(eventsWithUrls);
}