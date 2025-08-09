'use client';

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePopup } from "@/components/popup-provider";

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

// Service Categories for Quick Navigation
const serviceCategories = [
  { id: "corporate-events", name: "Business Events", icon: Building2 },
  { id: "celebrations", name: "Celebrations Galore", icon: PartyPopper },
  { id: "inaugurations", name: "Launches", icon: Scissors },
  { id: "hybrid-events", name: "", icon: Monitor },
  { id: "conventions", name: "Industry Conventions", icon: Users },
  { id: "special-projects", name: "Special Projects", icon: Star }
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { openPopup } = usePopup();


  // Detailed Service Showcases
  const serviceShowcases = [
  {
    id: "corporate-events",
    title: "Business Critical Events - Conferences | All Hands | Kick Offs | Summits",
    description: "We specialize in crafting extraordinary business conferences that inspire, educate, and propel organizations to new heights. At White Massif, we understand that the success of your business conference is crucial to achieving your organizational objectives. With a commitment to excellence, innovation, and a client-centric approach, we go above and beyond to deliver conferences that leave a lasting impression. From thought-provoking content to unparalleled networking opportunities, our conferences are designed to inspire, educate, and empower.",
    buttonText: "Plan your event",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Business%20Events.jpg",
    imageCaption: "Fortune 500 annual summit - 1000+ global leaders",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Business%20Events.jpg"
    ],
    extendedDescription: "Specializing in conference management, we collaborate with the best partners in the industry to orchestrate a diverse range of conferences and meetings tailored to various needs. Whether it's business conferences, global summits, symposiums, trade conferences & exhibitions, corporate annual kick offs or all hands sessions with the Leadership team from both India and abroad, we cover it all.\n\nOur team understands your needs, objectives, and brand goals, translating them into meticulously planned, creative, innovative, and impactful event experiences both domestically and internationally. Our comprehensive solutions encompasses budgeting, location planning, logistics, itinerary coordination, delegate management, local experiences, curated entertainment and the integration of cutting-edge technology & suitable infrastructure for business meetings. Our team of seasoned experts thoroughly comprehends your unique requirements and crafts a meticulously tailored plan to meet your specific needs.",
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
      events: "300+",
      satisfaction: "98%",
      clients: "Fortune 500"
    }
  },
  {
    id: "celebrations",
    title: "Celebrations Galore - Annual Day Celebration | Themed Celebrations | Team Offsite | Employee Engagement | Rewards & Recognition",
    description: "Celebrate your success with style and distinction. At White Massif, we understand that corporate celebrations go beyond just marking a date on the calendar. We believe that moments of success, milestones, and achievements deserve to be celebrated in grandeur. These events are opportunities to strengthen team bonds, enhance corporate culture, and showcase your organization's achievements.",
    buttonText: "Turn your idea into reality",
    extendedDescription: "With our dedicated team and meticulous planning, we ensure that every celebration becomes a memorable and impactful event. Let us be your dedicated partner in creating unforgettable moments that resonate with your team and stakeholders.",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Celebration%20Galore.jpg",
    imageCaption: "10,000-guest cultural celebration - Pure magic captured",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Celebration%20Galore.jpg"
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
      events: "400+",
      satisfaction: "99%",
      clients: "Corporates"
    }
  },
  {
    id: "inaugurations",
    title: "Launches - Products, Facility & Operations",
    description: "Launching a new product, service, or brand is a momentous occasion that demands a grand and impactful celebration. Through years of experience launching diverse products, facilities, vehicles and brands, we have gained valuable insights into what leaves a lasting impression on the audience at the same time adapting to new innovations and trends to achieve the same.",
    buttonText: "Find the perfect venue",
    extendedDescription: "At White Massif, we understand that a successful launch is more than just an event – it's the beginning of a journey towards success. With our dedicated team, attention to detail, and commitment to excellence, we ensure that your launch event becomes a powerful catalyst for your brand's future achievements. From strategic planning to flawless execution, we are your partner in turning your vision into a spectacular reality.",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Inauguration_.jpg",
    imageCaption: "Global product launch - 50M+ impressions generated",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/%20Inauguration_.jpg"
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
      events: "200+",
      satisfaction: "97%",
      clients: "Industry Leaders"
    }
  },
  {
    id: "hybrid-events",
    title: "",
    description: "Tailor made services to seamlessly execute hybrid events, combining the best of in-person and virtual components for a dynamic and engaging experience.",
    buttonText: "Let's customise a theme for your event",
    extendedDescription: "In these unparalleled times, we have fortified ourselves with advanced technical expertise and a refined skill set to proficiently orchestrate exceptional solutions to engage your colleagues, connect with stakeholders, host rewards and recognition events, unveil new products and services, and conduct fireside chats and leadership addresses—all executed either virtually or through a hybrid model. We achieve this through cutting-edge technology, innovative approaches, and the seamless integration of multiple applications streamed via virtual platforms. Our successful track record includes managing a spectrum of virtual events, from conferences, panel discussions, fireside chats, town halls, employee engagement and annual day celebrations.",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Copy%20of%20Home%20page%202-%20Hybrid%20Events.jpg",
    imageCaption: "Hybrid event with global reach",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Copy%20of%20Home%20page%202-%20Hybrid%20Events.jpg"
    ],
    features: [
      {
        title: "Virtual Excellence",
        description: "Cutting-edge technology for seamless virtual experiences"
      },
      {
        title: "Hybrid Integration",
        description: "Perfect blend of physical and digital engagement"
      },
      {
        title: "Global Reach",
        description: "Connect audiences worldwide with innovative solutions"
      },
      {
        title: "Interactive Design",
        description: "Engaging experiences that captivate both in-person and virtual attendees"
      }
    ],
    stats: {
      events: "250+",
      satisfaction: "96%",
      clients: "Global Teams"
    }
  },
  {
    id: "conventions",
    title: "Industry Convention, Customer & Dealer Meet",
    description: "In an ever-evolving business landscape staying at the forefront of innovation, collaboration, and knowledge exchange is paramount. Establishing regular meet-and-greet sessions with industry experts, customers, dealers is essential for a business.",
    buttonText: "Book corporate entertainment",
    extendedDescription: "This practice not only cultivates robust and enduring professional and personal relationships but also fosters loyalty, provides insights into the industry, customer perspectives, gathers feedback on market conditions, and disseminates crucial information about new products, services, or offers. Hosting these events creates an environment where thought leaders, professionals, stakeholders and enthusiasts converge for an immersive experience like no other.",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Copy%20of%20Home%20page%202%20-Industry%20Convention,%20Customer%20&%20Dealers%20Meet.jpg",
    imageCaption: "Industry convention bringing leaders together",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Copy%20of%20Home%20page%202%20-Industry%20Convention,%20Customer%20&%20Dealers%20Meet.jpg"
    ],
    features: [
      {
        title: "Networking Excellence",
        description: "Facilitating meaningful connections between industry leaders"
      },
      {
        title: "Knowledge Exchange",
        description: "Platforms for sharing insights and best practices"
      },
      {
        title: "Relationship Building",
        description: "Strengthening business partnerships and loyalty"
      },
      {
        title: "Market Intelligence",
        description: "Gathering valuable feedback and market insights"
      }
    ],
    stats: {
      events: "200+",
      satisfaction: "98%",
      clients: "Global Brands"
    }
  },
  {
    id: "special-projects",
    title: "Special Projects",
    description: "In a world where one-size-fits-all doesn't suffice, We design tailor-made experiences, where every detail is meticulously crafted to align with the unique vision, preferences, and objectives of our clients.",
    buttonText: "Streamline event logistics",
    extendedDescription: "From large scale public events, fundraising events, art & music festivals, cross - city biking events, setting up unique experiences we have delivered it all. These endeavors showcase our commitment to tailoring projects to fulfill the objectives",
    mainImage: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/special%20events.jpg",
    imageCaption: "Unique special project execution",
    gallery: [
      "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/special%20events.jpg"
    ],
    features: [
      {
        title: "Custom Solutions",
        description: "Tailor-made experiences for unique requirements"
      },
      {
        title: "Creative Innovation",
        description: "Out-of-the-box thinking for extraordinary events"
      },
      {
        title: "Versatile Expertise",
        description: "From festivals to fundraisers, we do it all"
      },
      {
        title: "Objective Focus",
        description: "Every detail aligned with your specific goals"
      }
    ],
    stats: {
      events: "300+",
      satisfaction: "99%",
      clients: "Institutions"
    }
  }
];



