'use client';

import React from 'react';
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

  // Real White Massif team data
  const teamMembers = [
    {
      name: "Prakash A Vaswani",
      position: "Director – Client Relations & Strategic Initiatives",
      image: "/assets/images/team/Untitled-design-69.png",
      category: "Leadership"
    },
    {
      name: "Vinay Kukreja",
      position: "Director – Production, Finance & Operations",
      image: "/assets/images/team/Untitled-design-71.png",
      category: "Leadership"
    },
    {
      name: "Hasan Peer H C",
      position: "Creative Director",
      image: "/assets/images/team/Untitled-design-2.png",
      category: "Creative"
    },
    {
      name: "Naveen Abraham A",
      position: "Head - Operations",
      image: "/assets/images/team/Untitled-design-3.png",
      category: "Operations"
    },
    {
      name: "Pehal Kukreja",
      position: "Head – Finance & Accounting",
      image: "/assets/images/team/Untitled-design-72.png",
      category: "Finance"
    },
    {
      name: "Yogesh S",
      position: "Director of Event Production",
      image: "/assets/images/team/Untitled-design-17-1.png",
      category: "Production"
    },
    {
      name: "Neha",
      position: "Art Director",
      image: "/assets/images/team/Untitled-design-18-1.png",
      category: "Creative"
    },
    {
      name: "Prerna Gautam",
      position: "Client Servicing Manager",
      image: "/assets/images/team/Prerna-Gautam-Website-.png",
      category: "Client Relations"
    },
    {
      name: "Reynold Marshal X",
      position: "Operations Manager",
      image: "/assets/images/team/RAM-Website-.png",
      category: "Operations"
    },
    {
      name: "Sampurnaa Basak",
      position: "Human Resource Manager",
      image: "/assets/images/team/Untitled-design-7.png",
      category: "HR"
    },
    {
      name: "Yashawanth Prabhu",
      position: "Senior Designer",
      image: "/assets/images/team/Untitled-design-8.png",
      category: "Creative"
    },
    {
      name: "Joel Kevyn Braganza",
      position: "Senior Production Executive",
      image: "/assets/images/team/Untitled-design-9-e1723116048188.png",
      category: "Production"
    },
    {
      name: "Supreeth G",
      position: "Senior Motion Graphic Designer",
      image: "/assets/images/team/Untitled-design-12.png",
      category: "Creative"
    },
    {
      name: "Samarth A Patil",
      position: "Senior Client Relations Executive",
      image: "/assets/images/team/Untitled-design-13.png",
      category: "Client Relations"
    },
    {
      name: "Palak Kothari",
      position: "Senior Design and Content Conceptualizer",
      image: "/assets/images/team/POGO-Website-.png",
      category: "Creative"
    },
    {
      name: "Saloni Jain",
      position: "Senior Client Servicing Executive",
      image: "/assets/images/team/Untitled-design-14.png",
      category: "Client Relations"
    },
    {
      name: "Sowmya A",
      position: "Digital Marketing Specialist",
      image: "/assets/images/team/Untitled-design-15.png",
      category: "Marketing"
    },
    {
      name: "Sriram Sridhar",
      position: "Assistant Production Manager",
      image: "/assets/images/team/Sriram-Website-.png",
      category: "Production"
    },
    {
      name: "Ramya R Srivatsa",
      position: "Client Servicing Executive",
      image: "/assets/images/team/Ramya-Website-.png",
      category: "Client Relations"
    },
    {
      name: "Bhavika K Jain",
      position: "Senior Executive - Client Servicing",
      image: "/assets/images/team/Untitled-design-18.png",
      category: "Client Relations"
    },
    {
      name: "Anointa James",
      position: "Graphic Designer",
      image: "/assets/images/team/Untitled-design-19.png",
      category: "Creative"
    },
    {
      name: "Nithin H.C",
      position: "Production Executive",
      image: "/assets/images/team/Untitled-design-20.png",
      category: "Production"
    },
    {
      name: "Karunya Anububojan",
      position: "Client Servicing Executive",
      image: "/assets/images/team/Untitled-design-25.png",
      category: "Client Relations"
    },
    {
      name: "R Rajesh",
      position: "Operations Executive",
      image: "/assets/images/team/Untitled-design-26.png",
      category: "Operations"
    },
    {
      name: "Ram Babu",
      position: "Operations Executive",
      image: "/assets/images/team/Untitled-design-31.png",
      category: "Operations"
    },
    {
      name: "Kosinapogu ramesh",
      position: "Operations Executive",
      image: "/assets/images/team/Untitled-design-31.png",
      category: "Operations"
    }
  ];

  const stats = [
    { number: "26", label: "Team Members", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Events Delivered", icon: Calendar },
    { number: "160+", label: "Happy Clients", icon: Star }
  ];

  const departments = [
    { name: "Leadership", count: 3, icon: Target, color: "bg-brand-blue" },
    { name: "Creative", count: 6, icon: Lightbulb, color: "bg-brand-yellow" },
    { name: "Operations", count: 5, icon: Zap, color: "bg-brand-blue" },
    { name: "Client Relations", count: 6, icon: Users, color: "bg-brand-yellow" },
    { name: "Production", count: 4, icon: Trophy, color: "bg-brand-blue" },
    { name: "Others", count: 2, icon: Star, color: "bg-brand-yellow" }
  ];

  const categories = ["All", "Leadership", "Creative", "Operations", "Client Relations", "Production", "Finance", "HR", "Marketing"];

  const filteredTeam = selectedCategory === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Apple Style */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/team/Untitled-design-69.png"
            alt="White Massif Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <p className="text-sm font-medium tracking-wider uppercase mb-4 text-brand-yellow">
              Our Team
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight">
              Meet Our
              <br />
              <span className="font-medium">Dynamic Team</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our team comprises dynamic individuals propelled by creativity and efficiency, 
              employing professional methodology and extensive cross-industry experience.
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
              <p className="text-sm font-medium tracking-wider uppercase mb-4 text-brand-blue">
                About White Massif
              </p>
              <h2 className="text-3xl md:text-5xl font-light mb-6 text-black tracking-tight">
                Building Lasting Partnerships
              </h2>
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                At White Massif Corporate Events, we believe in building lasting partnerships with our clients. 
                Our distinctive approach involves open communication, collaborative planning and a commitment to 
                delivering events that exceed expectations.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our success is measured by the success of our clients&apos; events. From concept to execution, 
                our team of dedicated professionals turn your vision into reality.
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
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/assets/images/team/Untitled-design-2.png"
                  alt="White Massif Team Culture"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-medium mb-1">Team Excellence</h3>
                  <p className="text-sm text-white/80">Dedicated professionals delivering exceptional results</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Departments Section - Minimalist */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-sm font-medium tracking-wider uppercase mb-4 text-brand-blue">
                Our Departments
              </p>
              <h2 className="text-3xl md:text-5xl font-light mb-6 text-black tracking-tight">
                Specialized Teams
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {departments.map((dept, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">{dept.name}</h3>
                  <p className="text-2xl font-light text-brand-yellow mb-1">{dept.count}</p>
                  <p className="text-xs text-gray-500">Team Members</p>
                </div>
              </motion.div>
            ))}
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
              <p className="text-sm font-medium tracking-wider uppercase mb-4 text-brand-blue">
                Team Members
              </p>
              <h2 className="text-3xl md:text-5xl font-light mb-6 text-black tracking-tight">
                Meet Our Professionals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Offering comprehensive turnkey solutions with experience in diverse events from Business Meets to MICE
              </p>
            </motion.div>
          </motion.div>

          {/* Category Filter - Minimal Pills */}
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

          {/* Team Grid - Clean Cards */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTeam.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-white rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500">
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-100 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-medium text-white bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {member.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-black mb-1 group-hover:text-brand-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{member.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">
                Ready to Work with Our
                <br />
                <span className="text-brand-yellow">Expert Team?</span>
              </h2>
              <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                Contact us to discuss how our dedicated professionals can bring your vision to life
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-white/60 mb-1">Call Us</p>
                  <p>+91-990-0141-155</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-white/60 mb-1">Email Us</p>
                  <p>info@whitemassif.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-white/60 mb-1">Visit Us</p>
                  <p>Bangalore, Karnataka</p>
                </div>
              </div>
              
              <Button className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full font-medium">
                Join Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 