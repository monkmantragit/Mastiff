import mediaUrls from '@/../../media_urls.json';

const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public';

export class ServicesMediaService {
  static getServicesImages() {
    // Filter for services folder images
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    const serviceImageMap: Record<string, string> = {
      businessEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Business Events'))?.file_url || '/massif/ Business Events.jpg'}`,
      celebrationGalore: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Celebration Galore'))?.file_url || '/massif/ Celebration Galore.jpg'}`,
      inauguration: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Inauguration'))?.file_url || '/massif/ Inauguration_.jpg'}`,
      hybridEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Hybrid Events'))?.file_url || '/massif/Copy of Home page 2- Hybrid Events.jpg'}`,
      specialEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('special events'))?.file_url || '/massif/special events.jpg'}`,
      servicesLanding: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Services- Landing page'))?.file_url || '/massif/Services- Landing page_.jpg'}`,
      conventionMeet: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Convention'))?.file_url || '/massif/Copy of Home page 2 -Industry Convention, Customer & Dealers Meet.jpg'}`,
      generalServices: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Copy of Home page 2.jpg'))?.file_url || '/massif/Copy of Home page 2.jpg'}`
    };
    
    return serviceImageMap;
  }
  
  static getServicesHeroImages() {
    // Get all services images for hero carousel
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    return servicesImages.map(item => ({
      src: `${SUPABASE_STORAGE_URL}${item.file_url}`,
      alt: item.file_name.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/[_-]/g, ' '),
      category: this.getCategoryFromFileName(item.file_name)
    }));
  }
  
  static getServicesGallery() {
    // Get optimized images for gallery display
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    return servicesImages.map(item => ({
      url: `${SUPABASE_STORAGE_URL}${item.file_url}`,
      title: item.file_name.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/[_-]/g, ' '),
      category: this.getCategoryFromFileName(item.file_name)
    }));
  }
  
  private static getCategoryFromFileName(fileName: string): string {
    if (fileName.toLowerCase().includes('business events')) return 'Business Events';
    if (fileName.toLowerCase().includes('celebration')) return 'Celebrations';
    if (fileName.toLowerCase().includes('inauguration')) return 'Inaugurations';
    if (fileName.toLowerCase().includes('hybrid')) return 'Hybrid Events';
    if (fileName.toLowerCase().includes('special')) return 'Special Events';
    if (fileName.toLowerCase().includes('convention') || fileName.toLowerCase().includes('dealers')) return 'Conventions';
    return 'Corporate Events';
  }
}