// End-to-End Services
const endToEndServices = [
  {
    title: "Venue Sourcing",
    description: "Choosing the right venue is a make-or-break decision in event planning, shaping the overall success and atmosphere. At White Massif, we go the extra mile by providing complimentary venue planning services. With our diverse experience in different venues, we tailor selections to meet client needs, carefully considering factors such as seating, location, and availability. We stay ahead of industry trends, ensuring we deliver the optimal venue for our clients' events, all without additional costs.",
    icon: MapPin
  },
  {
    title: "Curation & Conceptualisation", 
    description: "From the broader vision to the finer details, we craft an inspiring and unique concept. Our approach considers seamlessly blending creativity and precision to deliver unparalleled success to your event. Planning a successful event involves thorough attention to detail. At White Massif, our team of highly skilled professionals collaborate to bring your vision to life. Every element is meticulously crafted to seamlessly align with the overall theme, leaving an indelible impression on event attendees.",
    icon: Palette
  },
  {
    title: "Production - Fabrication, Infrastructure & Technicals",
    description: "Upon finalizing the event concept, the production phase unfolds to breathe life into ideas and concepts. This includes the meticulous execution of themes, lighting, stage design, seating arrangements, decor, event branding, innovative displays, audio systems, visual effects, and more — all held to the highest standards. As a prominent event management company in Bangalore, we have a proven track record of delivering sophisticated and uniquely themed events. Each event is meticulously tailored to not only mirror the chosen theme but also encapsulate the essence of the client company and brand.",
    icon: Settings
  },
  {
    title: "Entertainment Curation",
    description: "We firmly believe that entertainment plays a crucial role in any event, with the primary challenge being to sustain audience engagement. Consequently, we consider it our duty to offer our clients only the finest options in terms of event entertainment. Whether it's outstanding dance groups, captivating African beats, impressive emceeing skills, or stand-up comedy performances, we are committed to ensuring that your event achieves resounding success. By collaborating with some of the most esteemed artists across India, we take the time to comprehend our clients' needs. Once the theme or idea is finalized, we present our clients with a carefully curated list of relevant performers and artists.",
    icon: PartyPopper
  },
  {
    title: "Show Flow Management",
    description: "We are proud to be one of the only few event agencies to have specialist show callers as part of our team which helps us in delivering seamless event show flows. Understanding the uniqueness of each event, our team collaborates closely with the clients to customize a flow aligned with your goals, theme, and audience preferences. We meticulously plan and execute a detailed timeline, including key milestones, transitions, and entertainment segments. Our expertise lies in stitching all the variables together to ensure a smooth transition between different event segments, adapting to dynamic changes as needed.",
    icon: Calendar
  },
  {
    title: "Merchandising, Event Documentation & Other Support Services",
    description: "We support our clients by extending our services to include gifting solutions and merchandising solutions. Whether it's creating unique and personalized gifts or assembling thoughtful welcome kits, we ensure that each item contributes to the overall success and ambiance of your event. A perfect event requires the art of capturing the cherished moments, ensuring that every smile, every emotion, and every detail is immortalized in timeless photographs and captivating videos. We also offer a dedicated on-site event support team that takes charge of various responsibilities, including managing merchandise, overseeing the registration desk, coordinating photo booths, and addressing any unexpected issues that may arise.",
    icon: Award
  }
];


  const scrollToService = (serviceId: string) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section with Event-Focused Design - Mobile Optimized */}
      <section ref={heroRef} className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Background Image - Mobile Optimized */}
        <div className="absolute inset-0">
          <Image 
            src="https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Services-%20Landing%20page_.jpg" 
            alt="White Massif Services - Event Management"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Enhanced gradient overlay for better mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70 sm:from-black/70 sm:via-black/50 sm:to-black/60"></div>
        </div>

        {/* Main Hero Content - Mobile Optimized */}
        <div className="relative z-20 w-full mobile-safe-area">
          <div className="max-w-7xl mx-auto mobile-container">
            <div className="flex items-center justify-center min-h-[60vh] py-8 sm:py-12">
              
              {/* Centered Content - Mobile Typography */}
              <div className="text-white text-center max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-display leading-tight mb-6 sm:mb-8 mobile-heading">
                    <span className="text-white">Comprehensive</span>
                    <span className="text-[#F9A625] block">Event Management</span>
                    <span className="text-white">Services</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto mobile-body-text px-4 sm:px-0">
                    Creating extraordinary corporate experiences that inspire, educate, and propel organizations to new heights.
                  </p>


                  {/* CTA Buttons - Touch Optimized */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
                    <Button 
                      onClick={() => openPopup('services-hero')}
                      className="btn-primary mobile-touch-target text-base sm:text-lg lg:text-xl font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-102 min-h-[48px]"
                    >
                      Turn your idea into reality
                      <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
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
              <Button 
                onClick={() => openPopup('services-unique')}
                className="btn-primary mobile-touch-target text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl min-h-[48px]"
              >
                Discuss Your Vision
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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
                
                <Button 
                  onClick={() => openPopup(`services-${service.id}`)}
                  className="mt-3 sm:mt-4 btn-primary mobile-touch-target text-white font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto"
                >
                  {service.buttonText}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced Process Timeline - Mobile Optimized */}
      <section className="mobile-section-padding bg-gradient-to-br from-[#F9A625] to-[#e8951e]">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-[#2A3959] mb-4 sm:mb-6 mobile-heading">
              Four Steps to Extraordinary
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#2A3959]/80 max-w-3xl mx-auto leading-relaxed mobile-body-text">
              Proven process. Predictable excellence. Every single time.
            </p>
          </motion.div>

          <div className="mobile-grid md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Dream Discovery",
                description: "We don't just take briefs. We uncover dreams. Deep dive into your vision, values, and victory metrics.",
                color: "from-[#2A3959] to-[#1a2332]"
              },
              {
                step: "02", 
                title: "Strategic Sculpting",
                description: "Your vision meets our expertise. Strategies carved with precision. Concepts crafted with care.",
                color: "from-[#2A3959] to-[#1a2332]"
              },
              {
                step: "03",
                title: "Flawless Execution",
                description: "Show time. Every element orchestrated. Every moment choreographed. Perfection, delivered.",
                color: "from-[#2A3959] to-[#1a2332]"
              },
              {
                step: "04",
                title: "Legacy Creation",
                description: "The event ends. The impact begins. Relationships deepened. Success stories written.",
                color: "from-[#2A3959] to-[#1a2332]"
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
                
                <div className="mobile-card bg-white/90 backdrop-blur-sm border border-white/30 hover:border-[#2A3959]/50 transition-all duration-300 hover:bg-white group-hover:scale-102 sm:group-hover:scale-105 h-full mobile-animation">
                  <div className="text-center">
                    {/* Step Number - Mobile Responsive */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg sm:text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    
                    
                    {/* Title - Mobile Typography */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#2A3959] mb-3 sm:mb-4 group-hover:text-[#F9A625] transition-colors duration-300 mobile-heading">
                      {process.title}
                    </h3>
                    
                    {/* Description - Mobile Typography */}
                    <p className="text-[#2A3959]/70 text-xs sm:text-sm leading-relaxed mobile-body-text">
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
            <div className="mobile-card bg-gradient-to-r from-[#2A3959] to-[#1a2332] max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 mobile-heading">Ready to Get Started?</h3>
              <p className="text-white/90 mb-4 sm:mb-6 mobile-body-text">Let's discuss your event and create something extraordinary together</p>
              <Button 
                onClick={() => openPopup('services-process')}
                className="bg-white text-[#F9A625] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl mobile-touch-target min-h-[48px] w-full sm:w-auto"
              >
                Get Started Today
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
      <section className="mobile-section-padding bg-gradient-to-br from-[#F9A625] to-[#e8951e]">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mobile-card bg-white/90 backdrop-blur-sm border border-white/30 p-8 sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-[#2A3959] mb-4 sm:mb-6 mobile-heading">
                  Need Professional Event <span className="text-[#F9A625]">Management?</span>
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-[#2A3959]/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed mobile-body-text">
                  Get expert event planning services. From corporate conferences to celebrations - we handle everything.
                </p>

                {/* Enhanced Contact Options - Mobile Optimized */}
                <div className="mobile-grid md:grid-cols-3 mb-8 sm:mb-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-[#2A3959] backdrop-blur-sm border border-[#2A3959]/30 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Contact Us Now</h3>
                    <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 mobile-body-text">Get in touch with our event specialists</p>
                    <Button 
                      onClick={() => openPopup('services-contact')}
                      variant="outline" 
                      className="mobile-touch-target border-[#F9A625]/50 text-[#F9A625] hover:bg-[#F9A625] hover:text-[#2A3959] text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
                    >
                      Get Quote
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-[#2A3959] backdrop-blur-sm border border-[#2A3959]/30 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Email Us</h3>
                    <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 mobile-body-text">Get detailed proposals and answers</p>
                    <Button variant="outline" className="mobile-touch-target border-[#F9A625]/50 text-[#F9A625] hover:bg-[#F9A625] hover:text-[#2A3959] text-sm sm:text-base min-h-[44px] w-full sm:w-auto">
                      info@whitemassif.com
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mobile-card bg-[#2A3959] backdrop-blur-sm border border-[#2A3959]/30 hover:border-[#F9A625]/50 transition-all duration-300 mobile-animation"
                  >
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#F9A625] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 mobile-heading">Schedule Meeting</h3>
                    <Button 
                      onClick={() => openPopup('services-meeting')}
                      variant="outline" 
                      className="mobile-touch-target border-[#F9A625]/50 text-[#F9A625] hover:bg-[#F9A625] hover:text-[#2A3959] text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
                    >
                      Book corporate entertainment
                    </Button>
                  </motion.div>
                </div>

                {/* Primary CTA - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={() => openPopup('services-final-cta')}
                    className="btn-primary mobile-touch-target text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl min-h-[48px] w-full sm:w-auto"
                  >
                    Streamline Event Logistics
                    <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                  
                </div>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 