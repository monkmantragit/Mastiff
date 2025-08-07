import homepageData from '@/../../homepage.json';

const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public';

export class HomepageMediaService {
  static getServiceImages() {
    const serviceImageMap: Record<string, string> = {
      businessEvents: `${SUPABASE_STORAGE_URL}/massif/homepage/home page - Business Events.jpg?quality=90&width=800&height=600`,
      celebrationGalore: `${SUPABASE_STORAGE_URL}/massif/homepage/home page - Celebration Galore.jpg?quality=90&width=800&height=600`,
      inauguration: `${SUPABASE_STORAGE_URL}/massif/homepage/Home%20page%20-%20Inauguration_.jpg?quality=90&width=800&height=600`,
      dealersMeet: `${SUPABASE_STORAGE_URL}/massif/homepage/Home%20page%202%20-Industry%20Convention,%20Customer%20&%20Dealers%20Meet.jpg?quality=90&width=800&height=600`,
      hybridEvents: `${SUPABASE_STORAGE_URL}/massif/homepage/Hybrid Events.jpg?quality=90&width=800&height=600`,
      specialProjects: `${SUPABASE_STORAGE_URL}/massif/homepage/Ho,e page - special events.jpg?quality=90&width=800&height=600`
    };
    
    return serviceImageMap;
  }
  
  static getHeroVideo() {
    return `${SUPABASE_STORAGE_URL}/massif/homepage/Landing page - intro video of wm_.mp4`;
  }
  
  static getPortfolioImages() {
    // Get the numbered home page images for portfolio with optimized quality
    const portfolioImages = [
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3.jpg?quality=85&width=600&height=450`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3_.jpg?quality=85&width=600&height=450`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(1).jpg?quality=85&width=600&height=450`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(2).jpg?quality=85&width=600&height=450`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(3).jpg?quality=85&width=600&height=450`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/Home page 3(4).jpg?quality=85&width=600&height=450`
    ];
    
    return portfolioImages;
  }
}