'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  Phone
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

// Using actual client logos instead of notable clients list

export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { openPopup } = usePopup();

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

          {/* Client Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "/assets/images/clients/ABB.png",
              "/assets/images/clients/Amazon-Web-services.webp",
              "/assets/images/clients/Coca-cola-1.png",
              "/assets/images/clients/EMC.webp",
              "/assets/images/clients/Ericsson.webp",
              "/assets/images/clients/GSK-1.png",
              "/assets/images/clients/Johnson-controls-1.png",
              "/assets/images/clients/KLM-1.png",
              "/assets/images/clients/Microsoft.webp",
              "/assets/images/clients/NTT-Data-1.png",
              "/assets/images/clients/Novo-Nordis.png",
              "/assets/images/clients/The-new-york-times-1.png",
              "/assets/images/clients/Zluri.png",
              "/assets/images/clients/TVS.png",
              "/assets/images/clients/Hitachi.png",
              "/assets/images/clients/GE-1-1.png",
              "/assets/images/clients/Finastra.webp",
              "/assets/images/clients/Groupon.webp"
            ].map((logo, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 flex items-center justify-center group hover:shadow-lg transition-all duration-300 aspect-square"
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
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
    </div>
  );
} 