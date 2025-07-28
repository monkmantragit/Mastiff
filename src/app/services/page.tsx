'use client';

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Palette,
  Settings,
  Building2,
  PartyPopper,
  Scissors,
  Monitor,
  Users,
  Star,
  Award,
  Heart,
  Shield
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Hero Images for Carousel
const heroImages = [
  {
    src: "/assets/images/services/DSC01980-scaled-1.jpg",
    alt: "Corporate conference with professional staging",
    category: "Corporate Events"
  },
  {
    src: "/assets/images/services/92A4532-scaled-1.jpg",
    alt: "Cultural celebration with traditional performances",
    category: "Celebrations"
  },
  {
    src: "/assets/images/services/DSC01878-scaled-1.jpg",
    alt: "Grand inauguration ceremony",
    category: "Inaugurations"
  },
  {
    src: "/assets/images/services/DSC02449-scaled-1.jpg",
    alt: "Hybrid event with virtual integration",
    category: "Hybrid Events"
  },
  {
    src: "/assets/images/services/2B6A1363-scaled-1.jpg",
    alt: "Elegant wedding celebration",
    category: "Wedding Planning"
  },
  {
    src: "/assets/images/services/DSC01696-scaled-1.jpg",
    alt: "Cultural festival with community engagement",
    category: "Cultural Events"
  }
];

// Service Categories for Quick Navigation
const serviceCategories = [
  { id: "corporate-events", name: "Business Events", icon: Building2 },
  { id: "celebrations", name: "Corporate Celebrations", icon: PartyPopper },
  { id: "inaugurations", name: "Inaugurations", icon: Scissors },
  { id: "hybrid-events", name: "Hybrid Events", icon: Monitor },
  { id: "conventions", name: "Industry Conventions", icon: Users },
  { id: "special-projects", name: "Special Projects", icon: Star }
];

// Detailed Service Showcases
const serviceShowcases = [
  {
    id: "corporate-events",
    title: "Business Critical Events",
    description: "Where business objectives meet creative brilliance. We don't just host events. We engineer experiences that drive decisions, forge partnerships, and transform companies.",
    mainImage: "/assets/images/services/DSC01980-scaled-1.jpg",
    imageCaption: "Fortune 500 annual summit - 1000+ global leaders",
    gallery: [
      "/assets/images/services/DSC01980-scaled-1.jpg",
      "/assets/images/services/DSC_1942-1536x1025.jpg",
      "/assets/images/services/DSC04807-1536x1024.jpg",
      "/assets/images/services/DSC01247-scaled-1.jpg"
    ],
    features: [
      {
        title: "Strategic Architecture",
        description: "Every detail engineered to amplify your message and achieve measurable business impact"
      },
      {
        title: "Executive Production",
        description: "Cinema-quality AV, immersive staging, and flawless technical orchestration"
      },
      {
        title: "Experience Design",
        description: "Curated journeys that transform attendees into advocates and partners"
      },
      {
        title: "Brand Amplification",
        description: "Your story, magnified. Your values, experienced. Your vision, realized."
      }
    ],
    stats: {
      events: "150+",
      satisfaction: "98%",
      clients: "50+"
    }
  },
  {
    id: "celebrations",
    title: "Celebrations That Echo",
    description: "Life's precious moments deserve more than parties. They deserve experiences that echo through generations. Where tradition meets innovation. Where joy becomes legendary.",
    mainImage: "/assets/images/services/92A4532-scaled-1.jpg",
    imageCaption: "10,000-guest cultural celebration - Pure magic captured",
    gallery: [
      "/assets/images/services/92A4532-scaled-1.jpg",
      "/assets/images/services/P__2970-scaled-1.jpg",
      "/assets/images/services/2B6A0590-1-scaled-1.jpg",
      "/assets/images/services/DSC01901-scaled-1.jpg"
    ],
    features: [
      {
        title: "Cultural Mastery",
        description: "Deep reverence for tradition, bold vision for innovation. Authenticity without compromise."
      },
      {
        title: "Sensory Symphonies",
        description: "Curated experiences that touch every sense. Music that moves. Moments that mesmerize."
      },
      {
        title: "Flawless Orchestration",
        description: "10 guests or 10,000. Every detail perfect. Every moment seamless. Every memory golden."
      },
      {
        title: "Community Soul",
        description: "Celebrations that unite. Experiences that bond. Memories that bind generations."
      }
    ],
    stats: {
      events: "200+",
      satisfaction: "99%",
      clients: "75+"
    }
  },
  {
    id: "inaugurations",
    title: "Launches That Define Eras",
    description: "First impressions last forever. Make yours legendary. From ribbon cuttings to global reveals, we create moments that mark beginnings and define futures.",
    mainImage: "/assets/images/services/DSC01878-scaled-1.jpg",
    imageCaption: "Global product launch - 50M+ impressions generated",
    gallery: [
      "/assets/images/services/DSC01878-scaled-1.jpg",
      "/assets/images/services/DJI_0111-scaled.jpg",
      "/assets/images/services/DSC01514-scaled-1.jpg",
      "/assets/images/services/2B6A0384-scaled-1.jpg"
    ],
    features: [
      {
        title: "Impact Strategy",
        description: "Launches designed to dominate headlines, trending topics, and market conversations"
      },
      {
        title: "VVIP Protocol",
        description: "Red carpet excellence. White glove service. Experiences worthy of world leaders."
      },
      {
        title: "Media Magnetism",
        description: "Moments designed to go viral. Stories built to be shared. Impact measured in millions."
      },
      {
        title: "Symbolic Power",
        description: "Ceremonies that transcend tradition. Moments that become milestones. History in the making."
      }
    ],
    stats: {
      events: "80+",
      satisfaction: "97%",
      clients: "40+"
    }
  }
];



