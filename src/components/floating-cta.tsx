'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, MoreHorizontal, Send } from 'lucide-react';
import { usePopup } from './popup-provider';
import { companyInfo } from '@/lib/company-info';

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { openPopup } = usePopup();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  const optionClass = 'shadow-lg rounded-full h-11 min-w-11 px-3 sm:px-4 flex items-center justify-center gap-2';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id="floating-cta-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-end gap-3"
              >
                <Button asChild size="sm" className={`${optionClass} bg-[#25D366] hover:bg-[#1ebe5b] text-black`}>
                  <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </Button>

                <Button asChild size="sm" className={`${optionClass} bg-[#2A3959] hover:bg-[#1f2b45] text-white`}>
                  <a href={`tel:${companyInfo.phoneE164}`} aria-label={`Call ${companyInfo.phoneDisplay}`}>
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Call Us</span>
                  </a>
                </Button>

                <Button asChild size="sm" className={`${optionClass} bg-blue-600 hover:bg-blue-700 text-white`}>
                  <a href={`mailto:${companyInfo.email}`} aria-label="Email us">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Email Us</span>
                  </a>
                </Button>

                <Button
                  onClick={() => {
                    openPopup('floating-quick-enquiry');
                    setIsExpanded(false);
                  }}
                  size="sm"
                  aria-label="Quick enquiry form"
                  className={`${optionClass} bg-[#F9A625] hover:bg-[#F9A625]/90 text-black`}
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Quick Enquiry</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-center gap-2">
            {/* Opens WhatsApp in a new tab so visitors keep the site open (it used to
                navigate away in the same tab, unlike the WhatsApp option above). */}
            <Button asChild className="bg-[#F9A625] hover:bg-[#e8951e] text-black rounded-full shadow-2xl border-4 border-white/20 relative z-10 flex items-center gap-2 px-4 py-3 h-auto">
              <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Need help? Chat with us on WhatsApp">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span className="font-semibold text-sm">Need help?</span>
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setIsExpanded(expanded => !expanded)}
              aria-label={isExpanded ? 'Hide contact options' : 'More contact options'}
              aria-expanded={isExpanded}
              aria-controls="floating-cta-options"
              className="w-11 h-11 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625]"
            >
              {isExpanded ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
            </button>

            {!isExpanded && !reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 right-[3.25rem] bg-[#F9A625] rounded-full pointer-events-none"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: 3, ease: 'easeInOut' }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
