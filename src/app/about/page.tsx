'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  Target,
  Award,
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  Eye,
  TrendingUp,
  Zap,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  // Advanced parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const stats = [
    { number: "12+", label: "Years Experience", icon: Calendar, color: "text-blue-500" },
    { number: "500+", label: "Events Delivered", icon: Trophy, color: "text-amber-500" },
    { number: "160+", label: "Happy Clients", icon: Users, color: "text-emerald-500" },
    { number: "26", label: "Team Members", icon: Star, color: "text-purple-500" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Excellence",
      description: "We maintain the highest standards in every aspect of event management, from initial planning to final execution.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for creating extraordinary experiences drives us to go beyond expectations for every client.",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "We embrace cutting-edge technology and creative solutions to deliver unique and memorable events.",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: Eye,
      title: "Vision",
      description: "We see beyond the ordinary, crafting experiences that inspire, engage, and leave lasting impressions.",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  const team = [
    {
      name: "Prakash A Vaswani",
      position: "Director – Client Relations & Strategic Initiatives",
      expertise: "Strategic Planning & Client Relations",
      experience: "15+ Years",
      specialization: "Corporate Events & Business Development",
      achievements: ["Fortune 500 Partnerships", "Industry Recognition", "Strategic Growth"]
    },
    {
      name: "Vinay Kukreja",
      position: "Director – Production, Finance & Operations",
      expertise: "Operations Excellence & Financial Management",
      experience: "12+ Years",
      specialization: "Production Management & Financial Planning",
      achievements: ["Operational Efficiency", "Cost Optimization", "Quality Assurance"]
    },
    {
      name: "Hasan Peer H C",
      position: "Creative Director",
      expertise: "Creative Vision & Design Leadership",
      experience: "10+ Years",
      specialization: "Creative Concepts & Visual Design",
      achievements: ["Award-Winning Designs", "Creative Innovation", "Brand Excellence"]
    },
    {
      name: "Naveen Abraham A",
      position: "Head - Operations",
      expertise: "Execution Mastery & Team Leadership",
      experience: "8+ Years",
      specialization: "Event Execution & Team Management",
      achievements: ["Flawless Execution", "Team Development", "Process Innovation"]
    }
  ];

  const milestones = [
    {
      year: "2012",
      title: "Foundation",
      description: "White Massif was established with a vision to transform the event management landscape in Bangalore.",
      icon: Rocket
    },
    {
      year: "2015",
      title: "Growth",
      description: "Expanded our services and team, establishing ourselves as a premium event management company.",
      icon: TrendingUp
    },
    {
      year: "2018",
      title: "Innovation",
      description: "Introduced cutting-edge technology and hybrid event solutions to meet evolving client needs.",
      icon: Lightbulb
    },
    {
      year: "2021",
      title: "Excellence",
      description: "Achieved industry recognition and expanded our portfolio to include Fortune 500 companies.",
      icon: Award
    },
    {
      year: "2024",
      title: "Future",
      description: "Leading the industry with AI-powered analytics and sustainable event solutions.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Ultra-Modern Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 gradient-mesh"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        />
        
        {/* Floating Geometric Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 glass rounded-full"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 glass-primary organic-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl floating"
          style={{ rotate: 45 }}
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
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">About White Massif</span>
            </motion.div>
            
            {/* Main Headline with Kinetic Typography */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="kinetic-text">
                Crafting
              </span>
              <br />
              <span className="text-neutral-800">
                Extraordinary Experiences
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              For over a decade, we&apos;ve been transforming visions into reality, creating memorable experiences 
              that inspire, engage, and deliver measurable results for businesses across Bangalore and beyond.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary group">
                <span>Our Story</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <span>Meet Our Team</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-body text-neutral-500">Discover our story</span>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Premium Stats Section */}
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

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display mb-6 text-neutral-900 leading-tight">
                <span className="kinetic-text">Passion</span> Meets Excellence
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 font-body leading-relaxed">
                <p>
                  Founded in 2012, White Massif emerged from a simple yet powerful vision: to transform 
                  the event management landscape by combining creative excellence with flawless execution. 
                  What started as a small team of passionate professionals has grown into Bangalore&apos;s 
                  premier event management company.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, unwavering commitment to quality, 
                  and an obsession with exceeding client expectations. From intimate corporate gatherings 
                  to grand celebrations involving thousands of attendees, we&apos;ve consistently delivered 
                  experiences that inspire and engage.
                </p>
                <p>
                  Today, we stand proud as industry leaders, trusted by Fortune 500 companies and 
                  celebrated for our ability to turn ambitious visions into extraordinary realities. 
                  Our success is built on the foundation of strong relationships, innovative thinking, 
                  and an unwavering commitment to excellence.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-heading text-neutral-900 mb-8">Our Mission</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">Transform Visions</h4>
                      <p className="text-neutral-600 font-body">
                        We transform our clients&apos; visions into extraordinary experiences that exceed expectations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">Drive Innovation</h4>
                      <p className="text-neutral-600 font-body">
                        We continuously push boundaries with creative solutions and cutting-edge technology.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">Create Impact</h4>
                      <p className="text-neutral-600 font-body">
                        We create meaningful experiences that inspire, engage, and deliver measurable results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section with Neumorphism */}
      <section className="section-padding bg-neutral-100">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Our Values
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                What <span className="kinetic-text">Drives</span> Us
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Our core values guide every decision we make and every experience we create.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="neomorphism rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading mb-4 text-neutral-900">{value.title}</h3>
                <p className="text-neutral-600 font-body leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Liquid Glass */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="relative z-10 container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass-dark px-6 py-2 text-amber-400 border-amber-400/20">
                Leadership Team
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display mb-6 text-white leading-tight">
                Meet Our <span className="kinetic-text">Visionaries</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed">
                Our leadership team combines decades of experience with innovative thinking, 
                ensuring every event exceeds expectations and delivers measurable results.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-dark rounded-3xl p-8 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
                      {member.name}
                    </h3>
                    <p className="text-amber-400 font-medium mb-3">{member.position}</p>
                    <p className="text-white/70 text-sm mb-4">{member.expertise}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-white font-semibold text-sm">Experience</div>
                        <div className="text-white/60 text-xs">{member.experience}</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Specialization</div>
                        <div className="text-white/60 text-xs">{member.specialization}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.achievements.map((achievement, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Our Journey
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                <span className="kinetic-text">Milestones</span> of Excellence
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                A decade of growth, innovation, and success in transforming the event management industry.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="glass rounded-3xl p-8">
                      <div className="text-4xl font-display text-amber-600 mb-4">{milestone.year}</div>
                      <h3 className="text-2xl font-heading text-neutral-900 mb-4">{milestone.title}</h3>
                      <p className="text-neutral-600 font-body leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container-fluid mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display mb-8 text-neutral-900">
                Ready to <span className="kinetic-text">Partner</span> With Us?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
                Let&apos;s collaborate to create extraordinary experiences that inspire your audience 
                and deliver measurable business results through innovative design and flawless execution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button className="btn-primary text-lg px-12 py-6">
                  <span>Start Collaboration</span>
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                
                <div className="flex items-center space-x-6">
                  <a href="tel:+91-990-0141-155" className="group flex items-center space-x-3 text-neutral-600 hover:text-amber-600 transition-colors">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">+91-990-0141-155</span>
                  </a>
                  
                  <a href="mailto:info@whitemassif.com" className="group flex items-center space-x-3 text-neutral-600 hover:text-amber-600 transition-colors">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Get in Touch</span>
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-neutral-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Custom Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Expert Guidance</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 