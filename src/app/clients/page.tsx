'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import { DirectusService, type Testimonial } from '@/lib/directus-service';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles,
  Users, 
  Calendar,
  Trophy,
  Star,
  Phone,
  X,
  Search,
  Filter
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

// Stats data
const stats = [
  {
    number: "165+",
    label: "Corporate Clients",
    icon: Users,
    color: "text-amber-400"
  },
  {
    number: "12+",
    label: "Years Experience", 
    icon: Trophy,
    color: "text-blue-400"
  },
  {
    number: "1000+",
    label: "Events Delivered",
    icon: Calendar,
    color: "text-purple-400"
  },
  {
    number: "2M+",
    label: "Audience Engagement",
    icon: Star,
    color: "text-emerald-400"
  }
];

// Featured premium clients for hero display
const featuredClients = [
  {
    name: "Microsoft",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-010.png",
    fallback: "/assets/images/clients/Microsoft.webp",
    category: "Technology"
  },
  {
    name: "Amazon Web Services", 
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-002.png",
    fallback: "/assets/images/clients/Amazon-Web-services.webp",
    category: "Technology"
  },
  {
    name: "Johnson & Johnson",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-007.png",
    fallback: "/assets/images/clients/Johnson-controls-1.png",
    category: "Healthcare"
  },
  {
    name: "GSK",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-006.png",
    fallback: "/assets/images/clients/GSK-1.png",
    category: "Pharmaceutical"
  },
  {
    name: "Coca Cola",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-003.png",
    fallback: "/assets/images/clients/Coca-cola-1.png",
    category: "Consumer Goods"
  },
  {
    name: "Ericsson",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-005.png",
    fallback: "/assets/images/clients/Ericsson.webp",
    category: "Telecommunications"
  },
  {
    name: "Hitachi",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-015.png",
    fallback: "/assets/images/clients/Hitachi.png",
    category: "Industrial"
  },
  {
    name: "TVS",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-014.png",
    fallback: "/assets/images/clients/TVS.png",
    category: "Automotive"
  },
  {
    name: "The New York Times",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-012.png",
    fallback: "/assets/images/clients/The-new-york-times-1.png",
    category: "Media"
  },
  {
    name: "KLM",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-008.png",
    fallback: "/assets/images/clients/KLM-1.png",
    category: "Aviation"
  },
  {
    name: "ABB",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-001.png",
    fallback: "/assets/images/clients/ABB.png",
    category: "Industrial"
  },
  {
    name: "EMC",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-004.png",
    fallback: "/assets/images/clients/EMC.webp",
    category: "Technology"
  }
];

// Generate all client logos for modal display
const generateAllClientLogos = () => {
  return Array.from({length: 154}, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return {
      id: `client-${num}`,
      src: `https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-${num}.png`,
      alt: `Client ${num}`,
      category: ['Technology', 'Healthcare', 'Manufacturing', 'Finance', 'Automotive', 'Media'][i % 6]
    };
  }).filter((_, index) => index + 1 !== 120); // Remove logo wm-120
};

const allClientLogos = generateAllClientLogos();

