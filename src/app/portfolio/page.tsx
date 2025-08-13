'use client';

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  Phone,
  Mail,
  Globe,
  Award,
  Lightbulb,
  Building,
  Sparkles,
  Star,
  Heart,
  CheckCircle,
  Calendar,
  Eye,
  Camera,
  Zap,
  Palette,
  Image,
  MousePointer,
  Layers,
  Play
} from "lucide-react";
import { WorkMediaService } from "@/lib/work-media";
import NextImage from "next/image";
import GalleryModal from "@/components/ui/GalleryModal";
import { PortfolioItem, GalleryImage } from "@/types/gallery";

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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function PortfolioPage() {
  const heroRef = useRef(null);
  const { openPopup } = usePopup();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Gallery modal states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryImage[]>([]);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState('');

  // Fetch dynamic portfolio data from Directus
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const items = await WorkMediaService.getPortfolioItems();
        setPortfolioItems(items);
      } catch (error) {
        console.error('Failed to load portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Handle gallery modal opening
  const openGallery = (item: PortfolioItem) => {
    if (item.galleryData && item.galleryData.length > 0) {
      setSelectedGallery(item.galleryData);
      setSelectedProjectTitle(item.title);
      setIsGalleryOpen(true);
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedGallery([]);
    setSelectedProjectTitle('');
  };
  
  // Generate dynamic categories from actual data
  const generateCategories = () => {
    const categoryCount: Record<string, number> = {};
    portfolioItems.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    const categories = [
      { id: 'all', name: 'All Projects', count: portfolioItems.length, icon: Layers }
    ];

    Object.entries(categoryCount).forEach(([category, count]) => {
      const categoryMap: Record<string, { name: string; icon: any }> = {
        'Corporate Event': { name: 'Corporate Events', icon: Building },
        'Corporate Celebration': { name: 'Celebrations', icon: Heart },
        'Awards Ceremony': { name: 'Awards Ceremonies', icon: Award },
        'Summit': { name: 'Summits', icon: Globe }
      };
      
      const categoryInfo = categoryMap[category] || { name: category, icon: Users };
      categories.push({
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: categoryInfo.name,
        count: count,
        icon: categoryInfo.icon
      });
    });

    return categories;
  };

  const categories = generateCategories();

  const stats = [
    { number: "1000+", label: "Events", icon: Calendar },
    { number: "165+", label: "Clients", icon: Users },
    { number: "60+", label: "Destinations", icon: Award },
    { number: "2M+", label: "Audience Engaged", icon: Star }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        const itemCategoryId = item.category.toLowerCase().replace(/\s+/g, '-');
        return itemCategoryId === selectedCategory;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-neutral-50">
      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Full Video Background */}
        <div className="absolute inset-0 z-0 bg-neutral-900">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            loading="lazy"
            style={{
              zIndex: 1,
              willChange: 'auto',
              backfaceVisibility: 'hidden'
            }}
          >
            <source src="https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/work/Aditi%20WM%20version%202025.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Top Badge */}
        <motion.div 
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm px-4 py-2">
            <Eye className="w-4 h-4 mr-2" />
            Our Work Portfolio
          </Badge>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <div className="text-sm mb-2">Scroll to Explore</div>
          <div className="w-0.5 h-8 bg-white/60 mx-auto"></div>
        </motion.div>
      </section>

      {/* Compact Hero Content Section */}
      <section ref={heroRef} className="relative py-16 overflow-hidden bg-gradient-to-br from-[#2A3959] via-[#1A2340] to-[#0F1826]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9A625]/10 via-transparent to-[#F9A625]/5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6">
              <span className="kinetic-text">
                Where Vision
              </span>
              <br />
              <span className="text-[#F9A625]">
                Becomes Victory
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed font-body">
              1000+ success stories. Zero compromises. Infinite possibilities. 
              Step into our portfolio where extraordinary events come to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => openPopup('portfolio-start')}
                className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group"
              >
                <span>Start your journey</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9A625]/5 via-transparent to-[#F9A625]/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp} 
                className="text-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-[#F9A625]/30 transition-all duration-500 hover:shadow-xl shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#F9A625] to-[#e8951f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#F9A625] to-[#e8951f] bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-700 text-base md:text-lg font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Not Just Events.</span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Excellence.</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Step inside our hall of fame. Where ordinary becomes extraordinary. 
                Where moments become milestones. Where events become extraordinary.
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Category Filter */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={scaleIn}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl border-amber-300 scale-105'
                    : 'bg-white/50 backdrop-blur-xl text-slate-700 hover:bg-amber-50 hover:text-amber-600 border-slate-200 hover:border-amber-200 hover:scale-105'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs opacity-70 bg-white/20 px-2 py-1 rounded-full">({category.count})</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Portfolio Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {loading ? (
              <motion.div
                variants={fadeInUp}
                className="col-span-full text-center py-20"
              >
                <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-semibold text-slate-600 mb-2">Loading Portfolio...</h3>
                <p className="text-slate-500">Fetching our amazing event gallery from Directus...</p>
              </motion.div>
            ) : filteredItems.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                className="col-span-full text-center py-20"
              >
                <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-slate-600 mb-2">No Projects Found</h3>
                <p className="text-slate-500">No projects match the selected category.</p>
              </motion.div>
            ) : filteredItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openGallery(item)}
              >
                <Card className="bg-white/95 backdrop-blur-xl border-slate-200 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-amber-300 hover:bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <NextImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 backdrop-blur-xl text-slate-700 border border-white/50 text-xs font-medium">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#F9A625]/95 backdrop-blur-xl text-white border-0 text-xs font-medium">
                        {item.year}
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <div className="text-sm font-medium flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            {item.galleryData ? 
                              `${item.galleryData.filter(g => g.type === 'image').length} Photos` +
                              (item.galleryData.filter(g => g.type === 'video').length > 0 ? 
                                ` • ${item.galleryData.filter(g => g.type === 'video').length} Videos` : '')
                              : `${item.totalImages} Items`
                            }
                          </div>
                          {item.location && (
                            <div className="text-xs text-white/80 mt-1">{item.location}</div>
                          )}
                        </div>
                        <Button size="sm" className="bg-white/20 backdrop-blur-xl text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          View Gallery
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-2">
                          <span className="font-medium">{item.category}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                          {item.client_name && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-medium">{item.client_name}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <div className="text-2xl font-bold text-amber-600">{item.totalImages}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Images</div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6 font-light text-sm line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Enhanced Gallery Preview */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                          Gallery Preview
                        </h4>
                        <span className="text-xs text-amber-600 font-medium">
                          Click to view all {item.totalImages} images
                        </span>
                      </div>
                      {item.totalImages > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {item.galleryData ? item.galleryData.slice(0, 4).map((galleryItem, idx: number) => (
                          <div 
                            key={idx} 
                            className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer group/thumb"
                          >
                            <NextImage
                              src={galleryItem.thumbnail}
                              alt={`${item.title} preview ${idx + 1}`}
                              fill
                              className="object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                              sizes="100px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              {galleryItem.type === 'video' ? (
                                <Play className="w-4 h-4 text-white opacity-80 group-hover/thumb:opacity-100 transition-opacity duration-300" />
                              ) : (
                                <Eye className="w-4 h-4 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300" />
                              )}
                            </div>
                            {idx === 3 && item.galleryData.length > 4 && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
                                <span className="text-white text-xs font-bold">+{item.galleryData.length - 4}</span>
                              </div>
                            )}
                          </div>
                        )) : item.gallery.slice(0, 4).map((imageUrl: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer group/thumb"
                          >
                            <NextImage
                              src={imageUrl}
                              alt={`${item.title} preview ${idx + 1}`}
                              fill
                              className="object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                              sizes="100px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <Eye className="w-4 h-4 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300" />
                            </div>
                            {idx === 3 && item.gallery.length > 4 && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
                                <span className="text-white text-xs font-bold">+{item.gallery.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                              <Image className="w-6 h-6 text-gray-300" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Contact CTA Section - Brand Aligned */}
      <section className="py-24 bg-[#2A3959] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8">
                <Trophy className="w-5 h-5 text-[#F9A625]" />
                <span className="text-sm font-medium tracking-wide">Start Your Project</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display mb-8 leading-tight">
                Ready to Create Your
                <br />
                <span className="text-[#F9A625]">Next Event?</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-body leading-relaxed">
                From corporate conferences to grand celebrations, let's bring your vision to life 
                with the same excellence showcased in our portfolio.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12 text-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F9A625] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#2A3959]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-white/70">info@whitemassif.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F9A625] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-[#2A3959]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-white/70">New Bel Road, Sanjaynagar</p>
                  <p className="text-white/70">Bangalore, Karnataka</p>
                </div>
              </div>
              
              <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-[#2A3959] px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group font-medium">
                <span>Start Your Project</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        images={selectedGallery}
        projectTitle={selectedProjectTitle}
      />
    </div>
  );
} 