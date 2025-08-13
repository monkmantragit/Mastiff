'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePopup } from "@/components/popup-provider";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Eye, Users, Calendar, Award, Star, MapPin } from "lucide-react";

export default function WorkPage() {
  const { openPopup } = usePopup();

  // Get hero video from Directus
  const getDirectusVideoUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
    const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;
    const videoId = '7a5bad64-b0b0-496c-94df-7e4a12436696';
    return `${baseUrl}/assets/${videoId}?access_token=${token}`;
  };

  const stats = [
    { number: "1000+", label: "Events Delivered", icon: Calendar },
    { number: "165+", label: "Happy Clients", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "2M+", label: "Audience Engagement", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Video Section */}
      <section className="relative h-screen min-h-[500px] overflow-hidden">
        {/* Full Video Background */}
        <div className="absolute inset-0 z-0 bg-neutral-900">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            loading="lazy"
            style={{
              zIndex: 1,
              willChange: 'auto',
              backfaceVisibility: 'hidden'
            }}
          >
            <source src={getDirectusVideoUrl()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Top Badge */}
        <motion.div 
          className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs md:text-sm px-3 md:px-4 py-2">
            <Eye className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Premier Portfolio Showcase</span>
            <span className="sm:hidden">Portfolio</span>
          </Badge>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <div className="text-xs md:text-sm mb-2">Scroll to Explore</div>
          <div className="w-0.5 h-6 md:h-8 bg-white/60 mx-auto"></div>
        </motion.div>
      </section>

      {/* Compact Hero Content Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6">
              <span className="text-white">
                Where Dreams
              </span>
              <br />
              <span className="text-amber-400">
                Become Reality
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 font-body max-w-3xl mx-auto text-white/90 leading-relaxed">
              Step into our portfolio of excellence. Every project here represents an ambitious vision made reality, 
              a bold dream transformed into unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => openPopup('work-portfolio')}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900 font-semibold px-6 py-3 rounded-full transition-all duration-300 group"
              >
                <span>Explore The Portfolio</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => openPopup('work-contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 font-semibold px-6 py-3 rounded-full transition-all duration-300 group"
              >
                <span>Create Your Masterpiece</span>
                <Trophy className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-neutral-900" />
                </div>
                <div className="text-4xl md:text-5xl font-display text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900 leading-tight">
              Ready to Create Your <span className="kinetic-text">Extraordinary Moment?</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
              Your vision deserves more than an event—it deserves to become exceptional. Let&apos;s transform your ambitious dream into an extraordinary reality.
            </p>
            
            <Button 
              onClick={() => openPopup('work-start')}
              size="lg" 
              className="btn-primary font-body px-8 py-6 text-lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}