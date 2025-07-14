'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  Layers
} from "lucide-react";
import { useRef, useState } from "react";

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
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Advanced parallax effects
  const heroY = useTransform(scrollY, [0, 600], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.15]);

  const categories = [
    { id: 'all', name: 'All Projects', count: 24, icon: Layers },
    { id: 'corporate', name: 'Corporate Events', count: 8, icon: Building },
    { id: 'celebrations', name: 'Celebrations', count: 6, icon: Heart },
    { id: 'inaugurations', name: 'Inaugurations', count: 4, icon: Award },
    { id: 'hybrid', name: 'Hybrid Events', count: 3, icon: Globe },
    { id: 'conventions', name: 'Conventions', count: 3, icon: Users }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Tech Summit 2024: Innovation Unleashed",
      category: "corporate",
      client: "Fortune 500 Tech Company",
      attendees: "2,500+",
      type: "Corporate Conference",
      description: "A groundbreaking three-day technology summit featuring world-class keynote speakers, interactive product launches, and immersive networking experiences with cutting-edge AV production and holographic displays.",
      image: "/assets/images/portfolio/tech-summit.jpg",
      tags: ["Technology", "Conference", "Hybrid", "Innovation", "AI"],
      results: {
        satisfaction: "98%",
        engagement: "95%",
        leads: "1,200+",
        coverage: "Global"
      },
      featured: true,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Annual Gala: Healthcare Heroes",
      category: "celebrations",
      client: "Leading Healthcare Organization",
      attendees: "800+",
      type: "Awards Ceremony",
      description: "An elegant awards ceremony celebrating healthcare heroes with premium entertainment, gourmet dining, immersive experiences, and a heartfelt tribute to frontline workers during challenging times.",
      image: "/assets/images/portfolio/gala-celebration.jpg",
      tags: ["Awards", "Gala", "Entertainment", "Premium", "Healthcare"],
      results: {
        satisfaction: "99%",
        engagement: "97%",
        media: "50+ outlets",
        donations: "$2.5M raised"
      },
      featured: true,
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "Revolutionary Product Launch",
      category: "inaugurations",
      client: "Automotive Industry Leader",
      attendees: "1,500+",
      type: "Product Launch",
      description: "A high-impact product launch event featuring interactive displays, live demonstrations, celebrity endorsements, and an immersive journey showcasing the future of sustainable transportation.",
      image: "/assets/images/portfolio/product-launch.jpg",
      tags: ["Launch", "Automotive", "Interactive", "Celebrity", "Sustainable"],
      results: {
        satisfaction: "97%",
        coverage: "Global",
        sales: "150% increase",
        orders: "10,000+"
      },
      featured: false,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "Global Virtual Conference 2024",
      category: "hybrid",
      client: "International Consulting Firm",
      attendees: "5,000+",
      type: "Hybrid Conference",
      description: "A seamless hybrid conference connecting participants across 25 countries with real-time translation, interactive sessions, virtual networking, and AI-powered matchmaking for meaningful connections.",
      image: "/assets/images/portfolio/virtual-conference.jpg",
      tags: ["Global", "Virtual", "Translation", "Interactive", "AI"],
      results: {
        satisfaction: "96%",
        countries: "25",
        sessions: "50+",
        connections: "15,000+"
      },
      featured: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      title: "Industry Trade Expo Excellence",
      category: "conventions",
      client: "Manufacturing Association",
      attendees: "3,000+",
      type: "Trade Exhibition",
      description: "A comprehensive trade show featuring 200+ exhibitors, B2B matchmaking, industry networking opportunities, and cutting-edge technology demonstrations in smart manufacturing.",
      image: "/assets/images/portfolio/trade-show.jpg",
      tags: ["Trade Show", "B2B", "Networking", "Exhibition", "Manufacturing"],
      results: {
        satisfaction: "98%",
        exhibitors: "200+",
        deals: "500+ connections",
        revenue: "$50M generated"
      },
      featured: false,
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      title: "Golden Milestone Anniversary",
      category: "celebrations",
      client: "Financial Services Giant",
      attendees: "1,200+",
      type: "Corporate Celebration",
      description: "A grand celebration marking 50 years of excellence with historical showcases, entertainment, future vision presentations, and an inspiring journey through decades of innovation.",
      image: "/assets/images/portfolio/anniversary.jpg",
      tags: ["Anniversary", "Milestone", "History", "Vision", "Legacy"],
      results: {
        satisfaction: "99%",
        engagement: "98%",
        legacy: "Memorable",
        impact: "Inspirational"
      },
      featured: false,
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const stats = [
    { number: "1000+", label: "Dreams Realized", icon: Calendar, color: "text-blue-500", bgColor: "from-blue-500/10 to-blue-500/5" },
    { number: "1.5M+", label: "Lives Touched", icon: Users, color: "text-emerald-500", bgColor: "from-emerald-500/10 to-emerald-500/5" },
    { number: "100%", label: "Legends Created", icon: Star, color: "text-amber-500", bgColor: "from-amber-500/10 to-amber-500/5" },
    { number: "∞", label: "Possibilities", icon: Globe, color: "text-purple-500", bgColor: "from-purple-500/10 to-purple-500/5" }
  ];

  const testimonials = [
    {
      quote: "White Massif transformed our annual conference into an unforgettable experience that exceeded every expectation. Their innovative approach and meticulous attention to detail created magic.",
      author: "Sarah Johnson",
      position: "VP Marketing",
      company: "TechCorp Industries",
      rating: 5,
      avatar: "SJ"
    },
    {
      quote: "The team's professionalism and creative genius made our product launch a massive success. The event generated incredible buzz and drove significant sales beyond our projections.",
      author: "Michael Chen",
      position: "Brand Director",
      company: "Innovation Labs",
      rating: 5,
      avatar: "MC"
    },
    {
      quote: "From concept to execution, White Massif delivered excellence at every step. Our hybrid event reached global audiences seamlessly with remarkable engagement rates.",
      author: "Emily Rodriguez",
      position: "Event Manager",
      company: "Global Consulting",
      rating: 5,
      avatar: "ER"
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-neutral-50">
      {/* Ultra-Modern Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        />
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
        
        {/* Floating Geometric Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-amber-400/30 to-orange-500/30 backdrop-blur-xl rounded-full border border-amber-300/30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 backdrop-blur-xl rounded-2xl border border-cyan-300/30"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [45, 225, 45]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pb-32">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Palette className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-medium tracking-wide text-white">Proof of Excellence</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] mb-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Where Vision
              </span>
              <br />
              <span className="text-white">
                Becomes Victory
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/80 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              1000+ success stories. Zero compromises. Infinite possibilities. 
              This is what happens when obsession meets opportunity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group">
                <Image className="mr-2 w-5 h-5" />
                <span>Witness Excellence</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 text-lg rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                <MousePointer className="mr-2 w-5 h-5" />
                <span>Join The Legacy</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs mb-3 text-white/60 font-light">Scroll to explore</span>
            <motion.div 
              className="w-px h-12 bg-gradient-to-b from-amber-400 via-orange-400 to-transparent"
              animate={{ 
                scaleY: [1, 0.5, 1], 
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent)] opacity-50" />
        
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
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-base md:text-lg font-medium">{stat.label}</div>
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
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className={`group cursor-pointer ${
                  item.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-slate-200 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-amber-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                      <Camera className="w-16 h-16 text-white/80" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-xl text-slate-700 border border-white/50">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      {item.featured && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <Button size="sm" className="bg-white/20 backdrop-blur-xl text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 font-medium text-sm">{item.client}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-amber-600">{item.attendees}</div>
                        <div className="text-xs text-slate-500 font-medium">Attendees</div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium hover:bg-amber-100 hover:text-amber-700 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                      {Object.entries(item.results).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
                          <div className="text-xs text-slate-500 capitalize font-medium">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.05),transparent)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 text-base border-purple-200">
                Voices of Victory
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                When Dreams <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Speak</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
                The words that matter most. From the visionaries who dared to dream bigger.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-purple-200 hover:bg-white/90 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current mr-1" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed mb-8 italic font-light text-lg">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1 text-lg">{testimonial.author}</h4>
                <p className="text-slate-600 text-sm mb-1 font-medium">{testimonial.position}</p>
                <p className="text-slate-500 text-xs font-medium">{testimonial.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-white/10 backdrop-blur-xl text-cyan-400 px-6 py-3 text-base border-cyan-400/20">
                The Secret
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Excellence <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Decoded</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                Four steps. Zero compromises. Infinite impact. 
                This is how legends are born.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Vision",
                description: "Deep dive into your objectives, audience, and aspirations to craft the perfect event strategy",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Strategy & Creativity",
                description: "Develop comprehensive event strategy with innovative concepts and cutting-edge solutions",
                icon: Lightbulb,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Flawless Execution",
                description: "Seamless implementation with real-time coordination and attention to every detail",
                icon: Zap,
                color: "from-amber-500 to-orange-500"
              },
              {
                step: "04",
                title: "Success & Growth",
                description: "Measure impact, celebrate success, and optimize insights for future excellence",
                icon: Trophy,
                color: "from-emerald-500 to-teal-500"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center group hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl font-bold text-cyan-400 mb-6">{process.step}</div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <process.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {process.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-light">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-slate-900 leading-tight">
                Your Story Starts <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Here</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                Ready to join our hall of fame? To create something that echoes through time? 
                Your legend awaits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 group">
                  <Sparkles className="mr-2 w-6 h-6" />
                  <span>Begin Your Legend</span>
                  <ArrowRight className="ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                
                <div className="flex items-center space-x-6">
                  <a href="tel:+91-98450-45466" className="group flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors">
                    <div className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-all duration-300 shadow-lg group-hover:scale-110 border border-slate-200">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">+91 98450 45466</div>
                      <div className="text-sm opacity-70">Call The Legends</div>
                    </div>
                  </a>
                  
                  <a href="mailto:info@whitemassif.com" className="group flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors">
                    <div className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-all duration-300 shadow-lg group-hover:scale-110 border border-slate-200">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Start The Conversation</div>
                      <div className="text-sm opacity-70">Where Legends Begin</div>
                    </div>
                  </a>
                </div>
              </div>
              
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center space-x-2 text-slate-500 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Free consultation</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Custom proposals</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>24/7 support</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 