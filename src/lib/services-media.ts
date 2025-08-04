import mediaUrls from '@/../../media_urls.json';

const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public';

export class ServicesMediaService {
  static getServicesImages() {
    // Filter for services folder images
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    const serviceImageMap: Record<string, string> = {
      businessEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Business Events'))?.file_url || '/massif/services/ Business Events.jpg'}?quality=90&width=800&height=600`,
      celebrationGalore: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Celebration Galore'))?.file_url || '/massif/services/ Celebration Galore.jpg'}?quality=90&width=800&height=600`,
      inauguration: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Inauguration'))?.file_url || '/massif/services/ Inauguration_.jpg'}?quality=90&width=800&height=600`,
      hybridEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Hybrid Events'))?.file_url || '/massif/services/Copy of Home page 2- Hybrid Events.jpg'}?quality=90&width=800&height=600`,
      specialEvents: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('special events'))?.file_url || '/massif/services/special events.jpg'}?quality=90&width=800&height=600`,
      servicesLanding: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Services- Landing page'))?.file_url || '/massif/services/Services- Landing page_.jpg'}?quality=90&width=800&height=600`,
      conventionMeet: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Convention'))?.file_url || '/massif/services/Copy of Home page 2 -Industry Convention, Customer & Dealers Meet.jpg'}?quality=90&width=800&height=600`,
      generalServices: `${SUPABASE_STORAGE_URL}${servicesImages.find(img => img.file_name.includes('Copy of Home page 2.jpg'))?.file_url || '/massif/services/Copy of Home page 2.jpg'}?quality=90&width=800&height=600`
    };
    
    return serviceImageMap;
  }
  
  static getServicesHeroImages() {
    // Get all services images for hero carousel
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    return servicesImages.map(item => ({
      src: `${SUPABASE_STORAGE_URL}${item.file_url}?quality=85&width=1200&height=800`,
      alt: item.file_name.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/[_-]/g, ' '),
      category: this.getCategoryFromFileName(item.file_name)
    }));
  }
  
  static getServicesGallery() {
    // Get optimized images for gallery display
    const servicesImages = mediaUrls.filter(item => item.path_tokens[0] === 'services');
    
    return servicesImages.map(item => ({
      url: `${SUPABASE_STORAGE_URL}${item.file_url}?quality=80&width=600&height=400`,
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