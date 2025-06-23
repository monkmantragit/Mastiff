'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Check if we're on homepage
  const isHomepage = pathname === '/';
  
  // Check if we're on a page with dark hero background
  const isDarkHeroPage = pathname === '/services' || pathname === '/portfolio' || pathname === '/work';

  // Advanced scroll effects
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const logoY = useTransform(scrollY, [0, 100], [0, -2]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Team', href: '/about' },
    { name: 'Work', href: '/portfolio' },
    { name: 'Clients', href: '/clients' },
    { name: 'Careers', href: '/careers' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Dynamic header background based on page and scroll
  const getHeaderBackground = () => {
    if (isHomepage) {
      // On homepage, always have some background to stand out from video
      return isScrolled 
        ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-white/90 backdrop-blur-xl border-b border-white/20';
    } else if (isDarkHeroPage) {
      // On dark hero pages, use dark glass backgrounds for visibility
      return isScrolled 
        ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
        : 'bg-black/40 backdrop-blur-xl border-b border-white/10';
    } else {
      // On other pages, keep original transparent to glass behavior
      return isScrolled 
        ? 'glass-dark backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20' 
        : 'bg-transparent';
    }
  };

  return (
    <>
      {/* Premium Navigation Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getHeaderBackground()}`}
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            
            {/* Premium Logo */}
            <motion.div
              style={{ y: logoY, scale: logoScale }}
              className="flex items-center relative z-10"
            >
              <Link href="/" className="group flex items-center space-x-4">
                {/* Logo icon with glow effect */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-xl flex items-center justify-center shadow-lg shadow-[#F9A625]/20 group-hover:shadow-[#F9A625]/40 transition-all duration-300">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-[#F9A625]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Brand text */}
                <div className="hidden sm:block">
                  <div className={`text-xl font-display font-bold transition-all duration-300 ${
                    isHomepage 
                      ? 'text-[#2A3959] group-hover:text-[#F9A625]' 
                      : isDarkHeroPage
                        ? 'text-white group-hover:text-[#F9A625]'
                        : 'bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-orange-600'
                  }`}>
                    White Massif
                  </div>
                  <div className={`text-xs font-body tracking-wider transition-colors duration-300 ${
                    isHomepage 
                      ? 'text-gray-600' 
                      : isDarkHeroPage
                        ? 'text-gray-300'
                        : 'text-neutral-500'
                  }`}>
                    Premium Events
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      pathname === item.href
                        ? isHomepage 
                          ? 'text-[#F9A625] bg-[#F9A625]/10' 
                          : isDarkHeroPage
                            ? 'text-[#F9A625] bg-[#F9A625]/20'
                            : 'text-amber-600 bg-amber-50'
                        : isHomepage
                          ? 'text-[#2A3959] hover:text-[#F9A625] hover:bg-[#F9A625]/5'
                          : isDarkHeroPage
                            ? 'text-white hover:text-[#F9A625] hover:bg-white/10'
                            : 'text-neutral-700 hover:text-amber-600 hover:bg-neutral-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        className={`absolute inset-0 rounded-xl -z-10 ${
                          isHomepage 
                            ? 'bg-gradient-to-r from-[#F9A625]/10 to-[#F9A625]/5' 
                            : isDarkHeroPage
                              ? 'bg-gradient-to-r from-[#F9A625]/20 to-[#F9A625]/10'
                              : 'bg-gradient-to-r from-amber-100 to-orange-100'
                        }`}
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button className={`hidden md:flex text-sm px-6 py-2 ${
                isHomepage 
                  ? 'bg-[#F9A625] hover:bg-[#F9A625]/90 text-black' 
                  : isDarkHeroPage
                    ? 'bg-[#F9A625] hover:bg-[#F9A625]/90 text-black'
                    : 'btn-primary'
              }`}>
                <span>Get Quote</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              {/* Mobile menu button - Touch Optimized */}
              <motion.button
                onClick={toggleMenu}
                className={`lg:hidden relative mobile-touch-target rounded-xl flex items-center justify-center transition-colors ${
                  isHomepage 
                    ? 'bg-gray-100 hover:bg-gray-200' 
                    : isDarkHeroPage
                      ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                      : 'glass hover:bg-neutral-100'
                }`}
                style={{ minWidth: '44px', minHeight: '44px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className={`w-5 h-5 ${
                        isHomepage 
                          ? 'text-[#2A3959]' 
                          : isDarkHeroPage
                            ? 'text-white'
                            : 'text-neutral-700'
                      }`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className={`w-5 h-5 ${
                        isHomepage 
                          ? 'text-[#2A3959]' 
                          : isDarkHeroPage
                            ? 'text-white'
                            : 'text-neutral-700'
                      }`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] glass-dark backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-display font-bold text-white">
                        White Massif
                      </div>
                      <div className="text-xs text-white/60">Premium Events</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={toggleMenu}
                          className={`block mobile-touch-target px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            pathname === item.href
                              ? 'text-amber-400 bg-amber-500/20'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                          style={{ minHeight: '44px' }}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <motion.div
                    className="mt-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button className="w-full btn-primary">
                      <span>Get Free Quote</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <a
                        href="tel:+91-990-0141-155"
                        className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm">+91-990-0141-155</span>
                      </a>
                      
                      <a
                        href="mailto:info@whitemassif.com"
                        className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-sm">info@whitemassif.com</span>
                      </a>
                      
                      <div className="flex items-center space-x-3 text-white/70">
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm">Bangalore, India</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 