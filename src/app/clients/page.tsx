'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles,
  Users, 
  Calendar,
  Trophy,
  Star,
  Building
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

// Client Categories from White Massif data
const clientCategories = [
  {
    category: "Information Technology",
    description: "Leading IT companies and technology firms",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    count: "40+"
  },
  {
    category: "Banking & Financial Institution",
    description: "Banks, financial services, and investment companies",
    icon: "🏦",
    gradient: "from-emerald-500 to-teal-500",
    count: "25+"
  },
  {
    category: "Manufacturing, Industry, Research & Development",
    description: "Manufacturing companies, industrial firms, and R&D organizations",
    icon: "🏭",
    gradient: "from-amber-500 to-orange-500",
    count: "35+"
  },
  {
    category: "Government & Non Governmental Organization",
    description: "Government agencies and NGOs",
    icon: "🏛️",
    gradient: "from-indigo-500 to-purple-500",
    count: "15+"
  },
  {
    category: "Consulting, Media, Logistics & Aviation",
    description: "Consulting firms, media companies, logistics, and aviation industry",
    icon: "✈️",
    gradient: "from-rose-500 to-pink-500",
    count: "20+"
  },
  {
    category: "Pharma & Healthcare",
    description: "Pharmaceutical companies and healthcare organizations",
    icon: "💊",
    gradient: "from-green-500 to-emerald-500",
    count: "15+"
  },
  {
    category: "Real Estate, Retail & Hospitality",
    description: "Real estate developers, retail chains, and hospitality industry",
    icon: "🏨",
    gradient: "from-violet-500 to-purple-500",
    count: "10+"
  }
];

const stats = [
  {
    number: "160+",
    label: "Corporate Clients",
    icon: Users,
    color: "text-amber-400"
  },
  {
    number: "7",
    label: "Industry Sectors",
    icon: Building,
    color: "text-emerald-400"
  },
  {
    number: "12+",
    label: "Years Experience", 
    icon: Trophy,
    color: "text-blue-400"
  },
  {
    number: "500+",
    label: "Events Delivered",
    icon: Calendar,
    color: "text-purple-400"
  }
];

// Notable Clients (examples from the media assets data)
const notableClients = [
  { name: "Zluri", sector: "IT" },
  { name: "NTT Data", sector: "IT" },
  { name: "ABB", sector: "Manufacturing" },
  { name: "Johnson Controls", sector: "Manufacturing" },
  { name: "GSK", sector: "Pharma" },
  { name: "Novo Nordisk", sector: "Healthcare" },
  { name: "Government of Netherlands", sector: "Government" },
  { name: "Coca Cola", sector: "Retail" },
  { name: "KLM", sector: "Aviation" },
  { name: "New York Times", sector: "Media" }
];

export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

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
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Our Clients</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="kinetic-text">
                Trusted By
              </span>
              <br />
              <span className="text-neutral-800">
                Top Brands
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Our clients&apos; trust has made us one of the leading event management companies in Bangalore. 
              We are delighted to be associated with 160+ corporate clients across various industries.
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

      {/* Client Categories */}
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
                Industry Expertise
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-neutral-900 leading-tight">
                <span className="kinetic-text">Diverse</span> Industry Experience
              </h2>
              <p className="text-lg text-neutral-600 max-w-4xl mx-auto font-body leading-relaxed">
                From technology giants to healthcare leaders, we&apos;ve successfully delivered 
                exceptional events across all major industry sectors in Bangalore and beyond.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-display text-amber-600 mb-1">{category.count}</div>
                    <div className="text-xs text-neutral-500">Clients</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-heading mb-4 text-neutral-900 group-hover:text-amber-600 transition-colors">
                  {category.category}
                </h3>
                
                <p className="text-neutral-600 font-body leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Clients */}
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
                Notable Clients
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-neutral-900">
                <span className="kinetic-text">Recognized</span> Brands
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto font-body leading-relaxed">
                Some of the prestigious organizations that have trusted us with their most important events.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {notableClients.map((client, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-2xl flex items-center justify-center group-hover:from-amber-100 group-hover:to-orange-100 transition-all">
                  <Building className="w-8 h-8 text-neutral-600 group-hover:text-amber-600 transition-colors" />
                </div>
                <h3 className="text-lg font-heading mb-2 text-neutral-900 group-hover:text-amber-600 transition-colors">
                  {client.name}
                </h3>
                <p className="text-sm text-neutral-600 font-body">{client.sector}</p>
              </motion.div>
            ))}
          </div>
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
                Client Success
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-8 text-neutral-900">
                What <span className="kinetic-text">Clients</span> Say
              </h2>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "White Massif transformed our annual conference into an unforgettable experience. Their attention to detail and innovative approach exceeded all expectations.",
                company: "Technology Leader",
                industry: "IT Services"
              },
              {
                quote: "Professional, creative, and reliable. They delivered a flawless product launch event that perfectly captured our brand vision.",
                company: "Manufacturing Giant",
                industry: "Industrial Solutions"
              },
              {
                quote: "Their expertise in hybrid events helped us reach a global audience seamlessly. Outstanding execution and support throughout.",
                company: "Healthcare Pioneer",
                industry: "Pharmaceutical"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6">
                  <Star className="w-8 h-8 text-amber-500 mb-4" />
                  <p className="text-neutral-700 font-body leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="font-heading text-neutral-900">{testimonial.company}</div>
                  <div className="text-sm text-neutral-600">{testimonial.industry}</div>
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
                Join Our Clients
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-white leading-tight">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
                Experience the White Massif difference. Let us create an exceptional event 
                that elevates your brand and engages your audience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="btn-primary group">
                  <span>Start Your Project</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button className="btn-secondary group">
                  <span>View Our Work</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 