'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MapPin,
  Palette,
  Heart,
  Cog,
  Building,
  BarChart3,
  Crown,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { TeamService, type TeamMember } from '@/lib/team-service';
import { usePopup } from '@/components/popup-provider';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const leadershipAnimation = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

export default function TeamPage() {
  const [teamStructure, setTeamStructure] = useState<{
    leadership: TeamMember[];
    creative: TeamMember[];
    clientServices: TeamMember[];
    production: TeamMember[];
    operations: TeamMember[];
    strategy: TeamMember[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalMembers: number;
    departmentCounts: Record<string, number>;
    averageExperience: number;
  } | null>(null);
  const { openPopup } = usePopup();

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const [structure, teamStats] = await Promise.all([
          TeamService.getOrganizedTeamStructure(),
          TeamService.getTeamStats()
        ]);
        setTeamStructure(structure);
        setStats(teamStats);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const departmentConfigs = [
    {
      key: 'creative',
      title: 'Creative Team',
      subtitle: 'Bringing Ideas to Life',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      key: 'clientServices',
      title: 'Client Servicing',
      subtitle: 'Your Success Partners',
      icon: Heart,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      key: 'production',
      title: 'Production',
      subtitle: 'Excellence in Execution',
      icon: Cog,
      gradient: 'from-orange-500 to-amber-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      key: 'operations',
      title: 'Operations',
      subtitle: 'Seamless Coordination',
      icon: Building,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      key: 'strategy',
      title: 'Strategy',
      subtitle: 'Strategic Innovation',
      icon: BarChart3,
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  ];

  const renderTeamMember = (member: TeamMember, isLeadership = false) => (
    <motion.div
      key={member.id}
      variants={isLeadership ? leadershipAnimation : fadeInUp}
      className="group"
    >
      <Card className={`overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isLeadership 
          ? 'bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200/50' 
          : 'bg-white border border-neutral-200 hover:border-neutral-300'
      }`}>
        <div className="relative">
          <div className={`w-full ${isLeadership ? 'h-96' : 'h-80'} bg-neutral-100 overflow-hidden`}>
            {member.team_member_image ? (
              <Image
                src={TeamService.getTeamMemberImageUrl(member.team_member_image) || ''}
                alt={member.name}
                width={400}
                height={isLeadership ? 480 : 400}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  console.error('Team member image failed to load:', e.currentTarget.src);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                <Users className="w-16 h-16 text-neutral-400" />
              </div>
            )}
            

          </div>
        </div>
        
        <CardContent className={`p-6 ${isLeadership ? 'bg-gradient-to-r from-amber-50/50 to-orange-50/50' : ''}`}>
          <h3 className={`${
            isLeadership ? 'text-xl' : 'text-lg'
          } font-bold text-neutral-900 mb-2 group-hover:text-amber-600 transition-colors`}>
            {member.name}
          </h3>
          <p className={`${
            isLeadership ? 'text-base' : 'text-sm'
          } text-neutral-600 leading-relaxed`}>
            {member.position}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderDepartmentSection = (config: typeof departmentConfigs[0], members: TeamMember[]) => {
    if (!members || members.length === 0) return null;

    const IconComponent = config.icon;

    return (
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-20"
      >
        {/* Department Header */}
        <div className="text-center mb-12">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 ${config.iconBg} rounded-2xl flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-display font-bold text-neutral-900">
                {config.title}
              </h2>
              <p className="text-neutral-600">{config.subtitle}</p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
          </motion.div>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {members.map(member => renderTeamMember(member, false))}
        </motion.div>
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto text-white"
          >
            <div className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Crown className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-medium tracking-wide">Meet The Visionaries</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8">
              <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                The Minds Behind
              </span>
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Extraordinary Events
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Meet the passionate professionals who transform corporate visions into unforgettable experiences. 
              Our diverse team combines strategic thinking, creative brilliance, and operational excellence.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-600">Loading our amazing team...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Leadership Section */}
            {teamStructure?.leadership && teamStructure.leadership.length > 0 && (
              <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="mb-32"
              >
                <div className="text-center mb-16">
                  <motion.div variants={fadeInUp}>
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-4xl font-display font-bold text-neutral-900">
                          Leadership
                        </h2>
                        <p className="text-neutral-600">Guiding Our Vision Forward</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                  </motion.div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                  {teamStructure.leadership.map(member => renderTeamMember(member, true))}
                </motion.div>
              </motion.section>
            )}

            {/* Department Sections */}
            {departmentConfigs.map(config => 
              renderDepartmentSection(config, teamStructure?.[config.key as keyof typeof teamStructure] as TeamMember[] || [])
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 font-medium">Ready to Work Together?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display mb-6 leading-tight">
                Experience the <span className="text-amber-400">White Massif</span> Difference
              </h2>
              
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Partner with our experienced team to create corporate events that exceed expectations. 
                Let's turn your vision into an extraordinary reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => openPopup('team-cta')}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 group"
                >
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