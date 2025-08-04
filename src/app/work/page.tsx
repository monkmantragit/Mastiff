'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { WorkMediaService } from "@/lib/work-media";
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

  // Dynamic portfolio data from Supabase
  const portfolioItems = WorkMediaService.getPortfolioItems();

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
            src={portfolioItems[0]?.image || "/assets/images/portfolio/DSC02450-scaled-1.jpg"}
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
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow">
              <Eye className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide text-white">Legendary Showcase</span>
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
              Step into our hall of legends. Every project here represents an impossible vision made inevitable, 
              a bold dream transformed into unforgettable reality. This is where extraordinary happens.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="btn-primary group">
                <span>Explore The Portfolio</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <span>Create Your Legend</span>
                <Trophy className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
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
              <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium tracking-wide text-amber-600">Hall of Legends</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900 leading-tight">
                Every Project. <span className="kinetic-text">A Legend.</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-4xl mx-auto font-body leading-relaxed">
                From Fortune 500 summits to industry-defining celebrations, witness the events that didn&apos;t just meet expectations—they redefined them. 
                Each project in our portfolio represents a moment when impossible became inevitable.
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
                title: "Vision Discovery",
                description: "We don&apos;t just take briefs—we uncover dreams. Every legendary event begins with understanding your impossible vision.",
                icon: Target
              },
              {
                step: "02", 
                title: "Strategic Alchemy",
                description: "Where creativity meets strategy. We transform your vision into a masterpiece blueprint that captures hearts and minds.",
                icon: Trophy
              },
              {
                step: "03",
                title: "Flawless Manifestation",
                description: "The moment magic happens. Our obsessed creators orchestrate every detail to transform your blueprint into breathtaking reality.",
                icon: Users
              },
              {
                step: "04",
                title: "Legacy Assurance",
                description: "The event ends. The legend begins. We ensure your experience creates ripples that last long after the final applause.",
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
              <div className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium tracking-wide text-amber-600">Begin Your Legend</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900 leading-tight">
                Ready to Create Your <span className="kinetic-text">Legendary Moment?</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
                Your vision deserves more than an event—it deserves to become a legend. Let&apos;s transform your impossible dream into an inevitable reality.
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