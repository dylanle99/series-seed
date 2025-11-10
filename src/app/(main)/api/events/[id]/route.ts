import { config } from "@/config/appConfig";
import { S3Service } from "@/integrations/aws/S3Service";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
  );

  const { id } = await params;

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
        banner_image,
        schedule
        `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(null);
  }

  // Handle banner_image: if it's already a URL, use it; otherwise try to generate presigned URL
  let bannerImageUrl = data.banner_image;

  if (data.banner_image) {
    try {
      // Check if it's already a valid URL
      new URL(data.banner_image);
      // It's already a URL, use it as-is
      console.log(`[API] Using existing URL for banner_image: ${data.banner_image}`);
      bannerImageUrl = data.banner_image;
    } catch {
      // Not a URL, assume it's an S3 key and try to generate presigned URL
      console.log(`[API] Generating presigned URL for S3 key: ${data.banner_image}`);
      const s3Service = new S3Service();
      const presignedUrl = await s3Service.getPresignedUrl(data.banner_image);
      bannerImageUrl = presignedUrl || data.banner_image;
      console.log(`[API] Generated URL: ${bannerImageUrl}`);
    }
  }

  return NextResponse.json({
    ...data,
    banner_image: bannerImageUrl,
  });
}