import { 
  type Blog, 
  type Page, 
  type Service, 
  type TeamMember, 
  type LandingPage 
} from './directus';

export class DirectusService {
  /**
   * Get all published blog posts
   */
  static async getBlogPosts(): Promise<Blog[]> {
    try {
      console.log('🔍 Fetching blog posts from Directus...');
      
      const url = process.env.NEXT_PUBLIC_DIRECTUS_URL;
      const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;
      
      console.log('🔗 URL:', url);
      console.log('🔑 Token:', token ? `${token.substring(0, 10)}...` : 'NOT FOUND');
      
      // Include content and slug fields now that they're available
      const response = await fetch(`${url}/items/blog?fields=id,title,slug,content,featured_image,published_date,status,excerpt,tags,category,author,read_time&filter={"status":{"_eq":"published"}}&sort=-published_date&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Fetched posts:', data);
      
      // Handle both formats: {data: [...]} and [...]
      const posts = data.data || data;
      console.log('📝 Number of posts:', posts?.length || 0);
      return posts || [];
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      return [];
    }
  }

  /**
   * Get a single blog post by slug
   */
  static async getBlogPost(slug: string): Promise<Blog | null> {
    try {
      // Include content and slug fields and filter by slug
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/blog?fields=id,title,slug,content,featured_image,published_date,status,excerpt,tags,category,author,read_time&filter={"slug":{"_eq":"${slug}"},"status":{"_eq":"published"}}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const posts = data.data || data;
      return posts[0] || null;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all services
   */
  static async getServices(): Promise<Service[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/services?fields=*&filter={"status":{"_eq":"active"}}&sort=id`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const services = data.data || data;
      return services || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  /**
   * Get a single service by slug
   */
  static async getService(slug: string): Promise<Service | null> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/services?fields=*&filter={"slug":{"_eq":"${slug}"},"status":{"_eq":"active"}}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const services = data.data || data;
      return services[0] || null;
    } catch (error) {
      console.error(`Error fetching service with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get services by category
   */
  static async getServicesByCategory(category: string): Promise<Service[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/services?fields=*&filter={"_and":[{"status":{"_eq":"active"}},{"category":{"_eq":"${category}"}}]}&sort=id`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const services = data.data || data;
      return services || [];
    } catch (error) {
      console.error(`Error fetching services with category "${category}":`, error);
      return [];
    }
  }

  /**
   * Get all team members
   */
  static async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/team_members?fields=*&filter={"status":{"_eq":"active"}}&sort=name`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const teamMembers = data.data || data;
      return teamMembers || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  /**
   * Get all landing pages
   */
  static async getLandingPages(): Promise<LandingPage[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/landing_pages?fields=*&filter={"status":{"_eq":"active"}}&sort=title`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const landingPages = data.data || data;
      return landingPages || [];
    } catch (error) {
      console.error('Error fetching landing pages:', error);
      return [];
    }
  }

  /**
   * Get a single landing page by slug
   */
  static async getLandingPage(slug: string): Promise<LandingPage | null> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/landing_pages?fields=*&filter={"slug":{"_eq":"${slug}"},"status":{"_eq":"active"}}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const landingPages = data.data || data;
      return landingPages[0] || null;
    } catch (error) {
      console.error(`Error fetching landing page with slug ${slug}:`, error);
      return null;
    }
  }

}

// Export types for easy import
export type { Blog, Page, Service, TeamMember, LandingPage }; 