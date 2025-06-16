'use client';

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  TrendingUp,
  Mail,
  Sparkles
} from "lucide-react";

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

export default function CareersPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const jobOpenings = [
    {
      title: "Senior Event Manager",
      department: "Operations",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description: "Lead end-to-end event management for corporate clients, ensuring flawless execution and client satisfaction.",
      requirements: ["Bachelor's degree in Event Management or related field", "3+ years in corporate event management", "Strong project management skills", "Excellent communication abilities"],
      salary: "₹6-10 LPA"
    },
    {
      title: "Creative Designer",
      department: "Creative",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create stunning visual concepts and designs for corporate events, branding, and marketing materials.",
      requirements: ["Degree in Graphic Design or Visual Arts", "Proficiency in Adobe Creative Suite", "Strong portfolio of event design work", "Creative thinking and attention to detail"],
      salary: "₹4-7 LPA"
    },
    {
      title: "Client Relations Executive",
      department: "Client Relations",
      location: "Bangalore",
      type: "Full-time",
      experience: "1-3 years",
      description: "Build and maintain strong relationships with clients, ensuring their event requirements are met and exceeded.",
      requirements: ["Bachelor's degree in Business or Communications", "Excellent interpersonal skills", "Customer service experience", "Strong organizational abilities"],
      salary: "₹3-5 LPA"
    },
    {
      title: "Production Coordinator",
      department: "Production",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "Coordinate all production aspects of events including logistics, vendor management, and on-site execution.",
      requirements: ["Experience in event production", "Strong coordination skills", "Ability to work under pressure", "Knowledge of AV equipment and staging"],
      salary: "₹4-6 LPA"
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-3 years",
      description: "Develop and execute digital marketing strategies to promote our services and enhance brand visibility.",
      requirements: ["Digital marketing experience", "Knowledge of SEO, SEM, and social media", "Analytics and reporting skills", "Creative content creation abilities"],
      salary: "₹3-6 LPA"
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-6 years",
      description: "Drive business growth by identifying new opportunities and building relationships with potential clients.",
      requirements: ["Proven sales track record", "B2B sales experience preferred", "Strong networking abilities", "Strategic thinking and planning skills"],
      salary: "₹5-8 LPA"
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
      icon: TrendingUp
    },
    {
      title: "Learning & Development",
      description: "Professional courses and conference sponsorships",
      icon: GraduationCap
    },
    {
      title: "Flexible Hours",
      description: "Work-life balance with flexible timing",
      icon: Clock
    },
    {
      title: "Team Events",
      description: "Regular team outings and celebration events",
      icon: Coffee
    },
    {
      title: "Growth Opportunities",
      description: "Clear career progression paths",
      icon: Target
    },
    {
      title: "Health Benefits",
      description: "Comprehensive health insurance coverage",
      icon: Heart
    }
  ];

  const companyValues = [
    {
      title: "Innovation First",
      description: "We embrace creativity and cutting-edge solutions in every project",
      icon: Sparkles,
      color: "text-amber-500"
    },
    {
      title: "Team Excellence",
      description: "Collaborative environment where every voice matters",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Client Success",
      description: "Your growth is our success - we measure our wins by yours",
      icon: Trophy,
      color: "text-emerald-500"
    },
    {
      title: "Work-Life Balance",
      description: "Flexible schedules and wellness programs for our team",
      icon: Heart,
      color: "text-rose-500"
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
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Join Our Team</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="kinetic-text">
                Build Your
              </span>
              <br />
              <span className="text-neutral-800">
                Dream Career
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Join White Massif and be part of Bangalore&apos;s premier event management team. 
              Create exceptional experiences while growing your career in a supportive, innovative environment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary group">
                <span>View Open Positions</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
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
            {[
              { number: "26", label: "Team Members", icon: Users, color: "text-amber-400" },
              { number: "12+", label: "Years Growing", icon: TrendingUp, color: "text-emerald-400" },
              { number: "95%", label: "Employee Satisfaction", icon: Heart, color: "text-rose-400" },
              { number: "5+", label: "Open Positions", icon: Briefcase, color: "text-blue-400" }
            ].map((stat, index) => (
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

      {/* Company Values */}
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
                Our Culture
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-neutral-900 leading-tight">
                <span className="kinetic-text">What We</span> Stand For
              </h2>
              <p className="text-lg text-neutral-600 max-w-4xl mx-auto font-body leading-relaxed">
                Our values guide everything we do. From client relationships to team collaboration, 
                these principles shape our culture and drive our success.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center group-hover:from-amber-50 group-hover:to-orange-50 transition-all`}>
                  <value.icon className={`w-8 h-8 ${value.color} transition-colors`} />
                </div>
                
                <h3 className="text-xl font-heading mb-4 text-neutral-900 group-hover:text-amber-600 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-neutral-600 font-body leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
                Employee Benefits
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-neutral-900">
                <span className="kinetic-text">Why Choose</span> White Massif?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto font-body leading-relaxed">
                We believe in taking care of our team. Here&apos;s what you can expect when you join us.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl p-6 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-all flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading mb-2 text-neutral-900 group-hover:text-amber-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 font-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
                Open Positions
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-8 text-neutral-900">
                <span className="kinetic-text">Current</span> Opportunities
              </h2>
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-neutral-900 group-hover:text-amber-600 transition-colors">
                        {job.title}
                      </h3>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        {job.department}
                      </Badge>
                      <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <p className="text-neutral-600 font-body leading-relaxed mb-4">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.experience}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:w-48">
                    <Button className="btn-primary group">
                      <span>Apply Now</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button className="btn-outline group">
                      <span>Learn More</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
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
                Join Our Team
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display mb-6 text-white leading-tight">
                Don&apos;t See Your Perfect Role?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
                We&apos;re always looking for talented individuals to join our growing team. 
                Send us your resume and let&apos;s explore opportunities together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="btn-primary group">
                  <Mail className="mr-2 w-5 h-5" />
                  <span>Send Your Resume</span>
                </Button>
                <Button className="btn-secondary group">
                  <span>Learn About Our Culture</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Email your resume to: <span className="text-amber-400">careers@whitemassif.com</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 