'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle,
  Star,
  Users,
  Award,
  Target,
  Play,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DirectusService, type LandingPage } from '@/lib/directus-service';
import { usePopup } from "@/components/popup-provider";

interface LandingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function LandingPageTemplate({ params }: LandingPageProps) {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { openPopup } = usePopup();
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchLandingPage = async () => {
      setLoading(true);
      const fetchedPage = await DirectusService.getLandingPage(resolvedParams.slug);
      setLandingPage(fetchedPage);
      setLoading(false);
    };

    fetchLandingPage();
  }, [resolvedParams.slug]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setFormSubmitted(true);
    
    // Add tracking if tracking code exists
    if (landingPage?.tracking_code) {
      // Inject tracking code or call analytics
      console.log('Tracking conversion:', landingPage.tracking_code);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F9A625] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!landingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-[#2A3959] mb-4">Page Not Found</h1>
          <Link href="/">
            <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Different templates based on landing page type
  const renderTemplate = () => {
    switch (landingPage.template) {
      case 'service':
        return <ServiceTemplate />;
      case 'event':
        return <EventTemplate />;
      case 'campaign':
        return <CampaignTemplate />;
      default:
        return <GeneralTemplate />;
    }
  };

  // Service Landing Template
  const ServiceTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {landingPage.hero_video ? (
            <div className="relative w-full h-full">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={landingPage.hero_video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ) : landingPage.hero_image ? (
            <>
              <Image
                src={landingPage.hero_image}
                alt={landingPage.hero_title || landingPage.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </>
          ) : (
            <div className="bg-gradient-to-br from-[#2A3959] to-[#1a2332]" />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white"
            >
              <Badge className="mb-6 bg-[#F9A625]/20 text-[#F9A625] border-[#F9A625]/30 px-4 py-2">
                Premium Event Services
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
                {landingPage.hero_title || landingPage.title}
              </h1>
              
              {landingPage.hero_subtitle && (
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  {landingPage.hero_subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => openPopup('service-cta')}
                  className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg"
                >
                  {landingPage.cta_text || "Get Started"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Our Work
                </Button>
              </div>
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  {!formSubmitted ? (
                    <>
                      <h3 className="text-2xl font-display text-[#2A3959] mb-2">
                        Get Your Free Consultation
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Let&apos;s discuss your vision and create something extraordinary together.
                      </p>
                      
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {landingPage.form_fields?.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name} className="text-sm font-medium text-[#2A3959]">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </Label>
                            {field.type === 'textarea' ? (
                              <Textarea
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="mt-1"
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                              />
                            ) : field.type === 'select' ? (
                              <select
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : (
                              <Input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="mt-1"
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                              />
                            )}
                          </div>
                        ))}
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold py-3 rounded-full"
                        >
                          Get Free Consultation
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                      
                      <div className="mt-6 text-center text-sm text-neutral-500">
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Free consultation</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>No obligation</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>24hr response</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-display text-[#2A3959] mb-2">Thank You!</h3>
                      <p className="text-neutral-600 mb-6">
                        We&apos;ve received your inquiry and will contact you within 24 hours.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>+91-990-0141-155</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>info@whitemassif.com</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {landingPage.content && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div 
              className="prose prose-lg max-w-none text-neutral-700"
              dangerouslySetInnerHTML={{ __html: landingPage.content }}
            />
          </div>
        </section>
      )}

      {/* Social Proof */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-[#2A3959] mb-4">
              Trusted by <span className="text-[#F9A625]">160+ Companies</span>
            </h2>
            <p className="text-xl text-neutral-600">
              From Fortune 500 corporations to growing startups
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "1000+", label: "Events Delivered" },
              { icon: Star, number: "99%", label: "Client Satisfaction" },
              { icon: Award, number: "160+", label: "Happy Clients" },
              { icon: Target, number: "11+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <stat.icon className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                <div className="text-3xl font-display text-[#2A3959] mb-2">{stat.number}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Event Landing Template
  const EventTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#2A3959] via-[#1a2332] to-[#2A3959] text-white">
      {/* Event-specific content */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
              {landingPage.hero_title || landingPage.title}
            </h1>
            {landingPage.hero_subtitle && (
              <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
                {landingPage.hero_subtitle}
              </p>
            )}
            <Button 
              className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-bold px-12 py-6 rounded-full text-xl"
              onClick={() => openPopup('event-cta')}
            >
              {landingPage.cta_text || "Join the Event"}
              <Calendar className="ml-3 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );

  // Campaign Landing Template
  const CampaignTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#F9A625] via-[#e8951e] to-[#F9A625]">
      {/* Campaign-specific content */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight text-black">
              {landingPage.hero_title || landingPage.title}
            </h1>
            {landingPage.hero_subtitle && (
              <p className="text-2xl md:text-3xl text-black/80 mb-12 leading-relaxed max-w-4xl mx-auto">
                {landingPage.hero_subtitle}
              </p>
            )}
            <Button 
              className="bg-[#2A3959] hover:bg-[#2A3959]/90 text-white font-bold px-12 py-6 rounded-full text-xl"
              onClick={() => openPopup('campaign-cta')}
            >
              {landingPage.cta_text || "Get Started"}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );

  // General Landing Template
  const GeneralTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight text-[#2A3959]">
              {landingPage.hero_title || landingPage.title}
            </h1>
            {landingPage.hero_subtitle && (
              <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-4xl mx-auto">
                {landingPage.hero_subtitle}
              </p>
            )}
            <Button 
              className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg"
              onClick={() => openPopup('general-cta')}
            >
              {landingPage.cta_text || "Learn More"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {landingPage.content && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div 
              className="prose prose-lg max-w-none text-neutral-700"
              dangerouslySetInnerHTML={{ __html: landingPage.content }}
            />
          </div>
        </section>
      )}
    </div>
  );

  return (
    <>
      {renderTemplate()}
      
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#F9A625] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              className="w-full h-full rounded-lg"
              controls
              autoPlay
            >
              <source src="/assets/videos/wm-2025-intro-M2_l2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
      
      {/* Tracking Script */}
      {landingPage.tracking_code && (
        <script dangerouslySetInnerHTML={{ __html: landingPage.tracking_code }} />
      )}
    </>
  );
}