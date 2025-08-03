import homepageData from '@/../../homepage.json';

const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public';

export class HomepageMediaService {
  static getServiceImages() {
    const serviceImageMap: Record<string, string> = {
      businessEvents: `${SUPABASE_STORAGE_URL}/massif/homepage/home page - Business Events.jpg`,
      celebrationGalore: `${SUPABASE_STORAGE_URL}/massif/homepage/home page - Celebration Galore.jpg`,
      inauguration: `${SUPABASE_STORAGE_URL}/massif/homepage/Home page - Inaugurations.jpg`,
      dealersMeet: `${SUPABASE_STORAGE_URL}/massif/homepage/Home page - Dealers meet_.jpg`,
      hybridEvents: `${SUPABASE_STORAGE_URL}/massif/homepage/Hybrid Events.jpg`,
      specialProjects: `${SUPABASE_STORAGE_URL}/massif/homepage/Ho,e page - special events.jpg`
    };
    
    return serviceImageMap;
  }
  
  static getHeroVideo() {
    return `${SUPABASE_STORAGE_URL}/massif/homepage/Landing page - intro video of wm_.mp4`;
  }
  
  static getPortfolioImages() {
    // Get the numbered home page images for portfolio
    const portfolioImages = [
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3.jpg`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3_.jpg`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(1).jpg`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(2).jpg`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/home page 3(3).jpg`,
      `${SUPABASE_STORAGE_URL}/massif/homepage/Home page 3(4).jpg`
    ];
    
    return portfolioImages;
  }
}