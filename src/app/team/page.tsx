'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  Star,
  Calendar,
  Award,
  Lightbulb,
  Zap,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Image from "next/image";
import { DirectusService, type TeamMember } from '@/lib/directus-service';
import { usePopup } from '@/components/popup-provider';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function TeamPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { openPopup } = usePopup();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      const fetchedMembers = await DirectusService.getTeamMembers();
      console.log('Fetched team members:', fetchedMembers);
      setTeamMembers(fetchedMembers);
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  const stats = [
    { number: "1000+", label: "Events", icon: Calendar },
    { number: "165+", label: "Clients", icon: Star },
    { number: "35+", label: "Team Size", icon: Users },
    { number: "2M+", label: "Audience Engaged", icon: Trophy }
  ];

  const categories = ["All", ...Array.from(new Set(teamMembers.map(member => member.department).filter(Boolean)))];

  const filteredTeam = selectedCategory === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Clean Gradient */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#2A3959] via-[#1A2340] to-[#0F1826]">
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
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">The Visionaries</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8">
              <span className="kinetic-text">
                Meet Our
              </span>
              <br />
              <span className="text-white">
                Expert Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-body">
              Meet the passionate professionals who bring your corporate events to life. Our experienced team combines strategic thinking with creative execution to deliver exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Refined */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-brand-yellow" />
                </div>
                <div className="text-3xl md:text-4xl font-light text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section - Clean Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900 leading-tight max-w-3xl">
                Where <span className="kinetic-text">Expertise</span> Meets Excellence
              </h2>
              <p className="text-xl mb-8 text-neutral-700 leading-relaxed font-body">
                Our team brings together diverse skills and experience from across the event management industry. Each member contributes specialized knowledge to ensure your corporate events achieve their strategic objectives.
              </p>
              <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-body">
                With 12+ years since inception and over 1000+ events delivered, our 35+ team members have engaged 2 million+ audience and served 165+ clients with the proven expertise to handle everything from intimate leadership meetings to large-scale corporate conferences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Professional Methodology",
                  "Comprehensive Assessments", 
                  "Cross-Industry Experience",
                  "Turnkey Solutions"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1 h-1 bg-brand-yellow rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-[#2A3959] via-[#1A2340] to-[#0F1826]">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F9A625]/20 via-transparent to-[#F9A625]/10"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-[#F9A625]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-12 right-16 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-8 w-2 h-2 bg-[#F9A625] rounded-full animate-pulse"></div>
                <div className="absolute top-16 left-16 w-1 h-1 bg-white/60 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-1 h-1 bg-[#F9A625]/80 rounded-full"></div>
                
                {/* Geometric Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-1/4 w-24 h-24 border border-white/20 rounded-lg rotate-12"></div>
                  <div className="absolute bottom-8 left-1/4 w-16 h-16 border border-[#F9A625]/30 rounded-lg -rotate-12"></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
                  <div className="w-16 h-16 bg-[#F9A625]/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                    <Trophy className="w-8 h-8 text-[#F9A625]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Team Excellence</h3>
                  <p className="text-white/80 text-lg max-w-md">Dedicated professionals delivering exceptional results through strategic thinking and creative execution</p>
                  
                  {/* Stats Icons */}
                  <div className="flex items-center space-x-6 mt-6">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-[#F9A625]" />
                      </div>
                      <span className="text-xs text-white/60">Team</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-1">
                        <Star className="w-4 h-4 text-[#F9A625]" />
                      </div>
                      <span className="text-xs text-white/60">Quality</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 text-[#F9A625]" />
                      </div>
                      <span className="text-xs text-white/60">Results</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Team Members Section - Clean Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900 leading-tight">
                Our <span className="kinetic-text">Professional</span> Team
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Meet the dedicated professionals who bring strategic thinking, creative vision, and operational excellence to every corporate event.
              </p>
            </motion.div>
          </motion.div>

          {/* Category Filter - Minimal Pills */}
          {!loading && categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-20"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          {/* Team Grid - Clean Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredTeam.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display text-neutral-600 mb-2">No team members found</h3>
              <p className="text-neutral-500">Check back later as we update our team information.</p>
            </div>
          ) : (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTeam.map((member, index) => (
                <motion.div key={member.id || index} variants={fadeInUp}>
                  <div className="bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500">
                    <div className="relative">
                      <div className="w-full h-80 bg-gray-100 overflow-hidden">
                        {member.team_member_image ? (
                          <Image
                            src={typeof member.team_member_image === 'string' 
                              ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${member.team_member_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}&key=system-large-cover` 
                              : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${(member.team_member_image as { id: string }).id}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}&key=system-large-cover`
                            }
                            alt={member.name}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              console.error('Image failed to load:', e.currentTarget.src);
                              console.log('Member data:', member);
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-yellow/20 to-brand-blue/20 flex items-center justify-center">
                            <Users className="w-16 h-16 text-brand-blue" />
                          </div>
                        )}
                      </div>
                      {member.department && (
                        <div className="absolute top-3 right-3">
                          <span className="text-xs font-medium text-white bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            {member.department}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-black mb-2 group-hover:text-brand-blue transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{member.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA - Minimal */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-6xl font-display mb-8 leading-tight">
                Ready to Work with
                <br />
                <span className="kinetic-text text-amber-400">Our Team?</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-body">
                Experience the difference that comes from working with seasoned professionals who understand corporate event management. 
                Let's create exceptional experiences together.
              </p>
              
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="btn-primary group">
                  <span>Start Your Project</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button className="btn-secondary group">
                  <span>Join Our Team</span>
                  <Users className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 