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
      title: "Master of Event Alchemy",
      subtitle: "(Senior Event Manager)",
      department: "Operations",
      location: "Bangalore",
      type: "Full-time Legend",
      experience: "3-5 years of magic",
      description: "Transform impossible client visions into inevitable realities. Lead Fortune 500 events that become industry legends and set new standards for excellence.",
      requirements: ["Proven track record of delivering the impossible", "3+ years turning visions into legendary experiences", "Master of crisis-to-opportunity transformation", "Ability to inspire teams and clients alike"],
      salary: "₹6-10 LPA + Legend Bonus",
      impact: "Direct impact on 50+ Fortune 500 events annually"
    },
    {
      title: "Visionary Experience Architect",
      subtitle: "(Creative Designer)",
      department: "Creative",
      location: "Bangalore",
      type: "Full-time Visionary",
      experience: "2-4 years of brilliance",
      description: "Design experiences that don&apos;t just look beautiful—they feel legendary. Create visual stories that transform spaces into emotional journeys.",
      requirements: ["Portfolio that makes hearts skip beats", "Master of design tools and creative thinking", "Ability to translate emotions into visuals", "Obsession with perfection and innovation"],
      salary: "₹4-7 LPA + Creative Incentives",
      impact: "Your designs will be seen by millions across global events"
    },
    {
      title: "Client Legend Liaison",
      subtitle: "(Client Relations Executive)",
      department: "Client Relations",
      location: "Bangalore",
      type: "Full-time Relationship Builder",
      experience: "1-3 years of connection",
      description: "Be the bridge between client dreams and legendary realities. Transform one-time clients into lifelong advocates and co-creators of legends.",
      requirements: ["Natural gift for human connection", "Ability to read between the lines of client needs", "Passion for exceeding every expectation", "Fluent in both empathy and excellence"],
      salary: "₹3-5 LPA + Performance Recognition",
      impact: "Build relationships that span decades and continents"
    },
    {
      title: "Flawless Execution Maestro",
      subtitle: "(Production Coordinator)",
      department: "Production",
      location: "Bangalore",
      type: "Full-time Orchestrator",
      experience: "2-4 years of precision",
      description: "Be the invisible force that makes impossible events look effortless. Coordinate complex productions where every detail matters and every moment counts.",
      requirements: ["Proven ability to make chaos look like choreography", "Expert in production logistics and vendor symphonies", "Grace under pressure, excellence under deadlines", "Technical knowledge meets creative vision"],
      salary: "₹4-6 LPA + Excellence Rewards",
      impact: "Enable flawless execution of 100+ events annually"
    }
  ];

  const benefits = [
    {
      title: "Legend-Worthy Compensation",
      description: "Premium packages that reflect your premium talent and contribution",
      icon: TrendingUp
    },
    {
      title: "Mastery Investment",
      description: "Unlimited learning budget—courses, conferences, certifications. Your growth is our priority",
      icon: GraduationCap
    },
    {
      title: "Freedom to Create",
      description: "Flexible schedules that honor your peak creativity hours and life priorities",
      icon: Clock
    },
    {
      title: "Legend Celebrations",
      description: "Epic team experiences that build bonds and create memories worth sharing",
      icon: Coffee
    },
    {
      title: "Unlimited Ascension",
      description: "No ceiling on your potential. We build career paths as ambitious as your dreams",
      icon: Target
    },
    {
      title: "Holistic Wellness",
      description: "Complete health coverage because your wellbeing enables your brilliance",
      icon: Heart
    }
  ];

  const companyValues = [
    {
      title: "Obsession with Excellence",
      description: "We don&apos;t accept good enough. Every project is a masterpiece waiting to be born",
      icon: Sparkles,
      color: "text-amber-500"
    },
    {
      title: "Legendary Collaboration",
      description: "Individual brilliance amplified by collective genius. Where minds meet, magic happens",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Client Legend Creation",
      description: "We don&apos;t just serve clients—we create legends together. Their success becomes our legacy",
      icon: Trophy,
      color: "text-emerald-500"
    },
    {
      title: "Balanced Brilliance",
      description: "Peak performance requires peak wellness. We nurture whole humans, not just workers",
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
              <Users className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Legend Makers Wanted</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="kinetic-text">
                Don&apos;t Just Work.
              </span>
              <br />
              <span className="text-neutral-800">
                Create Legends.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Ordinary careers create ordinary outcomes. At WhiteMassif, we don&apos;t hire employees—we forge visionaries. 
              Join the team that turns impossible visions into inevitable realities. Your legend starts here.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary group">
                <span>Begin Your Legend</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <span>Meet The Legends</span>
                <Users className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                The Legend Code
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900 leading-tight">
                <span className="kinetic-text">How Legends</span> Are Born
              </h2>
              <p className="text-xl text-neutral-600 max-w-4xl mx-auto font-body leading-relaxed">
                These aren&apos;t just company values—they&apos;re the sacred principles that transform ordinary people into extraordinary creators. 
                Every legend who joins us embodies these truths.
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
                Legend Privileges
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                <span className="kinetic-text">Why Legends</span> Choose Us
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body leading-relaxed">
                Because legends deserve legendary treatment. Here&apos;s how we invest in the visionaries who make miracles happen.
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
                Legend Openings
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900">
                Your <span className="kinetic-text">Legendary Role</span> Awaits
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body mb-12">
                These aren&apos;t just jobs—they&apos;re invitations to join an elite team of visionaries. Find your perfect match and begin your legend.
              </p>
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
                      <div>
                        <h3 className="text-2xl font-heading text-neutral-900 group-hover:text-amber-600 transition-colors">
                          {job.title}
                        </h3>
                        {job.subtitle && (
                          <p className="text-sm text-neutral-500 mt-1">{job.subtitle}</p>
                        )}
                      </div>
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
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-4">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.experience}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                    </div>
                    
                    {job.impact && (
                      <div className="glass bg-amber-50 border-amber-200 rounded-xl p-4">
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-amber-600" />
                          <span className="text-sm font-medium text-amber-700">Impact: {job.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:w-48">
                    <Button className="btn-primary group">
                      <span>Join This Legend</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button className="btn-outline group">
                      <span>Discover More</span>
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
                Create Your Own Legend
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-white leading-tight">
                Don&apos;t See Your <span className="kinetic-text text-amber-400">Legendary Role?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-body">
                True legends aren&apos;t defined by job descriptions—they define their own paths. If you&apos;re a visionary who doesn&apos;t fit in boxes, 
                let&apos;s create a role as unique as your talent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="btn-primary group">
                  <Mail className="mr-2 w-5 h-5" />
                  <span>Pitch Your Legend</span>
                </Button>
                <Button className="btn-secondary group">
                  <span>Meet Current Legends</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Email your vision to: <span className="text-amber-400">legends@whitemassif.com</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 