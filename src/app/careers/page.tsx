'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { DirectusService, type Job } from '@/lib/directus-service';
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
  Sparkles,
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
      staggerChildren: 0.15
    }
  }
};

export default function CareersPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Directus
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await DirectusService.getJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to hardcoded jobs if Directus fails
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fallback jobs data that matches Job interface
  const fallbackJobs: Job[] = [
    {
      id: 1,
      title: "Master of Event Alchemy",
      subtitle: "(Senior Event Manager)",
      department: "Operations",
      location: "Bangalore",
      type: "Full-time Professional",
      experience: "3-5 years of magic",
      description: "Transform ambitious client visions into exceptional realities. Lead Fortune 500 events that set new industry standards and create lasting impact.",
      requirements: ["Proven track record of delivering complex projects", "3+ years creating extraordinary experiences", "Expert in crisis-to-opportunity transformation", "Ability to inspire teams and clients alike"],
      salary: "₹6-10 LPA + Performance Bonus",
      impact: "Direct impact on 50+ Fortune 500 events annually",
      status: "published" as const,
      sort_order: 1
    },
    {
      id: 2,
      title: "Visionary Experience Architect",
      subtitle: "(Creative Designer)",
      department: "Creative",
      location: "Bangalore",
      type: "Full-time Visionary",
      experience: "2-4 years of brilliance",
      description: "Design experiences that don&apos;t just look beautiful—they feel extraordinary. Create visual stories that transform spaces into emotional journeys.",
      requirements: ["Portfolio that makes hearts skip beats", "Master of design tools and creative thinking", "Ability to translate emotions into visuals", "Obsession with perfection and innovation"],
      salary: "₹4-7 LPA + Creative Incentives",
      impact: "Your designs will be seen by millions across global events",
      status: "published" as const,
      sort_order: 2
    },
    {
      id: 3,
      title: "Client Experience Specialist",
      subtitle: "(Client Relations Executive)",
      department: "Client Relations",
      location: "Bangalore",
      type: "Full-time Relationship Builder",
      experience: "1-3 years of connection",
      description: "Be the bridge between client visions and exceptional realities. Transform one-time clients into lifelong advocates and strategic partners.",
      requirements: ["Natural gift for human connection", "Ability to read between the lines of client needs", "Passion for exceeding every expectation", "Fluent in both empathy and excellence"],
      salary: "₹3-5 LPA + Performance Recognition",
      impact: "Build relationships that span decades and continents",
      status: "published" as const,
      sort_order: 3
    },
    {
      id: 4,
      title: "Flawless Execution Maestro",
      subtitle: "(Production Coordinator)",
      department: "Production",
      location: "Bangalore",
      type: "Full-time Orchestrator",
      experience: "2-4 years of precision",
      description: "Be the invisible force that makes impossible events look effortless. Coordinate complex productions where every detail matters and every moment counts.",
      requirements: ["Proven ability to make chaos look like choreography", "Expert in production logistics and vendor symphonies", "Grace under pressure, excellence under deadlines", "Technical knowledge meets creative vision"],
      salary: "₹4-6 LPA + Excellence Rewards",
      impact: "Enable flawless execution of 100+ events annually",
      status: "published" as const,
      sort_order: 4
    }
  ];

  // Removed benefits and company values sections for simplified page

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
              <span className="text-sm font-medium tracking-wide">Visionaries Wanted</span>
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
                Create Excellence.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Ordinary careers create ordinary outcomes. At WhiteMassif, we don&apos;t hire employees—we forge visionaries. 
              Join the team that turns impossible visions into inevitable realities. Your journey to excellence begins here.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary group">
                <span>Start Your Journey</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <span>Meet The Visionaries</span>
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
              { number: "1000+", label: "Events", icon: Trophy, color: "text-amber-400" },
              { number: "165+", label: "Clients", icon: Users, color: "text-emerald-400" },
              { number: "35+", label: "Team Size", icon: TrendingUp, color: "text-rose-400" },
              { number: "2M+", label: "Audience Engaged", icon: Heart, color: "text-blue-400" }
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
                Career Opportunities
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900">
                Your <span className="kinetic-text">Exceptional Role</span> Awaits
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body mb-12">
                These aren&apos;t just jobs—they&apos;re invitations to join an elite team of visionaries. Find your perfect match and begin your journey to excellence.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(loading ? [] : jobs.length > 0 ? jobs : fallbackJobs).map((job, index) => (
              <motion.div
                key={job.id || index}
                variants={fadeInUp}
                className="group"
              >
                <div className="glass rounded-3xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-500 micro-bounce">
                  {/* Job Header */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        {job.department}
                      </Badge>
                      <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-heading text-neutral-900 group-hover:text-amber-600 transition-colors mb-2">
                      {job.title}
                    </h3>
                    {job.subtitle && (
                      <p className="text-sm text-neutral-500">{job.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1 mb-6">
                    <p className="text-neutral-600 font-body leading-relaxed mb-4 text-sm line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-neutral-500 mb-4">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    {job.impact && (
                      <div className="glass bg-amber-50 border-amber-200 rounded-xl p-3 mb-4">
                        <div className="flex items-start">
                          <Trophy className="w-4 h-4 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-amber-700 leading-relaxed">{job.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={() => window.open('mailto:jobs@whitemassif.com?subject=Application for ' + job.title + '&body=Dear WhiteMassif Team,%0D%0A%0D%0AI am writing to express my interest in the ' + job.title + ' position.%0D%0A%0D%0APlease find my CV attached. I would be happy to discuss how my experience aligns with your requirements.%0D%0A%0D%0ABest regards', '_blank')}
                      className="btn-primary group w-full"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      onClick={() => window.open('mailto:jobs@whitemassif.com?subject=Inquiry about ' + job.title + ' role', '_blank')}
                      className="btn-outline group w-full"
                    >
                      <span>Ask Questions</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-600 font-body">Loading positions from Directus...</p>
            </motion.div>
          )}

          {/* No Jobs State */}
          {!loading && jobs.length === 0 && fallbackJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display text-neutral-600 mb-2">No Open Positions</h3>
              <p className="text-neutral-500 max-w-md mx-auto">We're not actively hiring right now, but exceptional talent is always welcome. Feel free to reach out!</p>
            </motion.div>
          )}
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
                Create Your Own Path
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-white leading-tight">
                Don&apos;t See Your <span className="kinetic-text text-amber-400">Ideal Role?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-body">
                Exceptional professionals aren&apos;t defined by job descriptions—they define their own paths. If you&apos;re a visionary who doesn&apos;t fit in boxes, 
                let&apos;s create a role as unique as your talent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => window.open('mailto:jobs@whitemassif.com?subject=Creating My Own Exceptional Role&body=Dear WhiteMassif Team,%0D%0A%0D%0AI am a visionary professional interested in creating a unique role that aligns with my skills and your company\'s mission.%0D%0A%0D%0APlease find my CV and cover letter attached outlining my vision for contributing to WhiteMassif.%0D%0A%0D%0ABest regards', '_blank')}
                  className="btn-primary group"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  <span>Create Custom Role</span>
                </Button>
                <Button 
                  onClick={() => window.location.href = '/team'}
                  variant="outline"
                  className="border-2 border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group"
                >
                  <span>Meet Our Team</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">
                  Email your application to: <span className="text-amber-400">jobs@whitemassif.com</span>
                </p>
                <p className="text-white/50 text-xs">
                  Include your cover letter and attach your CV to make your application complete
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 