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
  Church,
  Theater,
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
  { id: "corporate-events", name: "Corporate Events", icon: Building2 },
  { id: "celebrations", name: "Celebrations", icon: PartyPopper },
  { id: "inaugurations", name: "Inaugurations", icon: Scissors },
  { id: "hybrid-events", name: "Hybrid Events", icon: Monitor },
  { id: "wedding-planning", name: "Wedding Planning", icon: Church },
  { id: "cultural-events", name: "Cultural Events", icon: Theater }
];

// Detailed Service Showcases
const serviceShowcases = [
  {
    id: "corporate-events",
    title: "Corporate Events & Conferences",
    description: "Professional events that drive business results and strengthen team relationships. From strategic planning to flawless execution, we ensure your corporate message resonates.",
    mainImage: "/assets/images/services/DSC01980-scaled-1.jpg",
    imageCaption: "Annual corporate conference for 500+ attendees",
    gallery: [
      "/assets/images/services/DSC01980-scaled-1.jpg",
      "/assets/images/services/DSC_1942-1536x1025.jpg",
      "/assets/images/services/DSC04807-1536x1024.jpg",
      "/assets/images/services/DSC01247-scaled-1.jpg"
    ],
    features: [
      {
        title: "Strategic Planning",
        description: "Complete event strategy aligned with business objectives and ROI goals"
      },
      {
        title: "Professional Production",
        description: "High-quality AV, staging, and technical production for seamless presentations"
      },
      {
        title: "Attendee Management",
        description: "Registration, check-in, networking facilitation, and experience management"
      },
      {
        title: "Brand Integration",
        description: "Seamless brand messaging and visual identity throughout the event"
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
    title: "Celebrations & Festivals",
    description: "Joyful celebrations that bring people together and create lasting memories. We honor traditions while adding contemporary flair to make every celebration extraordinary.",
    mainImage: "/assets/images/services/92A4532-scaled-1.jpg",
    imageCaption: "Cultural festival with traditional performances and modern staging",
    gallery: [
      "/assets/images/services/92A4532-scaled-1.jpg",
      "/assets/images/services/P__2970-scaled-1.jpg",
      "/assets/images/services/2B6A0590-1-scaled-1.jpg",
      "/assets/images/services/DSC01901-scaled-1.jpg"
    ],
    features: [
      {
        title: "Cultural Sensitivity",
        description: "Respectful planning that honors traditions, customs, and cultural significance"
      },
      {
        title: "Entertainment Curation",
        description: "Diverse programming including music, dance, performances, and interactive experiences"
      },
      {
        title: "Logistics Management",
        description: "Crowd management, security coordination, and vendor management for large gatherings"
      },
      {
        title: "Community Engagement",
        description: "Local partnerships and community involvement for authentic celebrations"
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
    title: "Product Launches & Inaugurations",
    description: "Grand openings and product launches that make a statement. We create memorable moments that generate buzz and establish your brand presence in the market.",
    mainImage: "/assets/images/services/DSC01878-scaled-1.jpg",
    imageCaption: "Grand inauguration with VIP guests and media coverage",
    gallery: [
      "/assets/images/services/DSC01878-scaled-1.jpg",
      "/assets/images/services/DJI_0111-scaled.jpg",
      "/assets/images/services/DSC01514-scaled-1.jpg",
      "/assets/images/services/2B6A0384-scaled-1.jpg"
    ],
    features: [
      {
        title: "Launch Strategy",
        description: "Comprehensive launch planning with market impact and media coverage goals"
      },
      {
        title: "VIP Experience",
        description: "Exclusive experiences for dignitaries, stakeholders, and key guests"
      },
      {
        title: "Media Management",
        description: "Press coordination, photo opportunities, and media kit distribution"
      },
      {
        title: "Ceremonial Elements",
        description: "Traditional ceremonies, ribbon cutting, and symbolic moments"
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
    title: "Venue Sourcing",
    description: "Choosing the perfect venue that aligns with your event goals, budget, and guest experience expectations.",
    icon: MapPin
  },
  {
    title: "Creative Conceptualization", 
    description: "From broader vision to finest details, we craft inspiring concepts that blend creativity with precision execution.",
    icon: Palette
  },
  {
    title: "Production & Technical",
    description: "Complete technical production including lighting, sound, staging, AV equipment, and live streaming capabilities.",
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
      {/* Hero Section with Event-Focused Design */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Carousel */}
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
              />
              {/* Enhanced gradient overlay for better header visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Main Hero Content - Single Column */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[80vh]">
              
              {/* Centered Content */}
              <div className="text-white text-center max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-6xl lg:text-8xl font-display leading-tight mb-8">
                    <span className="text-white">Crafting</span>
                    <span className="text-[#F9A625] block">Unforgettable</span>
                    <span className="text-white">Experiences</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
                    From corporate conferences to dream weddings, we transform your vision into extraordinary events that leave lasting impressions.
                  </p>

                  {/* Event Type Badges */}
                  <div className="flex flex-wrap gap-4 justify-center mb-12">
                    {['Corporate Events', 'Weddings', 'Celebrations', 'Product Launches'].map((type, index) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-medium border border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        {type}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-[#F9A625] hover:bg-[#e8951e] text-white font-bold px-12 py-5 text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Plan Your Event
                      <Sparkles className="ml-3 w-6 h-6" />
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-[#2A3959] font-semibold px-12 py-5 text-xl rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Phone className="mr-3 w-6 h-6" />
                      Call Now
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-8 right-8 z-30">
          <div className="flex space-x-2">
            {heroImages.map((image, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-[#F9A625] scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Event Category Indicator */}
        <div className="absolute bottom-8 left-8 z-30">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            {heroImages[currentImage].category}
          </motion.div>
        </div>
      </section>

      {/* Event Services Categories */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/30 px-6 py-3 text-sm font-bold mb-6">
              🎭 Event Specializations
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6 leading-tight">
              Every Event Type,
              <span className="text-[#F9A625] block">Perfectly Executed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we specialize in creating memorable experiences across all event categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#F9A625]/30 transition-all duration-500 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-white hover:to-[#F9A625]/5 overflow-hidden"
                  onClick={() => scrollToService(category.id)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F9A625]/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Icon Container */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#F9A625]/20 to-[#F9A625]/10 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:from-[#F9A625]/30 group-hover:to-[#F9A625]/20 transition-all duration-500 group-hover:scale-110">
                      <IconComponent className="w-10 h-10 text-[#F9A625] group-hover:scale-110 transition-all duration-300" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#2A3959] mb-3 group-hover:text-[#F9A625] transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Professional {category.name.toLowerCase()} planning and execution with attention to every detail
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-center text-[#F9A625] text-sm font-medium group-hover:text-[#2A3959] transition-colors duration-300">
                      <span>Explore Services</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-[#2A3959] to-[#1a2332] rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Don&apos;t See Your Event Type?</h3>
              <p className="text-gray-300 mb-6">We customize our services for any occasion. Let&apos;s discuss your unique requirements.</p>
              <Button size="lg" className="bg-[#F9A625] hover:bg-[#e8951e] text-white font-semibold px-8 py-3 rounded-2xl">
                Discuss Custom Event
                <Phone className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Showcases */}
      {serviceShowcases.map((service, index) => (
        <section key={service.id} id={service.id} className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content Side */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <Badge className="mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 font-body">
                  {service.title.split(' ')[0]} {service.title.split(' ')[1]}
                </Badge>
                
                <h2 className="text-4xl font-display mb-6 text-[#2A3959] leading-tight">
                  {service.title}
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 font-body leading-relaxed">
                  {service.description}
                </p>
                
                {/* Key Features */}
                <div className="space-y-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F9A625] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading text-[#2A3959] mb-1">{feature.title}</h4>
                        <p className="text-gray-600 font-body text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Success Metrics */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-display text-[#F9A625] mb-1">{service.stats.events}</div>
                      <div className="text-sm text-gray-600 font-body">Events</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display text-[#F9A625] mb-1">{service.stats.satisfaction}</div>
                      <div className="text-sm text-gray-600 font-body">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display text-[#F9A625] mb-1">{service.stats.clients}</div>
                      <div className="text-sm text-gray-600 font-body">Happy Clients</div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-heading px-8 py-4 rounded-full"
                >
                  Learn More About {service.title.split(' ')[0]} {service.title.split(' ')[1]}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              
              {/* Visual Side */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={index % 2 === 1 ? 'lg:col-start-1' : ''}
              >
                {/* Main Service Image */}
                <div className="relative rounded-lg overflow-hidden shadow-2xl mb-6">
                  <Image 
                    src={service.mainImage} 
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90 font-body">{service.imageCaption}</p>
                  </div>
                </div>
                
                {/* Gallery Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {service.gallery.slice(1, 4).map((image, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${service.title} example ${idx + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 text-[#F9A625] hover:text-[#F9A625]/80 font-body text-sm transition-colors">
                  View All Photos ({service.gallery.length})
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced Process Timeline */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2A3959] via-[#1a2332] to-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#F9A625]/20 text-[#F9A625] border-[#F9A625]/30 px-4 py-2 text-sm font-medium mb-6">
              🚀 Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Your Event Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final execution, we guide you through every step with precision and care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Consultation",
                description: "We start by understanding your vision, goals, and requirements through detailed consultations",
                icon: "💡",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02", 
                title: "Strategic Planning",
                description: "Our team creates a comprehensive event strategy with timelines, budgets, and creative concepts",
                icon: "📋",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Execution & Coordination",
                description: "We handle all logistics, vendor management, and on-site coordination with military precision",
                icon: "⚡",
                color: "from-orange-500 to-red-500"
              },
              {
                step: "04",
                title: "Success & Follow-up",
                description: "Post-event analysis, feedback collection, and maintaining relationships for future events",
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
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-[#F9A625] to-transparent z-10"></div>
                )}
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 hover:bg-white/15 group-hover:scale-105 h-full">
                  <div className="text-center">
                    {/* Step Number */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    
                    {/* Process Icon */}
                    <div className="text-4xl mb-4">{process.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F9A625] transition-colors duration-300">
                      {process.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-[#F9A625] to-[#e8951e] rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                             <p className="text-white/90 mb-6">Let&apos;s discuss your event and create something extraordinary together</p>
              <Button size="lg" className="bg-white text-[#F9A625] hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* End-to-End Services */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 font-body">
                Complete Solutions
              </Badge>
              <h2 className="text-4xl font-display mb-6 text-[#2A3959]">
                End-to-End Event Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
                Every aspect of your event handled with precision and care
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {endToEndServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#F9A625]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F9A625]/20 transition-colors">
                  <service.icon className="w-8 h-8 text-[#F9A625]" />
                </div>
                <h3 className="text-xl font-heading mb-4 text-[#2A3959] group-hover:text-[#F9A625] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Enhanced Footer CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2A3959] via-[#1a2332] to-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-8">
                  <div className="flex -space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F9A625] to-[#e8951e] rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                  Ready to Create Your
                  <span className="text-[#F9A625] block">Perfect Event?</span>
                </h2>
                
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Join hundreds of satisfied clients who have trusted us with their most important moments. 
                  Let&apos;s transform your vision into an unforgettable reality.
                </p>

                {/* Enhanced Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300"
                  >
                    <Phone className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Call Us Now</h3>
                    <p className="text-gray-300 text-sm mb-4">Speak directly with our event specialists</p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      +1 (555) 123-4567
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300"
                  >
                    <Mail className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-gray-300 text-sm mb-4">Get detailed proposals and answers</p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      hello@masifevents.com
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300"
                  >
                    <Calendar className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Schedule Meeting</h3>
                    <p className="text-gray-300 text-sm mb-4">Book a free consultation session</p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Book Now
                    </Button>
                  </motion.div>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-[#F9A625] hover:bg-[#e8951e] text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    Get Your Free Consultation
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                  
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Free consultation • No commitment • Quick response</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-sm">Fully Insured & Licensed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">Award-Winning Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-sm">99% Client Satisfaction</span>
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