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
      
      // Fix the query to properly fetch the gallery files through the junction table
      const queryUrl = `${url}/items/portfolio_projects?fields=*,category.*,featured_image.*,gallery.directus_files_id.*&filter={"status":{"_eq":"published"}}&sort=sort_order`;
      
      const response = await fetch(queryUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Fetched projects:', data);
      
      // Handle both formats: {data: [...]} and [...]
      const projects = data.data || data;
      console.log('📝 Number of projects:', projects?.length || 0);
      return projects || [];
    } catch (error) {
      console.error('❌ Error fetching portfolio projects:', error);
      return [];
    }
  }

  // Get Directus file URL
  static getDirectusFileUrl(fileId: string, params?: string): string {
    const queryParams = params ? `?${params}` : '';
    return `${DIRECTUS_URL}/assets/${fileId}${queryParams}`;
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
      
      // Process gallery images - handle the junction table structure
      const galleryImages: GalleryImage[] = project.gallery && Array.isArray(project.gallery) 
        ? project.gallery.map((item: any): GalleryImage => {
            // Handle junction table structure: gallery.directus_files_id.*
            const file = item.directus_files_id || item;
            return {
              id: file.id,
              url: this.getDirectusFileUrl(file.id, 'quality=85&width=1200&height=800'),
              thumbnail: this.getDirectusFileUrl(file.id, 'quality=75&width=300&height=200'),
              title: file.title || project.title,
              alt: file.title || `${project.title} gallery image`
            };
          })
        : [];
      
      return {
        title: project.title,
        year: project.year.toString(),
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