export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { openPopup } = usePopup();
  const [showAllClients, setShowAllClients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from Directus
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await DirectusService.getFeaturedTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  
  // Logo data slices for animated rows - using different sets from 1-140
  const moreClientsRow1 = allClientLogos.slice(36, 56); // Logos 37-56
  const moreClientsRow2 = allClientLogos.slice(70, 90); // Logos 71-90
  
  // Filter clients based on search only
  const filteredClients = allClientLogos.filter((client) => {
    const matchesSearch = client.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-amber-50/30 to-orange-50/30" />
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 glass rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 glass-primary organic-blob"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Hall of Trust</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="kinetic-text">
                What Sets Us
              </span>
              <br />
              <span className="text-neutral-800">
                Apart
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              At White Massif, it's not just about executing an event it's about understanding the story behind it. We blend strategy with creativity, bringing ideas to life with precision, passion, and purpose
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="relative z-10 container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <div className="glass-dark rounded-3xl p-8 micro-bounce">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display text-white mb-2 kinetic-text">
                    {stat.number}
                  </div>
                  <div className="text-white/70 font-body text-sm md:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="section-padding bg-neutral-100">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Trusted Partners
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                Our <span className="kinetic-text">Clients</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body leading-relaxed">
                Our clients trust has made us one of the leading event management companies in Bangalore. We are delighted to be associated with 165+ corporate clients across various industries.
              </p>
            </motion.div>
          </motion.div>

          {/* Featured Premium Clients */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
          >
            {featuredClients.map((client, index) => (
              <motion.div
                key={client.name}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 aspect-square flex items-center justify-center glass micro-bounce">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      if (client.fallback) {
                        e.currentTarget.src = client.fallback;
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Infinite Scrolling Logo Sections */}
          <div className="space-y-8 mt-16">
            {/* Row 1 - Left to Right Scroll */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-8 animate-scroll-left will-change-transform">
                {[...moreClientsRow1, ...moreClientsRow1, ...moreClientsRow1].map((client, index) => (
                  <div key={`row1-${client.id}-${index}`} className="flex-shrink-0 w-40 h-24 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center group">
                    <img
                      src={client.src}
                      alt={client.alt}
                      className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Right to Left Scroll */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-8 animate-scroll-right will-change-transform">
                {[...moreClientsRow2, ...moreClientsRow2, ...moreClientsRow2].map((client, index) => (
                  <div key={`row2-${client.id}-${index}`} className="flex-shrink-0 w-40 h-24 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center group">
                    <img
                      src={client.src}
                      alt={client.alt}
                      className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Clients CTA */}
          <motion.div 
            className="text-center mt-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-neutral-600 mb-8 text-lg">
              Explore more of our client partnerships across industries
            </p>
            <Button 
              onClick={() => setShowAllClients(true)}
              className="btn-primary group px-8 py-4 text-lg"
            >
              <Users className="mr-2 w-5 h-5" />
              <span>View All Clients</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Premium Testimonials Scroller Section - "When Visionaries Speak" */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 via-amber-50/20 to-orange-50/20">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Voices of Excellence
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900">
                When <span className="kinetic-text">Visionaries</span> Speak
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body mb-12">
                Don&apos;t just take our word for it. Hear from the visionaries who&apos;ve experienced the White Massif difference.
              </p>
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Star className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display text-neutral-600 mb-2">No testimonials found</h3>
              <p className="text-neutral-500">Check back later as we add more client testimonials.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Static Testimonials Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={`testimonial-${testimonial.id}`}
                    variants={fadeInUp}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl shadow-lg h-[500px] overflow-hidden relative">
                      <div className="relative h-full overflow-hidden">
                        {testimonial.testimonial_image && (
                          <Image
                            src={typeof testimonial.testimonial_image === 'string' 
                              ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}&key=system-large-cover` 
                              : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}&key=system-large-cover`
                            }
                            alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                            width={420}
                            height={500}
                            className="w-full h-full object-cover object-center"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="text-white text-xl font-semibold mb-1">{testimonial.client_name}</div>
                          <div className="text-white/90 text-sm">
                            {testimonial.job_title && `${testimonial.job_title}, `}{testimonial.company_name}
                          </div>
                          {testimonial.industry && (
                            <div className="text-white/70 text-sm mt-1">{testimonial.industry}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="container-fluid mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-white leading-tight">
                Ready to Become <span className="kinetic-text text-amber-400">Exceptional?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-body">
                The world&apos;s most ambitious companies don&apos;t settle for ordinary events. They choose the partners who&apos;ve proven 
                that impossible is just another word for opportunity. Your success story begins with a single conversation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => openPopup('clients-cta')}
                  className="btn-primary group"
                >
                  <span>Start Your Event Journey</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => openPopup('clients-contact')}
                  variant="outline"
                  className="border-2 border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All Clients Modal */}
      {showAllClients && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-6 lg:p-8 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-amber-50/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-display text-neutral-900 mb-2">
                    Our <span className="text-amber-600">165+ Clients</span>
                  </h2>
                  <p className="text-neutral-600">Industry leaders who trust White Massif with their most important events</p>
                </div>
                <Button
                  onClick={() => setShowAllClients(false)}
                  variant="outline"
                  size="sm"
                  className="rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredClients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-neutral-50 rounded-xl p-6 aspect-[4/3] flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No results message */}
              {filteredClients.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-neutral-400 text-lg mb-2">No clients found</div>
                  <p className="text-neutral-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 lg:p-8 border-t border-neutral-200 bg-neutral-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-neutral-600 text-sm">
                  Showing {filteredClients.length} of {allClientLogos.length} clients
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    size="sm"
                  >
                    Clear Search
                  </Button>
                  <Button
                    onClick={() => setShowAllClients(false)}
                    className="btn-primary"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}