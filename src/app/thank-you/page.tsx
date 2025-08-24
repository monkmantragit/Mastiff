'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Star,
  Home,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  message: string;
  timestamp: string;
}

export default function ThankYouPage() {
  const [enquiryData, setEnquiryData] = useState<EnquiryData | null>(null);

  useEffect(() => {
    // Get the enquiry data from localStorage
    const storedData = localStorage.getItem('enquiryData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setEnquiryData(data);
      } catch (error) {
        console.error('Error parsing enquiry data:', error);
      }
    }
  }, []);

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

  const nextSteps = [
    {
      icon: Phone,
      title: "We'll Call You",
      description: "Our event specialist will contact you soon to discuss your requirements in detail.",
      timeline: "Next Step"
    },
    {
      icon: Calendar,
      title: "Free Consultation",
      description: "Schedule a personalized consultation to explore ideas, budget, and timeline for your event.",
      timeline: "Following Step"
    },
    {
      icon: MessageCircle,
      title: "Proposal & Quote",
      description: "Receive a detailed proposal with creative concepts, timeline, and transparent pricing.",
      timeline: "Final Step"
    }
  ];

  const whyChooseUs = [
    { icon: Star, title: "1000+ Events", description: "Successfully executed" },
    { icon: Users, title: "35+ Specialists", description: "Creative professionals" },
    { icon: CheckCircle, title: "12+ Years", description: "In industry" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden mobile-section-padding">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#F9A625] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2A3959] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center mobile-container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Success Icon */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-green-50 text-green-700 border-green-200 px-6 py-3 text-base">
                Enquiry Received Successfully
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6 leading-tight mobile-heading">
                Thank You{enquiryData?.name ? `, ${enquiryData.name}` : ''}!<br />
                <span className="text-[#F9A625]">Your Journey Begins Now</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed mobile-body-text">
                We're excited to help you create an extraordinary event. Our team is already working on your requirements.
              </p>
            </motion.div>

            {/* Enquiry Summary */}
            {enquiryData && (
              <motion.div 
                variants={fadeInUp}
                className="glass rounded-2xl p-6 lg:p-8 mb-12 text-left max-w-2xl mx-auto"
              >
                <h3 className="text-xl font-bold text-[#2A3959] mb-4 text-center">Your Enquiry Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {enquiryData.eventType && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#F9A625] rounded-full"></div>
                      <span className="text-gray-600">Event:</span>
                      <span className="font-medium">{enquiryData.eventType}</span>
                    </div>
                  )}
                  {enquiryData.eventDate && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#F9A625] rounded-full"></div>
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(enquiryData.eventDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {enquiryData.location && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#F9A625] rounded-full"></div>
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{enquiryData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#F9A625] rounded-full"></div>
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{enquiryData.phone}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-16"
            >
              <a href="mailto:info@whitemassif.com">
                <Button 
                  className="mobile-touch-target bg-white border-2 border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white text-base font-semibold px-8 py-4 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto mobile-container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/30 px-6 py-3">
                What Happens Next
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6 text-[#2A3959] leading-tight">
                Your <span className="text-[#F9A625]">Event Journey</span> Timeline
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We follow a proven process to ensure your event exceeds every expectation.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {nextSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F9A625] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 text-sm">
                      {step.timeline}
                    </Badge>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#2A3959] group-hover:text-[#F9A625] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-[#2A3959]">
        <div className="max-w-6xl mx-auto mobile-container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl lg:text-3xl font-display text-white mb-8">
                Why 175+ Clients <span className="text-[#F9A625]">Trust Us</span>
              </h3>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center text-white"
                >
                  <IconComponent className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{item.title}</div>
                  <div className="text-white/80">{item.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center mobile-container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl lg:text-3xl font-display text-[#2A3959] mb-6">
                While You Wait, Explore More
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Watch our event highlights and get inspired by our work.
              </p>
            </motion.div>

            {/* YouTube Videos Grid */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/hponiJNMci4?si=Kr3YatQ7HvA_GeuP" 
                  title="Event Highlight 1" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/jpa8mcB7E1w?si=Zk8uj3oXX6VR-TyA" 
                  title="Event Highlight 2" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/1eIJiqC2i3s?si=AWFmlR9rtE3dZ6-i" 
                  title="Event Highlight 3" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <Button className="mobile-touch-target border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white" variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/portfolio">
                <Button className="mobile-touch-target border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  View Portfolio
                </Button>
              </Link>
              
              <Link href="/services">
                <Button className="btn-primary mobile-touch-target">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}