'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import { DirectusService, type Testimonial } from '@/lib/directus-service';
import { ClientLogosService, type ClientLogo } from '@/lib/client-logos-service';
import { ViewAllClientsModal } from '@/components/ViewAllClientsModal';
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
  ChevronDown,
  Target
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


export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { openPopup } = usePopup();
  const [showAllClientsModal, setShowAllClientsModal] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [industryCategories, setIndustryCategories] = useState<Array<{ category: string; count: number }>>([]);
  const [totalClientCount, setTotalClientCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [clientsLoading, setClientsLoading] = useState(true);

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

  // Fetch client data from Directus
  useEffect(() => {
    const fetchClientData = async () => {
      setClientsLoading(true);
      try {
        // Fetch all data concurrently
        const [logos, categories, totalCount] = await Promise.all([
          ClientLogosService.getAllClientLogos(),
          ClientLogosService.getIndustryCategories(),
          ClientLogosService.getTotalClientCount()
        ]);

        setClientLogos(logos);
        setIndustryCategories(categories);
        setTotalClientCount(totalCount);
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setClientsLoading(false);
      }
    };

    fetchClientData();
  }, []);

  // Filter clients by industry when selection changes
  useEffect(() => {
    const fetchFilteredClients = async () => {
      console.log('🔍 Fetching clients for industry:', selectedIndustry);
      setClientsLoading(true);
      try {
        if (selectedIndustry === 'All') {
          const allLogos = await ClientLogosService.getAllClientLogos();
          console.log('📋 All logos fetched:', allLogos.length);
          setClientLogos(allLogos);
        } else {
          const filteredLogos = await ClientLogosService.getClientLogosByIndustry(selectedIndustry);
          console.log(`🏭 ${selectedIndustry} logos fetched:`, filteredLogos.length);
          setClientLogos(filteredLogos);
        }
      } catch (error) {
        console.error('❌ Error fetching filtered clients:', error);
      } finally {
        setClientsLoading(false);
      }
    };

    fetchFilteredClients();
  }, [selectedIndustry]);
  
  // Logo data slices for animated rows using Directus data
  const moreClientsRow1 = clientLogos.slice(0, Math.min(20, clientLogos.length)); 
  const moreClientsRow2 = clientLogos.slice(20, Math.min(40, clientLogos.length));

  // Update stats with static total count
  const dynamicStats = [
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
            {dynamicStats.map((stat, index) => (
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

          {/* Industry Filter */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-lg font-medium text-neutral-700">Explore by Industry</span>
              </div>

              {/* Premium Tag Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
                {/* All Industries Button */}
                <motion.button
                  onClick={() => setSelectedIndustry('All')}
                  className={`group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedIndustry === 'All'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-amber-400 hover:shadow-md hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>All Industries</span>
                    <Badge 
                      className={`ml-1 text-xs ${
                        selectedIndustry === 'All'
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}
                    >
                      165
                    </Badge>
                  </div>
                </motion.button>

                {/* Industry Category Buttons */}
                {industryCategories.map((category) => (
                  <motion.button
                    key={category.category}
                    onClick={() => setSelectedIndustry(category.category)}
                    className={`group relative px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedIndustry === category.category
                        ? 'bg-gradient-to-r from-neutral-800 to-neutral-900 text-white shadow-lg shadow-neutral-800/25 scale-105'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:shadow-md hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{category.category}</span>
                      <Badge 
                        className={`ml-1 text-xs ${
                          selectedIndustry === category.category
                            ? 'bg-white/20 text-white border-white/30'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Loading State */}
              {clientsLoading && (
                <div className="flex items-center justify-center mt-8">
                  <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-sm text-neutral-500">Loading industries...</span>
                </div>
              )}

              {/* Active Filter Info */}
              {selectedIndustry !== 'All' && !clientsLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700"
                >
                  <Target className="w-4 h-4" />
                  <span>Showing {clientLogos.length} clients in <strong>{selectedIndustry}</strong></span>
                  <button
                    onClick={() => setSelectedIndustry('All')}
                    className="ml-2 text-amber-500 hover:text-amber-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Featured Premium Clients */}
          {clientsLoading ? (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm aspect-square flex items-center justify-center animate-pulse">
                    <div className="w-20 h-20 bg-neutral-200 rounded-lg"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : clientLogos.length > 0 ? (
            <motion.div
              key={`client-grid-${selectedIndustry}-${clientLogos.length}`}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
            >
              {clientLogos.slice(0, 12).map((client, index) => (
                <motion.div
                  key={client.id}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 aspect-square flex items-center justify-center glass micro-bounce">
                    {ClientLogosService.getBestLogoUrl(client) ? (
                      <img
                        src={ClientLogosService.getBestLogoUrl(client) || ''}
                        alt={client.client_name}
                        className="max-w-full max-h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center text-xs font-medium text-neutral-400 text-center">
                        {client.client_name}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center py-12 mb-12"
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">No Client Logos Found</h3>
              <p className="text-neutral-500">Please check the Directus connection or try refreshing the page.</p>
            </motion.div>
          )}

          {/* Infinite Scrolling Logo Sections */}
          <div key={`scrolling-logos-${selectedIndustry}-${clientLogos.length}`} className="space-y-8 mt-16">
            {/* Row 1 - Left to Right Scroll */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-8 animate-scroll-left will-change-transform">
                {[...moreClientsRow1, ...moreClientsRow1, ...moreClientsRow1].map((client, index) => (
                  <div key={`row1-${client.id}-${index}`} className="flex-shrink-0 w-40 h-24 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center group">
                    {ClientLogosService.getBestLogoUrl(client) ? (
                      <img
                        src={ClientLogosService.getBestLogoUrl(client) || ''}
                        alt={client.client_name}
                        className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center text-xs font-medium text-neutral-400 text-center">
                        {client.client_name}
                      </div>
                    )}
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
                    {ClientLogosService.getBestLogoUrl(client) ? (
                      <img
                        src={ClientLogosService.getBestLogoUrl(client) || ''}
                        alt={client.client_name}
                        className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center text-xs font-medium text-neutral-400 text-center">
                        {client.client_name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Clients Button */}
          {!clientsLoading && clientLogos.length > 0 && (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-16 mb-8"
            >
              <Button
                onClick={() => setShowAllClientsModal(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105"
              >
                <span>View All Clients</span>
                <Users className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
              <p className="text-neutral-600 text-sm mt-3 font-body">
                Explore our complete portfolio of 165+ trusted partners
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Premium Testimonials Scroller Section - "When Visionaries Speak" */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass-dark px-6 py-2 text-amber-400 border-amber-400/20">
                Voices of Excellence
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-white">
                When <span className="kinetic-text text-amber-400">Visionaries</span> Speak
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-body mb-12">
                Don&apos;t just take our word for it. Hear from the visionaries who&apos;ve experienced the White Massif difference.
              </p>
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Star className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-2xl font-display text-white/80 mb-2">No testimonials found</h3>
              <p className="text-white/60">Check back later as we add more client testimonials.</p>
            </div>
          ) : (
            <>
              {/* Desktop Layout - Auto-sliding with alternating directions */}
              <div className="hidden md:block space-y-8">
                {/* Row 1 - Left to Right */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-6 animate-scroll-left will-change-transform">
                    {[...testimonials.slice(0, 8), ...testimonials.slice(0, 8), ...testimonials.slice(0, 8)].map((testimonial, index) => (
                      <div key={`desktop-row1-${testimonial.id}-${index}`} className="flex-shrink-0 w-64 h-48 hover:scale-105 transition-transform duration-300">
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={256}
                              height={192}
                              className="w-full h-full object-cover object-center"
                              sizes="256px"
                            />
                          )}
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-6 animate-scroll-right will-change-transform">
                    {[...testimonials.slice(8, 16), ...testimonials.slice(8, 16), ...testimonials.slice(8, 16)].map((testimonial, index) => (
                      <div key={`desktop-row2-${testimonial.id}-${index}`} className="flex-shrink-0 w-64 h-48 hover:scale-105 transition-transform duration-300">
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={256}
                              height={192}
                              className="w-full h-full object-cover object-center"
                              sizes="256px"
                            />
                          )}
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Layout - 4 rows, auto-sliding */}
              <div className="md:hidden space-y-6">
                {/* Row 1 - Left to Right */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-4 animate-scroll-left will-change-transform">
                    {[...testimonials.slice(0, 4), ...testimonials.slice(0, 4), ...testimonials.slice(0, 4)].map((testimonial, index) => (
                      <div key={`mobile-row1-${testimonial.id}-${index}`} className="flex-shrink-0 w-58 h-44">
                        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={232}
                              height={176}
                              className="w-full h-full object-cover object-center"
                              sizes="232px"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-4 animate-scroll-right will-change-transform">
                    {[...testimonials.slice(4, 8), ...testimonials.slice(4, 8), ...testimonials.slice(4, 8)].map((testimonial, index) => (
                      <div key={`mobile-row2-${testimonial.id}-${index}`} className="flex-shrink-0 w-58 h-44">
                        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={232}
                              height={176}
                              className="w-full h-full object-cover object-center"
                              sizes="232px"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3 - Left to Right */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-4 animate-scroll-left will-change-transform">
                    {[...testimonials.slice(8, 12), ...testimonials.slice(8, 12), ...testimonials.slice(8, 12)].map((testimonial, index) => (
                      <div key={`mobile-row3-${testimonial.id}-${index}`} className="flex-shrink-0 w-58 h-44">
                        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={232}
                              height={176}
                              className="w-full h-full object-cover object-center"
                              sizes="232px"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 4 - Right to Left */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-4 animate-scroll-right will-change-transform">
                    {[...testimonials.slice(12, 16), ...testimonials.slice(12, 16), ...testimonials.slice(12, 16)].map((testimonial, index) => (
                      <div key={`mobile-row4-${testimonial.id}-${index}`} className="flex-shrink-0 w-58 h-44">
                        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
                          {testimonial.testimonial_image && (
                            <Image
                              src={typeof testimonial.testimonial_image === 'string' 
                                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}` 
                                : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.testimonial_image.id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
                              }
                              alt={testimonial.image_alt_text || `Testimonial from ${testimonial.client_name}, ${testimonial.company_name}`}
                              width={232}
                              height={176}
                              className="w-full h-full object-cover object-center"
                              sizes="232px"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
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

      {/* View All Clients Modal */}
      <ViewAllClientsModal 
        isOpen={showAllClientsModal} 
        onClose={() => setShowAllClientsModal(false)} 
      />
    </div>
  );
}