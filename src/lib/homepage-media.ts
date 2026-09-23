import homepageData from '@/../../homepage.json';

export class HomepageMediaService {
  static getServiceImages() {
    const serviceImageMap: Record<string, string> = {
      businessEvents: '/assets/media/Services/Business Events.jpg',
      celebrationGalore: '/assets/media/Services/Celebration Galore.jpg',
      inauguration: '/assets/media/Services/LaunchesProductsFacility&Operations.jpg',
      dealersMeet: '/assets/media/Services/IndustryConventionCustomer&DealerMeet.jpg',
      hybridEvents: '/assets/media/Services/Hybrid Events .jpg',
      specialProjects: '/assets/media/Services/special events.jpg'
    };

    return serviceImageMap;
  }

  /**
   * Muted background loop. Web encodes of "Intro Video of 2026 - Home page.mp4" (45 MB):
   * 720p ~10 MB for desktop, 480p ~5 MB for phones, no audio track (it plays muted).
   */
  static getHeroVideo() {
    return {
      src: '/assets/videos/home-hero-720.mp4',
      mobileSrc: '/assets/videos/home-hero-480.mp4',
      poster: '/assets/videos/home-hero-poster.webp',
    };
  }

  static getPortfolioImages() {
    // Use Home Page images for "Where Vision Meets Precision" section
    const portfolioImages = [
      '/assets/media/Home Page/home page 3.jpg',
      '/assets/media/Home Page/Home page 3 Cultural Celebration.jpg',
      '/assets/media/Home Page/Home page 3 hybrid events_.jpg',
      '/assets/media/Home Page/home page 3 Team Building.jpg',
      '/assets/media/Home Page/home page 3  Annual Year Celebration.jpg',
      '/assets/media/Home Page/Home page 3 - Award Ceremony.jpg'
    ];

    return portfolioImages;
  }
}