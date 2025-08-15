export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  alt: string;
  type: 'image' | 'video';
  mimeType?: string;
  filename?: string;
  fallbackThumbnail?: string; // For videos that can't generate thumbnails
}

export interface PortfolioItem {
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  gallery: string[]; // For backwards compatibility
  galleryData: GalleryImage[]; // Full gallery data for modal
  totalImages: number;
  client_name?: string;
  event_date?: string;
  location?: string;
}