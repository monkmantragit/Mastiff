'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { usePopup } from './popup-provider';

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { openPopup } = usePopup();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const showAfter = 500; // Show after scrolling 500px
      setIsVisible(scrollPosition > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      // Open WhatsApp chat
      const whatsappUrl = 'https://wa.me/919900141177?text=Hello%20White%20Massif!%20I%20would%20like%20to%20inquire%20about%20your%20event%20management%20services.';
      console.log('Opening WhatsApp:', whatsappUrl);
      window.location.href = whatsappUrl;
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          {/* Expanded Options */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col gap-3"
              >
                {/* WhatsApp Button */}
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#F9A625] hover:bg-[#e8951e] text-white shadow-lg rounded-full px-4 py-2"
                  >
                    <a href="https://wa.me/919900141177?text=Hello%20White%20Massif!%20I%20would%20like%20to%20inquire%20about%20your%20event%20management%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </Button>
                </motion.div>

                {/* Email Button */}
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    asChild
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full px-4 py-2"
                  >
                    <a href="mailto:info@whitemassif.com" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">Email Us</span>
                    </a>
                  </Button>
                </motion.div>

                {/* Quick Enquiry Button */}
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => {
                      openPopup('floating-quick-enquiry');
                      setIsExpanded(false);
                    }}
                    size="sm"
                    className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black shadow-lg rounded-full px-4 py-2"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Quick Enquiry</span>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main CTA Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              type="button"
              onClick={handleMainClick}
              className="w-14 h-14 bg-[#F9A625] hover:bg-[#e8951e] text-white rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm relative z-10"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>

            {/* Expand/Collapse Toggle */}
            <button
              type="button"
              onClick={handleToggleExpand}
              className="absolute -top-1 -right-1 w-6 h-6 bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
            >
              {isExpanded ? (
                <X className="w-3 h-3" />
              ) : (
                <span className="text-xs font-bold">•••</span>
              )}
            </button>
          </motion.div>

          {/* Pulse Animation for Attention */}
          {!isExpanded && (
            <motion.div
              className="absolute inset-0 bg-[#F9A625] rounded-full pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}