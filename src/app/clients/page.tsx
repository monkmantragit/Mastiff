'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
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

// Removed client categories as per requirements

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
    number: "1.5M+",
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
      // Assign industry categories (simplified for demo)
      category: ['Technology', 'Healthcare', 'Manufacturing', 'Finance', 'Automotive', 'Media'][i % 6]
    };
  });
};

const allClientLogos = generateAllClientLogos();

export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { openPopup } = usePopup();
  
  // Modal state for client showcase
  const [showAllClients, setShowAllClients] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Horizontal scroll rows for a compact, elegant browse
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const moreClientsRow1 = allClientLogos.slice(0, 18);
  const moreClientsRow2 = allClientLogos.slice(18, 36);
  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: 1 | -1) => {
    const distance = 420;
    ref.current?.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };
  
  // Filter clients based on category and search
  const filteredClients = allClientLogos.filter(client => {
    const matchesCategory = selectedCategory === 'All' || client.category === selectedCategory;
    const matchesSearch = client.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const categories = ['All', 'Technology', 'Healthcare', 'Manufacturing', 'Finance', 'Automotive', 'Media'];

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

          {/* Featured Premium Clients (tight, premium grid) */}
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
                {/* Tooltip on hover */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-neutral-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Compact browse: horizontally scrollable logo rows */}
          <div className="space-y-6 mb-12">
            {[{ ref: row1Ref, data: moreClientsRow1 }, { ref: row2Ref, data: moreClientsRow2 }].map((row, idx) => (
              <div key={idx} className="relative">
                {/* Left control */}
                <button
                  aria-label="Scroll logos left"
                  onClick={() => scrollRow(row.ref, -1)}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                {/* Right control */}
                <button
                  aria-label="Scroll logos right"
                  onClick={() => scrollRow(row.ref, 1)}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Gradient edge masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-100 to-transparent" />

                <div
                  ref={row.ref}
                  className="overflow-x-auto scroll-smooth no-scrollbar"
                >
                  <div className="flex items-center gap-4 px-6">
                    {row.data.map((client) => (
                      <div key={client.id} className="shrink-0 bg-white rounded-xl p-4 aspect-[4/3] w-[160px] max-w-[160px] flex items-center justify-center hover:shadow-md transition">
                        <img
                          src={client.src}
                          alt={client.alt}
                          className="max-w-full max-h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Clients CTA */}
          <motion.div 
            className="text-center"
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

      {/* Client Testimonials Section */}
      <section className="section-padding">
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
                When <span className="kinetic-text">Legends</span> Speak
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body mb-12">
                Don&apos;t just take our word for it. Hear from the visionaries who&apos;ve experienced the WhiteMassif difference.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "WhiteMassif didn&apos;t just deliver an event—they crafted an experience that redefined what we thought was possible. Our stakeholders are still talking about it months later.",
                author: "Sarah Chen, VP Global Events",
                company: "Fortune 500 Technology Company",
                industry: "Silicon Valley Giant",
                rating: 5
              },
              {
                quote: "When you&apos;re launching a product that will change an industry, you need partners who understand the stakes. WhiteMassif turned our vision into a moment that made history.",
                author: "Michael Rodriguez, CMO",
                company: "Industry-Leading Manufacturer",
                industry: "Global Innovation Leader",
                rating: 5
              },
              {
                quote: "In healthcare, perfection isn&apos;t optional—it&apos;s essential. WhiteMassif delivered flawless execution that honored both our scientific rigor and our human mission.",
                author: "Dr. Priya Sharma, Director",
                company: "Pharmaceutical Pioneer",
                industry: "Life Sciences Leader",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-neutral-700 font-body leading-relaxed italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-6">
                  <div className="font-heading text-neutral-900 mb-1">{testimonial.author}</div>
                  <div className="font-medium text-amber-600 mb-1">{testimonial.company}</div>
                  <div className="text-sm text-neutral-500">{testimonial.industry}</div>
                </div>
              </motion.div>
            ))}
          </div>
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
              <Badge className="mb-6 glass-dark px-6 py-2 text-amber-400 border-amber-400/20">
                Join The Legacy
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-white leading-tight">
                Ready to Become <span className="kinetic-text text-amber-400">Legendary?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-body">
                The world&apos;s most ambitious companies don&apos;t settle for ordinary events. They choose the partners who&apos;ve proven 
                that impossible is just another word for opportunity. Your legend begins with a single conversation.
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
                  onClick={() => window.open('tel:+919845012345', '_self')}
                  variant="outline"
                  className="border-2 border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group"
                >
                  <span>Call Us Now</span>
                  <Phone className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                    Our <span className="text-amber-600">154 Clients</span>
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

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
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

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-amber-500 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
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
                          // Hide failed images
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
                  <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
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
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Clear Filters
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