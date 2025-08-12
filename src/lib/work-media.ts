import { GalleryImage, PortfolioItem } from '@/types/gallery';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// Types for Directus data
interface DirectusFile {
  id: string;
  filename_download: string;
  title?: string;
}

interface DirectusCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface DirectusProject {
  id: number;
  status: string;
  title: string;
  slug: string;
  year: number;
  category: DirectusCategory;
  description: string;
  featured_image?: DirectusFile;
  gallery?: DirectusFile[];
  client_name?: string;
  event_date?: string;
  location?: string;
  sort_order: number;
}

export class WorkMediaService {
  // Fetch portfolio projects from Directus
  static async fetchPortfolioProjects(): Promise<DirectusProject[]> {
    try {
      console.log('🔍 Fetching portfolio projects from Directus...');
      
      const url = process.env.NEXT_PUBLIC_DIRECTUS_URL;
      const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;
      
      console.log('🔗 URL:', url);
      console.log('🔑 Token:', token ? `${token.substring(0, 10)}...` : 'NOT FOUND');
      
      if (!url || !token) {
        console.error('❌ Missing Directus configuration');
        throw new Error('Directus URL or token not configured');
      }
      
      // Try multiple query approaches
      const queries = [
        // Primary query with full relations
        `${url}/items/portfolio_projects?fields=*,category.*,featured_image.*,gallery.directus_files_id.*&filter={"status":{"_eq":"published"}}&sort=sort_order`,
        // Fallback query without gallery junction
        `${url}/items/portfolio_projects?fields=*,category.*,featured_image.*&filter={"status":{"_eq":"published"}}&sort=sort_order`,
        // Simple query
        `${url}/items/portfolio_projects?fields=*&filter={"status":{"_eq":"published"}}&sort=sort_order`,
        // Basic query without status filter
        `${url}/items/portfolio_projects?fields=*&sort=sort_order`
      ];
      
      for (let i = 0; i < queries.length; i++) {
        const queryUrl = queries[i];
        console.log(`🔍 Trying query ${i + 1}:`, queryUrl);
        
        try {
          const response = await fetch(queryUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log(`📡 Query ${i + 1} Response status:`, response.status);

          if (response.ok) {
            const data = await response.json();
            console.log(`📊 Query ${i + 1} Fetched projects:`, data);
            
            // Handle both formats: {data: [...]} and [...]
            const projects = data.data || data;
            console.log('📝 Number of projects:', projects?.length || 0);
            
            if (projects && projects.length > 0) {
              console.log('✅ Successfully fetched projects with query', i + 1);
              return projects;
            }
          } else {
            const errorText = await response.text();
            console.error(`❌ Query ${i + 1} Error response:`, errorText);
          }
        } catch (queryError) {
          console.error(`❌ Query ${i + 1} failed:`, queryError);
        }
      }
      
      console.log('⚠️ All queries failed, returning empty array as requested');
      return [];
    } catch (error) {
      console.error('❌ Error fetching portfolio projects:', error);
      console.log('🔄 Returning empty array due to error as requested');
      return [];
    }
  }

  // Fallback data when Directus is not available
  static getFallbackProjects(): DirectusProject[] {
    return [
      {
        id: 1,
        status: 'published',
        title: 'BRIGADE FIESTA 2024',
        slug: 'brigade-fiesta-2024',
        year: 2024,
        category: { id: 1, name: 'Corporate Celebration', slug: 'corporate-celebration', icon: 'heart' },
        description: 'Prestigious corporate celebration showcasing excellence and innovation with world-class entertainment and strategic networking opportunities.',
        featured_image: { id: '68962980-4dfa-4c75-a4c8-0beec0b1c23c', filename_download: 'brigade-hero.jpg' },
        gallery: [
          { id: 'b12fefb7-301a-4cc2-8d93-17fdec269a2a', filename_download: 'brigade-1.jpg' },
          { id: '82e34b3c-9a64-4c17-96ab-d39f8762a7b8', filename_download: 'brigade-2.jpg' },
          { id: '5f6efc5d-55b6-437b-bf1f-361c2700c9b5', filename_download: 'brigade-3.jpg' },
        ],
        client_name: 'Brigade Group',
        event_date: '2024-03-15T00:00:00',
        location: 'Bangalore, Karnataka',
        sort_order: 1
      },
      {
        id: 2,
        status: 'published',
        title: 'CORPORATE EXCELLENCE SUMMIT 2024',
        slug: 'corporate-excellence-summit-2024',
        year: 2024,
        category: { id: 2, name: 'Corporate Events', slug: 'corporate-events', icon: 'briefcase' },
        description: 'Strategic corporate summit bringing together industry leaders to discuss innovation, growth, and future business strategies.',
        featured_image: { id: '7d5fbbe6-eb9a-43a6-904a-6a37d202548e', filename_download: 'summit-hero.jpg' },
        gallery: [
          { id: '6369cbb8-e04f-494b-a4c1-01ffca8b584f', filename_download: 'summit-1.jpg' },
          { id: '4143e304-73d9-4196-a3a3-81cdfa8ede2e', filename_download: 'summit-2.jpg' },
        ],
        client_name: 'Corporate Excellence Group',
        event_date: '2024-06-10T00:00:00',
        location: 'Mumbai, Maharashtra',
        sort_order: 2
      },
      {
        id: 3,
        status: 'published',
        title: 'GRAND AWARDS CEREMONY 2024',
        slug: 'grand-awards-ceremony-2024',
        year: 2024,
        category: { id: 3, name: 'Awards Ceremony', slug: 'awards-ceremony', icon: 'award' },
        description: 'Prestigious awards ceremony honoring excellence and innovation across multiple industries with distinguished guests.',
        featured_image: { id: '298aeb4a-ad59-48be-9bb6-7c36593f3e9f', filename_download: 'awards-hero.jpg' },
        gallery: [
          { id: '4bacfe95-c277-4036-9aa8-ae46fe6163e2', filename_download: 'awards-1.jpg' },
          { id: 'c3c881f3-b4d8-443b-af77-77a372630217', filename_download: 'awards-2.jpg' },
          { id: '8d66b9f6-101d-497a-9e8a-b4aa4cab6041', filename_download: 'awards-3.jpg' },
        ],
        client_name: 'Industry Excellence Foundation',
        event_date: '2024-09-20T00:00:00',
        location: 'New Delhi, Delhi',
        sort_order: 3
      }
    ];
  }

  // Get Directus file URL
  static getDirectusFileUrl(fileId: string, params?: string): string {
    const queryParams = params ? `?${params}` : '';
    return `${DIRECTUS_URL}/assets/${fileId}${queryParams}`;
  }

  // Helper method to detect video files
  static isVideoFile(mimeType: string, filename: string): boolean {
    // Check by MIME type first
    if (mimeType && mimeType.startsWith('video/')) {
      return true;
    }
    
    // Fallback to file extension check
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const lowercaseFilename = filename.toLowerCase();
    
    return videoExtensions.some(ext => lowercaseFilename.endsWith(ext));
  }
  
  static async getWorkImages() {
    const projects = await this.fetchPortfolioProjects();
    const workImageMap: Record<string, string[]> = {};
    
    projects.forEach(project => {
      const key = project.slug.toLowerCase().replace(/\s+/g, '');
      if (project.gallery) {
        workImageMap[key] = project.gallery.map(file => 
          this.getDirectusFileUrl(file.id, 'quality=85&width=800&height=600')
        );
      }
    });
    
    return workImageMap;
  }
  
  static async getWorkHeroImages() {
    const projects = await this.fetchPortfolioProjects();
    return projects.map(project => ({
      src: project.featured_image 
        ? this.getDirectusFileUrl(project.featured_image.id, 'quality=85&width=1200&height=800')
        : project.gallery?.[0] 
          ? this.getDirectusFileUrl(project.gallery[0].id, 'quality=85&width=1200&height=800')
          : '',
      alt: project.title,
      category: project.category.name
    })).filter(item => item.src);
  }
  
  static async getPortfolioItems(): Promise<PortfolioItem[]> {
    const projects = await this.fetchPortfolioProjects();
    console.log('Processing projects:', projects);
    
    return projects.map(project => {
      console.log('Processing project:', project.title, project);
      
      const featuredImage = project.featured_image;
      
      // Process gallery items - handle both images and videos from the junction table structure
      const galleryImages: GalleryImage[] = project.gallery && Array.isArray(project.gallery) 
        ? project.gallery.map((item: any): GalleryImage => {
            // Handle junction table structure: gallery.directus_files_id.*
            const file = item.directus_files_id || item;
            const mimeType = file.type || '';
            const filename = file.filename_download || '';
            const isVideo = this.isVideoFile(mimeType, filename);
            
            return {
              id: file.id,
              url: this.getDirectusFileUrl(file.id),
              thumbnail: isVideo 
                ? this.getDirectusFileUrl(file.id, 'quality=75&width=300&height=200&format=jpg') // Video thumbnail
                : this.getDirectusFileUrl(file.id, 'quality=75&width=300&height=200'),
              title: file.title || project.title,
              alt: file.title || `${project.title} ${isVideo ? 'video' : 'image'}`,
              type: isVideo ? 'video' : 'image',
              mimeType,
              filename
            };
          })
        : [];
      
      return {
        title: project.title,
        year: project.year ? project.year.toString() : '2024',
        category: project.category?.name || 'Unknown',
        image: featuredImage 
          ? this.getDirectusFileUrl(featuredImage.id, 'quality=85&width=600&height=400')
          : '/placeholder-image.jpg',
        description: project.description,
        gallery: galleryImages.map(img => img.url), // For backwards compatibility
        galleryData: galleryImages, // Full gallery data for modal
        totalImages: galleryImages.length,
        client_name: project.client_name,
        event_date: project.event_date,
        location: project.location
      };
    });
  }
  
  static async getProjectImages(projectSlug: string): Promise<string[]> {
    const projects = await this.fetchPortfolioProjects();
    const project = projects.find(p => p.slug === projectSlug);
    return project?.gallery?.map(file => 
      this.getDirectusFileUrl(file.id, 'quality=85&width=800&height=600')
    ) || [];
  }
  
  static getProjectVideos() {
    // Keep static video data for now - can be moved to Directus later
    return [
      {
        url: `${DIRECTUS_URL}/assets/bridage-wm-v3-1.mp4`,
        title: 'BRIGADE FIESTA 2024',
        project: 'brigade-fiesta-2024'
      },
      {
        url: `${DIRECTUS_URL}/assets/grandpmu-aftermovie-6.mp4`,
        title: 'GRAND PMU INDIA 2024',
        project: 'grand-pmu-india-2024'
      },
      {
        url: `${DIRECTUS_URL}/assets/micelio-wm-version-1.mp4`,
        title: 'MICELIO CLEAN MOBILITY SUMMIT 2024',
        project: 'micelio-clean-mobility-summit-2024'
      },
      {
        url: `${DIRECTUS_URL}/assets/withum-2024-1.mp4`,
        title: 'WITHUM SOFT 2024',
        project: 'withum-soft-2024'
      }
    ];
  }
}