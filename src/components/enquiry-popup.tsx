'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, User, Calendar, MapPin, Send, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

    try {
      // Here you would normally send the data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store form data in localStorage or sessionStorage for thank you page
      localStorage.setItem('enquiryData', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));
      
      // Close popup and navigate to thank you page
      onClose();
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
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
            <div className="relative p-6 sm:p-8 border-b border-gray-100">
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="White Massif Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display text-[#2A3959] mb-1">
                    Let&apos;s Create Something Amazing
                  </h2>
                  <p className="text-gray-600 font-body">
                    Tell us about your dream event and we&apos;ll make it extraordinary.
                  </p>
                </div>
              </div>
              
              <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20">
                Free Consultation • 24h Response
              </Badge>
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
                    className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
                    placeholder="Your full name"
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
                    className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
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
                  className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
                  placeholder="your@email.com"
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
                    className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625] bg-white"
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
                    className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
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
                  className="mobile-input border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
                  placeholder="City, venue, or area"
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
                  className="mobile-textarea border-gray-200 focus:border-[#F9A625] focus:ring-[#F9A625]"
                  placeholder="Share your event ideas, budget range, guest count, special requirements..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary mobile-touch-target text-base font-semibold"
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

              {/* Trust Elements */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>No Spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#F9A625] rounded-full"></div>
                  <span>Free Consultation</span>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}