'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePopup } from '@/components/popup-provider';
import { companyInfo } from '@/lib/company-info';

// Service pages for the dropdown. Labels match each page's own heading, and every link
// points at the canonical URL (the /services/* duplicates redirect to the Bangalore pages).
const servicePages = [
  { name: 'Corporate Events', href: '/corporate-event-management-company-bangalore' },
  { name: 'Conferences & Summits', href: '/conference-and-summit-management-in-bangalore' },
  { name: 'Product Launches', href: '/product-launch-event-management-in-bangalore' },
  { name: 'Annual Day & Awards', href: '/annual-day-and-award-event-management-bangalore' },
  { name: 'MICE Events', href: '/mice-event-management-in-bangalore' },
  { name: 'Virtual & Hybrid Events', href: '/virtual-and-hybrid-events-in-bangalore' },
  { name: 'Employee Engagement', href: '/services/employee-engagement-activities' },
  { name: 'Dealer & Customer Meets', href: '/services/dealer-and-customer-meet-events' },
  { name: 'Industry Conventions', href: '/services/industry-convention-project-events' },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Gifting', href: '/gifting' },
  { name: 'Work', href: '/portfolio' },
  { name: 'Clients', href: '/clients' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
];

// Mobile has no room for the header "Contact Us" button, so Contact is a menu item there.
const mobileNavItems = [...navItems, { name: 'Contact', href: '/contact' }];

const DARK_HERO_PREFIXES = ['/services', '/gifting', '/portfolio', '/team', '/event-management-company-in-bangalore'];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const pathname = usePathname();
  const { openPopup } = usePopup();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isHomepage = pathname === '/';
  const isDarkHeroPage = DARK_HERO_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`));

  // The header is dark (glass) on dark-hero pages and on other pages once scrolled;
  // light on the homepage. Logo and menu icon follow so they are always visible.
  const headerIsDark = !isHomepage && (isDarkHeroPage || isScrolled);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: Esc closes it, focus moves into it, and the page behind stops scrolling.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Close menus on navigation.
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const getHeaderBackground = () => {
    if (isHomepage) {
      return isScrolled
        ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg'
        : 'bg-white/90 backdrop-blur-xl border-b border-white/20';
    }
    if (isDarkHeroPage) {
      return isScrolled
        ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
        : 'bg-black/40 backdrop-blur-xl border-b border-white/10';
    }
    return isScrolled
      ? 'glass-dark backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20'
      : 'bg-transparent';
  };

  const linkClass = (active: boolean) =>
    `relative block px-3 lg:px-3.5 py-2 rounded-xl font-medium text-sm xl:text-base transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9A625] ${
      active
        ? isHomepage
          ? 'text-[#F9A625] bg-[#F9A625]/10'
          : headerIsDark
            ? 'text-[#F9A625] bg-[#F9A625]/20'
            : 'text-amber-600 bg-amber-50'
        : isHomepage
          ? 'text-[#2A3959] hover:text-[#F9A625] hover:bg-[#F9A625]/5'
          : headerIsDark
            ? 'text-white hover:text-[#F9A625] hover:bg-white/10'
            : 'text-neutral-700 hover:text-amber-600 hover:bg-neutral-50'
    }`;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const servicesActive = isActive('/services') || servicePages.some(s => s.href === pathname);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${getHeaderBackground()}`}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <Link href="/" className="group flex items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625]" aria-label="White Massif home">
              <Image
                src={headerIsDark ? '/brand/wm-logo-white.png' : '/brand/wm-logo.png'}
                alt="White Massif Event Management"
                width={480}
                height={399}
                priority
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5" aria-label="Main">
              {navItems.map((item) => {
                if (item.name !== 'Services') {
                  return (
                    <Link key={item.name} href={item.href} className={linkClass(isActive(item.href))} aria-current={isActive(item.href) ? 'page' : undefined}>
                      {item.name}
                    </Link>
                  );
                }

                // Services: link plus a disclosure button. Opens on hover, on keyboard focus
                // and on click/tap, so keyboard and touch-laptop users can reach sub-pages.
                return (
                  <div
                    key={item.name}
                    ref={servicesRef}
                    className="relative flex items-center"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    onBlur={(e) => {
                      if (!servicesRef.current?.contains(e.relatedTarget as Node)) setIsServicesOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsServicesOpen(false);
                    }}
                  >
                    <Link href={item.href} className={linkClass(servicesActive)} aria-current={isActive(item.href) ? 'page' : undefined}>
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      className={`-ml-2 p-1.5 rounded-lg ${headerIsDark ? 'text-white' : 'text-[#2A3959]'} hover:text-[#F9A625] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625]`}
                      aria-label="Show service pages"
                      aria-expanded={isServicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setIsServicesOpen(open => !open)}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          id="services-menu"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 pt-2 w-72 z-50`}
                        >
                          <ul
                            className={`py-2 rounded-2xl shadow-2xl border overflow-hidden ${
                              headerIsDark ? 'bg-black/90 backdrop-blur-xl border-white/10' : 'bg-white/95 backdrop-blur-xl border-gray-200'
                            }`}
                          >
                            {servicePages.map((service) => (
                              <li key={service.href}>
                                <Link
                                  href={service.href}
                                  aria-current={pathname === service.href ? 'page' : undefined}
                                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:bg-[#F9A625]/15 ${
                                    pathname === service.href
                                      ? headerIsDark ? 'bg-[#F9A625]/20 text-[#F9A625]' : 'bg-[#F9A625]/10 text-[#F9A625]'
                                      : headerIsDark ? 'text-white hover:bg-white/10 hover:text-[#F9A625]' : 'text-[#2A3959] hover:bg-[#F9A625]/5 hover:text-[#F9A625]'
                                  }`}
                                >
                                  {service.name}
                                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <Button asChild className="hidden md:flex text-sm px-6 py-2 bg-[#F9A625] hover:bg-[#F9A625]/90 text-black">
                <Link href="/contact">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              {/* Mobile menu button. Icon colour follows the header so it is never
                  white-on-light (it was invisible on the homepage). */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsOpen(true)}
                className={`lg:hidden relative rounded-xl flex items-center justify-center transition-colors w-11 h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625] ${
                  headerIsDark ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#2A3959]'
                }`}
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] glass-dark backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col min-h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-lg flex items-center justify-center" aria-hidden="true">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="w-11 h-11 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625]"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-2" aria-label="Mobile">
                    {mobileNavItems.map((item) => {
                      if (item.name === 'Services') {
                        return (
                          <div key={item.name}>
                            <div className="flex items-center gap-2">
                              <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex-1 min-h-11 px-4 py-3 rounded-xl font-medium transition-colors duration-300 ${
                                  isActive(item.href) ? 'text-amber-400 bg-amber-500/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => setIsServicesExpanded(expanded => !expanded)}
                                className="w-11 h-11 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Show service pages"
                                aria-expanded={isServicesExpanded}
                                aria-controls="mobile-services"
                              >
                                <ChevronDown className={`w-5 h-5 transition-transform ${isServicesExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>

                            {isServicesExpanded && (
                              <ul id="mobile-services" className="ml-4 mt-2 space-y-1">
                                {servicePages.map((service) => (
                                  <li key={service.href}>
                                    <Link
                                      href={service.href}
                                      onClick={() => setIsOpen(false)}
                                      className={`block min-h-11 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        pathname === service.href ? 'text-amber-400 bg-amber-500/20' : 'text-white/70 hover:text-white hover:bg-white/5'
                                      }`}
                                    >
                                      {service.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className={`block min-h-11 px-4 py-3 rounded-xl font-medium transition-colors duration-300 ${
                            isActive(item.href) ? 'text-amber-400 bg-amber-500/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-8 space-y-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        openPopup('nav-mobile-quote');
                      }}
                      className="w-full min-h-11 flex items-center justify-center gap-2 rounded-xl bg-[#F9A625] text-black font-semibold"
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a href={`tel:${companyInfo.phoneE164}`} className="flex items-center space-x-3 min-h-11 text-white/70 hover:text-white transition-colors">
                      <span className="w-8 h-8 glass rounded-lg flex items-center justify-center" aria-hidden="true">
                        <Phone className="w-4 h-4" />
                      </span>
                      <span className="text-sm">{companyInfo.phoneDisplay}</span>
                    </a>

                    <a href={`mailto:${companyInfo.email}`} className="flex items-center space-x-3 min-h-11 text-white/70 hover:text-white transition-colors">
                      <span className="w-8 h-8 glass rounded-lg flex items-center justify-center" aria-hidden="true">
                        <Mail className="w-4 h-4" />
                      </span>
                      <span className="text-sm">{companyInfo.email}</span>
                    </a>

                    <div className="flex items-center space-x-3 text-white/70">
                      <span className="w-8 h-8 glass rounded-lg flex items-center justify-center" aria-hidden="true">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <span className="text-sm">Bangalore, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
