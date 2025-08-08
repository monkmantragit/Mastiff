'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Eye, Users, Calendar, Award, Star } from "lucide-react";

export default function WorkPage() {
  const { openPopup } = usePopup();

  const stats = [
    { number: "500+", label: "Events Delivered", icon: Calendar },
    { number: "165+", label: "Happy Clients", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8">
              <Eye className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide text-white">Premier Showcase</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8">
              <span className="kinetic-text text-white">
                Where Dreams
              </span>
              <br />
              <span className="text-amber-400">
                Become Reality
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-white/90 leading-relaxed">
              Step into our portfolio of excellence. Every project here represents an ambitious vision made reality, 
              a bold dream transformed into unforgettable experiences. This is where extraordinary happens.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => openPopup('work-portfolio')}
                className="btn-primary group"
              >
                <span>Explore The Portfolio</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => openPopup('work-contact')}
                className="btn-secondary group"
              >
                <span>Create Your Masterpiece</span>
                <Trophy className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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