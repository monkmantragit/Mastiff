'use client';

import { Button } from "@/components/ui/button";
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
import { useRef, useState, useEffect } from "react";
import { WorkMediaService } from "@/lib/work-media";
import NextImage from "next/image";

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    { number: "500+", label: "Events Delivered", icon: Calendar },
    { number: "165+", label: "Happy Clients", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        const itemCategoryId = item.category.toLowerCase().replace(/\s+/g, '-');
        return itemCategoryId === selectedCategory;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-neutral-50">
      {/* Clean Hero Section - Team Style */}
      <section ref={heroRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-[#2A3959] via-[#1A2340] to-[#0F1826] pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9A625]/10 via-transparent to-[#F9A625]/5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow">
              <Eye className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Portfolio Showcase</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8">
              <span className="kinetic-text">
                Where Vision
              </span>
              <br />
              <span className="text-[#F9A625]">
                Becomes Victory
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-body">
              1000+ success stories. Zero compromises. Infinite possibilities. 
              Step into our hall of legends where extraordinary events come to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group">
                <Image className="mr-2 w-5 h-5" />
                <span>Explore Portfolio</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 text-lg rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                <Phone className="mr-2 w-5 h-5" />
                <span>Start Your Project</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
              <Badge className="mb-6 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-6 py-3 text-base border-amber-200">
                Hall of Fame
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Not Just Events.</span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Legends.</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Step inside our hall of fame. Where ordinary becomes extraordinary. 
                Where moments become milestones. Where events become legends.
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="bg-white/90 backdrop-blur-xl border-slate-200 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-amber-200">
                  <div className="relative aspect-video overflow-hidden">
                    <NextImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-xl text-slate-700 border border-white/50 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#F9A625]/90 backdrop-blur-xl text-white border-0 text-xs">
                        {item.year}
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <div className="text-sm font-medium">{item.totalImages} Photos</div>
                        </div>
                        <Button size="sm" className="bg-white/20 backdrop-blur-xl text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View Gallery
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 font-medium text-sm">{item.category} • {item.year}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <div className="text-xl font-bold text-amber-600">{item.totalImages}</div>
                        <div className="text-xs text-slate-500 font-medium">Images</div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-4 font-light text-sm line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Gallery Preview */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Gallery Preview</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {item.gallery.slice(0, 4).map((imageUrl: string, idx: number) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                            <NextImage
                              src={imageUrl}
                              alt={`${item.title} preview ${idx + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                              sizes="100px"
                            />
                            {idx === 3 && item.gallery.length > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-xs font-medium">+{item.gallery.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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
              
              <div className="grid md:grid-cols-3 gap-8 mb-12 text-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F9A625] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-[#2A3959]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-white/70">Prakash: +91-990-0141-155</p>
                  <p className="text-white/70">Vinay: +91-990-0141-177</p>
                </div>
                
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
    </div>
  );
} 