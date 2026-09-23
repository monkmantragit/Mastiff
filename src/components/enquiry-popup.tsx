'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, User, Calendar, MapPin, Send, Sparkles, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { recordLeadSubmission } from '@/lib/lead-handoff';
import { Honeypot } from '@/components/honeypot';
import { FormService } from '@/lib/form-service';
import { companyInfo } from '@/lib/company-info';

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}

export default function EnquiryPopup({ isOpen, onClose, triggerSource = 'general' }: EnquiryPopupProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    otherEventType: '',
    eventDate: '',
    location: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const eventTypes = [
    'Corporate Gifting',
    'Corporate Conference',
    'Product Launch',
    'Team Building',
    'Cultural Celebration',
    'Grand Opening',
    'Anniversary Event',
    'Awards Ceremony',
    'Virtual Event',
    'Hybrid Event',
    'Other'
  ];

  const dialogRef = useRef<HTMLDivElement>(null);

  // Dialog behaviour: Esc closes, focus moves into the form, the page behind stops
  // scrolling, and focus returns to the button that opened it on close.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('#enq-name')?.focus();
    }, 50);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  // Gifting CTAs open this form; preselect the matching enquiry type.
  useEffect(() => {
    if (isOpen && triggerSource.startsWith('gifting')) {
      setFormData(prev => (prev.eventType ? prev : { ...prev, eventType: 'Corporate Gifting' }));
    }
  }, [isOpen, triggerSource]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate required fields
      if (!formData.email) {
        setSubmitStatus({
          success: false,
          message: 'Email address is required.'
        });
        return;
      }

      if (!FormService.validateEmail(formData.email)) {
        setSubmitStatus({
          success: false,
          message: 'Please enter a valid email address.'
        });
        return;
      }

      if (!FormService.validatePhone(formData.phone)) {
        setSubmitStatus({
          success: false,
          message: 'Please enter a valid phone number so our team can call you back.'
        });
        return;
      }

      // Prepare event type (use otherEventType if eventType is 'Other')
      const finalEventType = formData.eventType === 'Other' ? formData.otherEventType : formData.eventType;

      // Submit form using FormService
      const result = await FormService.submitEnquiryForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: finalEventType,
        eventDate: formData.eventDate,
        location: formData.location,
        message: formData.message,
        // triggerSource, not formData.source: the popup stays mounted, so state set on
        // first render would tag every later lead with the first CTA's source.
        source: triggerSource,
        website: formData.website
      });

      if (result.success) {
        recordLeadSubmission({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: finalEventType,
          eventDate: formData.eventDate,
          location: formData.location,
          message: formData.message,
        });

        // Close popup and navigate to thank you page
        onClose();
        router.push('/thank-you');
      } else {
        setSubmitStatus({
          success: false,
          message: result.message
        });
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close enquiry form"
                  className="h-11 w-11 p-0 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                <Image
                  src="/brand/wm-logo.png"
                  alt="White Massif"
                  width={480}
                  height={399}
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <h2 id="enquiry-title" className="text-2xl sm:text-3xl font-display text-[#2A3959] mb-1">
                    Let&apos;s Create Something Amazing
                  </h2>
                  <p className="text-gray-600 font-body">
                    Tell us about your dream event and we&apos;ll make it extraordinary.
                  </p>
                </div>
              </div>


              {/* Company Statistics */}
              <div className="mt-4 text-center">
                <p className="text-[#F9A625] text-sm font-medium">
                  2M+ Audience Engagement • {companyInfo.stats.events} Events • {companyInfo.stats.clients} Corporate Clients • {companyInfo.stats.team} Team Size
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 space-y-6">
              <Honeypot value={formData.website} onChange={(v) => setFormData(prev => ({ ...prev, website: v }))} />
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enq-name" className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Full Name *
                  </Label>
                  <Input
                    id="enq-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enq-phone" className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Phone Number *
                  </Label>
                  <Input
                    id="enq-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enq-email" className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#F9A625]" />
                  Email Address *
                </Label>
                <Input
                  id="enq-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enq-eventType" className="text-sm font-medium text-gray-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Event Type
                  </Label>
                  <select
                    id="enq-eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300 bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Other Event Type Input */}
                {formData.eventType === 'Other' && (
                  <div className="space-y-2">
                    <Label htmlFor="enq-otherEventType" className="text-sm font-medium text-gray-700 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-[#F9A625]" />
                      Please specify your event type
                    </Label>
                    <Input
                      id="enq-otherEventType"
                      name="otherEventType"
                      type="text"
                      required
                      value={formData.otherEventType}
                      onChange={handleInputChange}
                      className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                      placeholder="Please describe your event type"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="enq-eventDate" className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Preferred Date
                  </Label>
                  <Input
                    id="enq-eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enq-location" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#F9A625]" />
                  Event Location
                </Label>
                <Input
                  id="enq-location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  placeholder="Bangalore, Mumbai, or your preferred city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enq-message" className="text-sm font-medium text-gray-700">
                  Tell us about your vision
                </Label>
                <Textarea
                  id="enq-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mobile-textarea border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300 resize-none"
                  placeholder="Tell us about your vision - guest count, theme ideas, special requirements, budget range..."
                  rows={4}
                />
              </div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${submitStatus.success
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    {submitStatus.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium text-sm">{submitStatus.message}</span>
                  </div>
                </motion.div>
              )}

              {/* Visual Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Ready to create your perfect event?</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary mobile-touch-target text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Start My Event Journey
                    </>
                  )}
                </Button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}