import { config } from "@/config/appConfig";
import { S3Service } from "@/integrations/aws/S3Service";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey
  );

  const { id } = await params;

  const { data, error } = await supabase
    .from("event_mentors")
    .select(
      `
        mentors (
          id,
          first_name,
          last_name,
          bio,
          educations,
          experiences,
          image_url
        )
      `
    )
    .eq("event_id", id);

  if (error) {
    console.error("Error fetching event mentors:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Extract mentors from the nested structure
  const mentors = data?.map((item: any) => item.mentors).filter(Boolean) || [];

  if (mentors.length === 0) {
    return NextResponse.json([]);
  }

  // Process mentor images: use URLs as-is, convert S3 keys to presigned URLs
  const s3Service = new S3Service();
  const mentorsWithUrls = await Promise.all(
    mentors.map(async (mentor) => {
      let imageUrl = mentor.image_url;

      if (mentor.image_url) {
        try {
          // Check if it's already a valid URL
          new URL(mentor.image_url);
          // It's already a URL, use it as-is
          imageUrl = mentor.image_url;
        } catch {
          // Not a URL, assume it's an S3 key and try to generate presigned URL
          const presignedUrl = await s3Service.getPresignedUrl(mentor.image_url);
          imageUrl = presignedUrl || mentor.image_url;
        }
      }

      return {
        ...mentor,
        image_url: imageUrl,
      };
    })
  );

  return NextResponse.json(mentorsWithUrls);
}

