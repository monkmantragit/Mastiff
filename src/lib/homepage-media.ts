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

  static getHeroVideo() {
    return '/assets/videos/Intro%20Video%20of%202026%20-%20Home%20page.mp4';
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