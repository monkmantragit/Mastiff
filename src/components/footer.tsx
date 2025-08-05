'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Star,
  Award,
  Users,
  Send
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FormService } from '@/lib/form-service';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      if (!FormService.validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const result = await FormService.submitNewsletterForm({
        email: email,
        source: 'footer-newsletter'
      });

      if (result.success) {
        alert('Successfully subscribed to our newsletter!');
        setEmail('');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const services = [
    { name: 'All Services', href: '/services' },
    { name: 'Corporate Events', href: '/services' },
    { name: 'Celebrations', href: '/services' },
    { name: 'Inaugurations', href: '/services' },
    { name: 'Hybrid Events', href: '/services' },
    { name: 'Special Projects', href: '/services' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Our Team', href: '/team' },
    { name: 'Our Clients', href: '/clients' },
    { name: 'Careers', href: '/careers' }
  ];

  const contactInfo = [
    { name: 'Get Quote', href: '/', action: 'popup' },
    { name: 'WhatsApp Us', href: 'https://wa.me/919900141177?text=Hello%20White%20Massif!%20I%20would%20like%20to%20inquire%20about%20your%20event%20management%20services.' },
    { name: 'Call Us', href: 'tel:+919845045466' },
    { name: 'Email Us', href: 'mailto:info@whitemassif.com' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/whitemassif', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Instagram, href: 'https://www.instagram.com/whitemassif/', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: 'https://www.facebook.com/whitemassif', label: 'Facebook', color: 'hover:text-blue-600' }
  ];

  const trustIndicators = [
    { icon: Star, text: '1000+ Events', subtext: 'Successfully Delivered' },
    { icon: Award, text: '11+ Years', subtext: 'Industry Experience' },
    { icon: Users, text: '150+ Team', subtext: 'Creative Professionals' }
  ];

  return (
    <footer className="bg-[#2A3959] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#F9A625] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F9A625] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto mobile-container py-12 lg:py-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div>
                <Badge className="mb-4 bg-[#F9A625]/20 text-[#F9A625] border-[#F9A625]/30">
                  Stay Updated
                </Badge>
                <h3 className="text-2xl lg:text-3xl font-display mb-4 leading-tight">
                  Get Event Inspiration & Industry Insights
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Join 5000+ event professionals receiving our monthly newsletter with trends, tips, and exclusive offers.
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 mobile-input bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#F9A625] focus:ring-[#F9A625]"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 mobile-touch-target"
                >
                  {isSubscribing ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto mobile-container py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                <div className="flex justify-start mb-4">
                  <img 
                    src="/logo.png" 
                    alt="White Massif Event Management Logo" 
                    className="w-10 h-10 object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#F9A625] transition-all duration-300 group ${social.color}`}
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5 group-hover:text-black transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h4 className="font-bold text-lg mb-6">Our Services</h4>
              <nav className="space-y-3">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="block text-white/80 hover:text-[#F9A625] transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <nav className="space-y-3 mb-8">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-white/80 hover:text-[#F9A625] transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h4 className="font-bold text-lg mb-6">Get In Touch</h4>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#F9A625] mt-1 flex-shrink-0" />
                  <div>
                    <Link href="tel:+919845045466" className="text-white/80 hover:text-[#F9A625] transition-colors">
                      +91 98450 45466
                    </Link>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="mt-6">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9021361290365!2d77.5800194!3d13.0419009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae171688e704a9%3A0x893beaaafc41d513!2sWhite%20Massif%20Event%20Management!5e0!3m2!1sen!2sin!4v1754391440612!5m2!1sen!2sin" 
                    width="100%" 
                    height="200" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-4 bg-[#F9A625]/10 rounded-lg border border-[#F9A625]/20">
                <div className="text-[#F9A625] font-semibold mb-2">Event Emergency?</div>
                <div className="text-white/80 text-sm">
                  24/7 support for ongoing events
                </div>
                <Link href="tel:+919845045466" className="text-[#F9A625] hover:underline text-sm font-medium">
                  Call Emergency Line
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto mobile-container py-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="text-white/60 text-sm text-center md:text-left">
                © {new Date().getFullYear()} White Massif Event Management. All rights reserved.
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="text-white/60">
                  Bangalore, Karnataka, India
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}