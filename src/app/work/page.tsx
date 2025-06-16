'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  Star,
  Calendar,
  Award,
  Filter,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedYear, setSelectedYear] = React.useState("All");

  // Real White Massif portfolio data
  const portfolioItems = [
    {
      title: "WITHUM SOTF 2024",
      year: "2024",
      category: "Corporate Event",
      image: "/assets/images/portfolio/DSC02450-scaled-1.jpg",
      description: "Strategic corporate event showcasing innovation and technology solutions for global business transformation."
    },
    {
      title: "EMPOWER CELEBRATION 2024",
      year: "2024",
      category: "Corporate Celebration",
      image: "/assets/images/portfolio/92A2004-scaled-1.jpg",
      description: "Employee empowerment celebration recognizing achievements and fostering team spirit across the organization."
    },
    {
      title: "DTICI AWARDS 2024",
      year: "2024",
      category: "Awards Ceremony",
      image: "/assets/images/portfolio/Untitled-design-19-1.png",
      description: "Prestigious awards ceremony honoring excellence in technology and innovation across multiple industries."
    },
    {
      title: "ROLLS ROYCE R2 DATA LABS 2024",
      year: "2024",
      category: "Corporate Event",
      image: "/assets/images/portfolio/Untitled-design-23-1.png",
      description: "High-profile corporate event showcasing cutting-edge data analytics and engineering solutions."
    },
    {
      title: "MICELIO CLEAN MOBILITY SUMMIT 2024",
      year: "2024",
      category: "Summit",
      image: "/assets/images/portfolio/PSGF6309-1-scaled-1-1024x1024.jpg",
      description: "International summit focusing on sustainable mobility solutions and clean energy innovations."
    },
    {
      title: "GSK XTRAVAGANZA 2024",
      year: "2024",
      category: "Corporate Celebration",
      image: "/assets/images/portfolio/DSC02450-scaled-1.jpg",
      description: "Grand corporate celebration combining entertainment, networking, and brand showcase for pharmaceutical excellence."
    },
    {
      title: "PLURAL SIGHT TWO GETHER FOR DECADES 2024",
      year: "2024",
      category: "Corporate Event",
      image: "/assets/images/portfolio/92A2004-scaled-1.jpg",
      description: "Milestone celebration event marking decades of innovation in technology education and professional development."
    },
    {
      title: "GRAND PMU INDIA 2024",
      year: "2024",
      category: "Corporate Event",
      image: "/assets/images/portfolio/Untitled-design-19-1.png",
      description: "Large-scale corporate event showcasing business excellence and strategic partnerships in the Indian market."
    },
    {
      title: "WITHUM SOTF 2025",
      year: "2025",
      category: "Corporate Event",
      image: "/assets/images/portfolio/Untitled-design-23-1.png",
      description: "Next-generation corporate event featuring advanced technology solutions and strategic business insights."
    },
    {
      title: "BRIGADE FIESTA 2024",
      year: "2024",
      category: "Corporate Celebration",
      image: "/assets/images/portfolio/PSGF6309-1-scaled-1-1024x1024.jpg",
      description: "Annual corporate fiesta celebrating company culture, achievements, and team collaboration."
    },
    {
      title: "BRIGADE FIESTA 2023",
      year: "2023",
      category: "Corporate Celebration",
      image: "/assets/images/portfolio/DSC02450-scaled-1.jpg",
      description: "Previous year's successful corporate celebration setting the benchmark for employee engagement events."
    }
  ];

  const stats = [
    { number: "500+", label: "Events Delivered", icon: Calendar },
    { number: "160+", label: "Happy Clients", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  const categories = ["All", "Corporate Event", "Corporate Celebration", "Awards Ceremony", "Summit"];
  const years = ["All", "2025", "2024", "2023"];

  const filteredPortfolio = portfolioItems.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const yearMatch = selectedYear === "All" || item.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/portfolio/DSC02450-scaled-1.jpg"
            alt="White Massif Portfolio"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 bg-brand-yellow text-brand-blue font-subheading">
              Our Work
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading mb-6">
              Corporate <span className="text-brand-yellow">Events Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
              Enhancing business event planners for companies to unmatched excellence, 
              we specialize in orchestrating impeccably managed occasions that effortlessly combine expertise with strategic objectives.
            </p>
            <Button size="lg" className="btn-secondary font-subheading px-8 py-6 text-lg">
              View Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-brand-blue" />
                </div>
                <div className="text-4xl md:text-5xl font-heading text-brand-yellow mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-body">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 bg-brand-yellow text-brand-blue font-subheading">
                Featured Work
              </Badge>
              <h2 className="text-5xl font-heading mb-6 text-brand-blue">
                Our <span className="text-brand-yellow">Event Portfolio</span>
              </h2>
              <p className="text-xl text-brand-gray max-w-2xl mx-auto font-body">
                Showcasing exceptional corporate events that have set new standards in the industry
              </p>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <div className="flex items-center gap-2 mr-8">
              <Filter className="w-5 h-5 text-brand-blue" />
              <span className="font-subheading text-brand-blue">Filter by:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-subheading ${
                    selectedCategory === category 
                      ? "btn-primary" 
                      : "btn-outline"
                  }`}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Year Filter */}
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  onClick={() => setSelectedYear(year)}
                  className={`font-subheading ${
                    selectedYear === year 
                      ? "btn-secondary" 
                      : "btn-outline"
                  }`}
                  size="sm"
                >
                  {year}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPortfolio.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-brand group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 hero-overlay opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-yellow text-brand-blue font-subheading">
                        {item.year}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-white text-white font-subheading">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="btn-secondary font-subheading">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-brand-blue mb-3 group-hover:text-brand-yellow transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-brand-gray font-body text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-brand-light-gray text-brand-blue font-subheading">
                        {item.category}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-yellow">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button className="btn-primary font-subheading">
              View More Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 section-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 bg-brand-yellow text-brand-blue font-subheading">
                Our Process
              </Badge>
              <h2 className="text-5xl font-heading mb-6 text-white">
                How We <span className="text-brand-yellow">Create Excellence</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-body">
                Our proven methodology ensures every event exceeds expectations
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Consultation & Planning",
                description: "Understanding your vision, objectives, and requirements to create a comprehensive event strategy.",
                icon: Target
              },
              {
                step: "02", 
                title: "Design & Conceptualization",
                description: "Crafting unique concepts and designs that align with your brand identity and event goals.",
                icon: Trophy
              },
              {
                step: "03",
                title: "Production & Execution",
                description: "Seamless execution with our expert team managing every detail from setup to completion.",
                icon: Users
              },
              {
                step: "04",
                title: "Follow-up & Analysis",
                description: "Post-event analysis and feedback collection to ensure continuous improvement and success.",
                icon: Award
              }
            ].map((process, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-brand h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                      <process.icon className="w-8 h-8 text-brand-blue" />
                    </div>
                    <div className="text-3xl font-heading text-brand-yellow mb-2">{process.step}</div>
                    <h3 className="font-heading text-brand-blue mb-3">{process.title}</h3>
                    <p className="text-brand-gray font-body text-sm leading-relaxed">{process.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl font-heading mb-6 text-brand-blue">
                Ready to Create Your Next <span className="text-brand-yellow">Exceptional Event?</span>
              </h2>
              <p className="text-xl text-brand-gray max-w-2xl mx-auto mb-8 font-body">
                Let&apos;s discuss how we can bring your vision to life with our proven expertise
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-brand-blue">Call Us</h3>
                  <p className="text-brand-gray font-body">Prakash: +91-990-0141-155</p>
                  <p className="text-brand-gray font-body">Vinay: +91-990-0141-177</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-brand-blue">Email Us</h3>
                  <p className="text-brand-gray font-body">info@whitemassif.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-brand-blue">Visit Us</h3>
                  <p className="text-brand-gray font-body">New Bel Road, Sanjaynagar</p>
                  <p className="text-brand-gray font-body">Bangalore, Karnataka</p>
                </div>
              </div>
              
              <Button size="lg" className="btn-primary font-subheading px-8 py-6 text-lg">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 