// End-to-End Services
const endToEndServices = [
  {
    title: "Venue Mastery",
    description: "We don't find venues. We discover canvases. Spaces that amplify your vision and elevate every moment.",
    icon: MapPin
  },
  {
    title: "Creative Alchemy", 
    description: "Where imagination meets innovation. Concepts that captivate. Designs that dazzle. Stories that stick.",
    icon: Palette
  },
  {
    title: "Technical Wizardry",
    description: "State-of-the-art production. Cinema-quality experiences. Technology that disappears into magic.",
    icon: Settings
  }
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToService = (serviceId: string) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section with Event-Focused Design - Mobile Optimized */}
      <section ref={heroRef} className="relative min-h-[100vh] sm:min-h-screen flex items-center overflow-hidden">
        {/* Background Image Carousel - Mobile Optimized */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image 
                src={image.src} 
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Enhanced gradient overlay for better mobile readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70 sm:from-black/70 sm:via-black/50 sm:to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Main Hero Content - Mobile Optimized */}
        <div className="relative z-20 w-full mobile-safe-area">
          <div className="max-w-7xl mx-auto mobile-container">
            <div className="flex items-center justify-center min-h-[80vh] py-8 sm:py-0">
              
              {/* Centered Content - Mobile Typography */}
              <div className="text-white text-center max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-display leading-tight mb-6 sm:mb-8 mobile-heading">
                    <span className="text-white">Solutions</span>
                    <span className="text-[#F9A625] block">Not Services</span>
                    <span className="text-white">Results</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto mobile-body-text px-4 sm:px-0">
                    We don't offer services. We deliver solutions. Measurable results. Memories that outlive moments.
                  </p>

                  {/* Event Type Badges - Mobile Optimized */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
                    {['Fortune 500 Events', 'Luxury Weddings', 'Grand Celebrations', 'Global Launches'].map((type, index) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium border border-white/30 hover:bg-white/30 transition-all duration-300 mobile-touch-target"
                      >
                        {type}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons - Touch Optimized */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
                    <Button 
                      className="btn-primary mobile-touch-target text-base sm:text-lg lg:text-xl font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-102 min-h-[48px]"
                    >
                      Start Your Transformation
                      <Sparkles className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="mobile-touch-target border-2 border-white text-white hover:bg-white hover:text-[#2A3959] font-semibold px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg lg:text-xl rounded-2xl transition-all duration-300 hover:scale-102 min-h-[48px]"
                    >
                      <Phone className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                      +91 98450 45466
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Navigation - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30">
          <div className="flex space-x-2">
            {heroImages.map((image, index) => (
              <button
                key={index}
                className={`mobile-touch-target w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-[#F9A625] scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`View ${image.category} image`}
              />
            ))}
          </div>
        </div>

        {/* Event Category Indicator - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-30">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/50 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
          >
            {heroImages[currentImage].category}
          </motion.div>
        </div>
      </section>

      {/* Event Services Categories - Mobile Optimized */}
      <section className="mobile-section-padding bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/30 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold mb-4 sm:mb-6 mobile-touch-target">
              Our Expertise
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-[#2A3959] mb-4 sm:mb-6 leading-tight mobile-heading">
              Six Specialties.
              <span className="text-[#F9A625] block">Infinite Possibilities.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mobile-body-text">
              Masters of every detail. Architects of every emotion. Choose your canvas. We'll create the masterpiece.
            </p>
          </motion.div>

          <div className="mobile-grid">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  className="group relative mobile-card bg-white shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#F9A625]/30 transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 hover:bg-gradient-to-br hover:from-white hover:to-[#F9A625]/5 overflow-hidden mobile-animation"
                  onClick={() => scrollToService(category.id)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#F9A625]/10 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Icon Container - Mobile Optimized */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#F9A625]/20 to-[#F9A625]/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:from-[#F9A625]/30 group-hover:to-[#F9A625]/20 transition-all duration-500 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#F9A625] group-hover:scale-110 transition-all duration-300" />
                    </div>
                    
                    {/* Content - Mobile Typography */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#2A3959] mb-2 sm:mb-3 group-hover:text-[#F9A625] transition-colors duration-300 mobile-heading">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 mobile-body-text">
                      Professional {category.name.toLowerCase()} planning and execution with attention to every detail
                    </p>
                    
                    {/* CTA - Touch Optimized */}
                    <div className="flex items-center justify-center text-[#F9A625] text-sm font-medium group-hover:text-[#2A3959] transition-colors duration-300 mobile-touch-target py-2">
                      <span>Explore Services</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom CTA - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="mobile-card bg-gradient-to-r from-[#2A3959] to-[#1a2332] max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 mobile-heading">Have Something Unique in Mind?</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 mobile-body-text">No vision too bold. No dream too big. Let's create something unprecedented.</p>
              <Button className="btn-primary mobile-touch-target text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl min-h-[48px]">
                Let's Innovate Together
                <Phone className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Showcases - Mobile Optimized */}
      {serviceShowcases.map((service, index) => (
        <section key={service.id} id={service.id} className="mobile-section-padding">
          <div className="max-w-7xl mx-auto mobile-container">
            <div className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content Side - Mobile First */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`order-2 lg:order-none ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <Badge className="mb-4 sm:mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 font-body px-3 sm:px-4 py-2 text-sm mobile-touch-target">
                  {service.title.split(' ')[0]} {service.title.split(' ')[1]}
                </Badge>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display mb-4 sm:mb-6 text-[#2A3959] leading-tight mobile-heading">
                  {service.title}
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 font-body leading-relaxed mobile-body-text">
                  {service.description}
                </p>
                
                {/* Key Features - Mobile Optimized */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9A625] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading text-[#2A3959] mb-1 text-sm sm:text-base mobile-heading">{feature.title}</h4>
                        <p className="text-gray-600 font-body text-xs sm:text-sm mobile-body-text">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Success Metrics - Mobile Optimized */}
                <div className="mobile-card bg-gray-50 mb-6 sm:mb-8">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-display text-[#F9A625] mb-1">{service.stats.events}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-body">Events</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-display text-[#F9A625] mb-1">{service.stats.satisfaction}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-body">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-display text-[#F9A625] mb-1">{service.stats.clients}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-body">Happy Clients</div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="btn-primary mobile-touch-target text-black font-heading px-6 sm:px-8 py-3 sm:py-4 rounded-full min-h-[48px] w-full sm:w-auto"
                >
                  Learn More About {service.title.split(' ')[0]} {service.title.split(' ')[1]}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>
              
              {/* Visual Side - Mobile Optimized */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`order-1 lg:order-none ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                {/* Main Service Image - Mobile Responsive */}
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl mb-4 sm:mb-6">
                  <Image 
                    src={service.mainImage} 
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90 font-body">{service.imageCaption}</p>
                  </div>
                </div>
                
                {/* Gallery Grid - Mobile Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {service.gallery.slice(1, 4).map((image, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden mobile-touch-target">
                      <Image
                        src={image}
                        alt={`${service.title} example ${idx + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-20 sm:h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity mobile-animation"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                  ))}
                </div>
                
                <button className="mt-3 sm:mt-4 text-[#F9A625] hover:text-[#F9A625]/80 font-body text-sm transition-colors mobile-touch-target py-2">
                  View All Photos ({service.gallery.length})
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced Process Timeline - Mobile Optimized */}
      <section className="mobile-section-padding bg-gradient-to-br from-[#2A3959] via-[#1a2332] to-[#0f1419]">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-[#F9A625]/20 text-[#F9A625] border-[#F9A625]/30 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium mb-4 sm:mb-6 mobile-touch-target">
              The Method
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-white mb-4 sm:mb-6 mobile-heading">
              Four Steps to Extraordinary
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mobile-body-text">
              Proven process. Predictable excellence. Every single time.
            </p>
          </motion.div>

          <div className="mobile-grid md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Dream Discovery",
                description: "We don't just take briefs. We uncover dreams. Deep dive into your vision, values, and victory metrics.",
                icon: "💡",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02", 
                title: "Strategic Sculpting",
                description: "Your vision meets our expertise. Strategies carved with precision. Concepts crafted with care.",
                icon: "📋",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Flawless Execution",
                description: "Show time. Every element orchestrated. Every moment choreographed. Perfection, delivered.",
                icon: "⚡",
                color: "from-orange-500 to-red-500"
              },
              {
                step: "04",
                title: "Legacy Creation",
                description: "The event ends. The impact begins. Relationships deepened. Success stories written.",
                icon: "🎯",
                color: "from-green-500 to-emerald-500"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Connection Line - Only Desktop */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-[#F9A625] to-transparent z-10"></div>
                )}
                
                <div className="mobile-card bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 hover:bg-white/15 group-hover:scale-102 sm:group-hover:scale-105 h-full mobile-animation">
                  <div className="text-center">
                    {/* Step Number - Mobile Responsive */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg sm:text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    
                    {/* Process Icon - Mobile Sized */}
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{process.icon}</div>
                    
                    {/* Title - Mobile Typography */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-[#F9A625] transition-colors duration-300 mobile-heading">
                      {process.title}
                    </h3>
                    
                    {/* Description - Mobile Typography */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mobile-body-text">
                      {process.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="mobile-card bg-gradient-to-r from-[#F9A625] to-[#e8951e] max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 mobile-heading">Ready to Get Started?</h3>
              <p className="text-white/90 mb-4 sm:mb-6 mobile-body-text">Let's discuss your event and create something extraordinary together</p>
              <Button className="bg-white text-[#F9A625] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl mobile-touch-target min-h-[48px] w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* End-to-End Services - Mobile Optimized */}
      <section className="mobile-section-padding">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 sm:mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 font-body px-3 sm:px-4 py-2 text-sm mobile-touch-target">
                Complete Solutions
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display mb-4 sm:mb-6 text-[#2A3959] mobile-heading">
                End-to-End Event Management
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-body mobile-body-text">
                Every aspect of your event handled with precision and care
              </p>
            </motion.div>
          </motion.div>

          <div className="mobile-grid md:grid-cols-2 lg:grid-cols-3">
            {endToEndServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mobile-card bg-white shadow-lg hover:shadow-xl transition-all duration-300 group mobile-animation"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F9A625]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#F9A625]/20 transition-colors">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9A625]" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading mb-3 sm:mb-4 text-[#2A3959] group-hover:text-[#F9A625] transition-colors mobile-heading">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-body leading-relaxed text-sm sm:text-base mobile-body-text">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Enhanced Footer CTA Section - Mobile Optimized */}
      <section className="mobile-section-padding bg-gradient-to-br from-[#2A3959] via-[#1a2332] to-[#0f1419]">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mobile-card bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="flex -space-x-2 sm:-space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F9A625] to-[#e8951e] rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-white mb-4 sm:mb-6 mobile-heading">
                  Stop Planning Events.
                  <span className="text-[#F9A625] block">Start Creating Legacies.</span>
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed mobile-body-text">
                  Join the visionaries who don't settle for ordinary. Your extraordinary awaits.
                </p>

                {/* Enhanced Contact Options - Mobile Optimized */}
                <div className="mobile-grid md:grid-cols-3 mb-8 sm:mb-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Call Us Now</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 mobile-body-text">Speak directly with our event specialists</p>
                    <Button variant="outline" className="mobile-touch-target border-white/30 text-white hover:bg-white/10 text-sm sm:text-base min-h-[44px] w-full sm:w-auto">
                      +91 98450 45466
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Email Us</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 mobile-body-text">Get detailed proposals and answers</p>
                    <Button variant="outline" className="mobile-touch-target border-white/30 text-white hover:bg-white/10 text-sm sm:text-base min-h-[44px] w-full sm:w-auto">
                      info@whitemassif.com
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Schedule Meeting</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 mobile-body-text">Book a free consultation session</p>
                    <Button variant="outline" className="mobile-touch-target border-white/30 text-white hover:bg-white/10 text-sm sm:text-base min-h-[44px] w-full sm:w-auto">
                      Book Now
                    </Button>
                  </motion.div>
                </div>

                {/* Primary CTA - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    className="btn-primary mobile-touch-target text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl min-h-[48px] w-full sm:w-auto"
                  >
                    Transform Your Vision Today
                    <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                  
                  <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm text-center px-4 sm:px-0">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Free consultation • Zero obligation • 24hr response</span>
                  </div>
                </div>

                {/* Trust Indicators - Mobile Optimized */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <span className="text-xs sm:text-sm">Fully Insured & Licensed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="text-xs sm:text-sm">Award-Winning Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      <span className="text-xs sm:text-sm">99% Client Satisfaction</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 