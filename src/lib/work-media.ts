import 'server-only';
import { GalleryImage, PortfolioItem } from '@/types/gallery';
import { directusItems } from './directus-server';
import { getDirectusAssetUrl } from './directus-utils';

/** Portfolio data from Directus. Server-only; the portfolio page passes results as props. */

interface DirectusFile {
  id: string;
  filename_download?: string;
  title?: string;
  type?: string;
}

interface DirectusProject {
  id: number;
  status: string;
  title: string;
  slug: string;
  year: number;
  category?: { id: number; name: string; slug: string; icon: string } | null;
  description: string;
  featured_image?: DirectusFile | null;
  gallery?: Array<DirectusFile | { directus_files_id: DirectusFile }>;
  client_name?: string;
  event_date?: string;
  location?: string;
  sort_order: number;
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];

// Simple SVG placeholder for video tiles.
const VIDEO_FALLBACK_THUMBNAIL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiNGOUE2MjUiLz4KPHA+bHlnb24gcG9pbnRzPSIxNDAsODUgMTQwLDExNSAxNjUsMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSIxNTAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjc3NDgzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WaWRlbyBDbGlwPC90ZXh0Pgo8L3N2Zz4K";

function isVideoFile(mimeType: string, filename: string): boolean {
  if (mimeType.startsWith('video/')) return true;
  const lower = filename.toLowerCase();
  return VIDEO_EXTENSIONS.some(ext => lower.endsWith(ext));
}

async function fetchPublishedProjects(): Promise<DirectusProject[]> {
  const base = { filter: { status: { _eq: 'published' } }, sort: 'sort_order', limit: -1 };

  // Full relations first; if the gallery junction is misconfigured, fall back to fewer
  // relations. Every query keeps the status=published filter so drafts never go public.
  const attempts = [
    { ...base, fields: '*,category.*,featured_image.*,gallery.directus_files_id.*' },
    { ...base, fields: '*,category.*,featured_image.*' },
  ];

  for (const params of attempts) {
    const projects = await directusItems<DirectusProject>('portfolio_projects', params);
    if (projects.length > 0) return projects;
  }
  return [];
}

export class WorkMediaService {
  static async getPortfolioItems(): Promise<PortfolioItem[]> {
    const projects = await fetchPublishedProjects();

    return projects.map(project => {
      const galleryImages: GalleryImage[] = Array.isArray(project.gallery)
        ? project.gallery
            .map(item => ('directus_files_id' in item ? item.directus_files_id : item))
            .filter((file): file is DirectusFile => Boolean(file?.id))
            .map((file): GalleryImage => {
              const mimeType = file.type || '';
              const filename = file.filename_download || '';
              const isVideo = isVideoFile(mimeType, filename);
              return {
                id: file.id,
                url: getDirectusAssetUrl(file.id)!,
                thumbnail: isVideo
                  ? VIDEO_FALLBACK_THUMBNAIL
                  : getDirectusAssetUrl(file.id, { quality: 75, width: 300, height: 200, fit: 'cover' })!,
                title: file.title || project.title,
                alt: file.title || `${project.title} ${isVideo ? 'video' : 'photo'}`,
                type: isVideo ? 'video' : 'image',
                mimeType,
                filename,
                fallbackThumbnail: isVideo ? VIDEO_FALLBACK_THUMBNAIL : undefined,
              };
            })
        : [];

      const firstImage = galleryImages.find(img => img.type === 'image');

      return {
        title: project.title,
        year: project.year ? project.year.toString() : '',
        category: project.category?.name || 'Corporate Event',
        image: project.featured_image?.id
          ? getDirectusAssetUrl(project.featured_image.id, { quality: 85, width: 600, height: 400, fit: 'cover' })!
          : firstImage?.url || '/assets/media/Services/Business Events.jpg',
        description: project.description,
        gallery: galleryImages.map(img => img.url),
        galleryData: galleryImages,
        totalImages: galleryImages.length,
        client_name: project.client_name,
        event_date: project.event_date,
        location: project.location,
      };
    });
  }
}
