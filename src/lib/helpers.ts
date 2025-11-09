// Helper function to provide fallback for null/empty image URLs
export const getValidImageUrl = (imageUrl: string | null | undefined): string => {
  // Return fallback if imageUrl is null, undefined, or empty string
  if (!imageUrl) {
    return '/logo/series-seed.svg'
  }

  return imageUrl
}