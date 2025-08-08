'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, User, Calendar, MapPin, Send, Sparkles, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormService } from '@/lib/form-service';

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
    eventDate: '',
    location: '',
    message: '',
    source: triggerSource
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const eventTypes = [
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

      // Submit form using FormService
      const result = await FormService.submitEnquiryForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        location: formData.location,
        message: formData.message,
        source: formData.source
      });

      if (result.success) {
        // Store success data for thank you page
        localStorage.setItem('enquiryData', JSON.stringify({
          ...formData,
          submissionId: result.id,
          timestamp: new Date().toISOString()
        }));
        
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
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                <img 
                  src="/WM LOGO-05.png" 
                  alt="White Massif Logo" 
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display text-[#2A3959] mb-1">
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
                  2M+ Audience Engagement • 1000+ Events • 165+ Corporate Clients • 35+ Team Size
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#F9A625]" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-sm font-medium text-gray-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Event Type
                  </Label>
                  <select
                    id="eventType"
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

                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#F9A625]" />
                    Preferred Date
                  </Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#F9A625]" />
                  Event Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mobile-input border-2 border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] rounded-lg px-4 py-3 transition-all duration-300 hover:border-gray-300"
                  placeholder="Bangalore, Mumbai, or your preferred city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Tell us about your vision
                </Label>
                <Textarea
                  id="message"
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
                  className={`p-4 rounded-lg ${
                    submitStatus.success 
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
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="mobile-touch-target border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Maybe Later
                </Button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}