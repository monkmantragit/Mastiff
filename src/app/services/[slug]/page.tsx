'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Star,
  Award,
  Target,
  Image as GalleryIcon,
  Play
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DirectusService, type Service } from '@/lib/directus-service';
import { usePopup } from "@/components/popup-provider";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const { openPopup } = usePopup();
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const fetchedService = await DirectusService.getService(resolvedParams.slug);
      setService(fetchedService);

      if (fetchedService) {
        // Fetch related services from the same category
        if (fetchedService.category) {
          const related = await DirectusService.getServicesByCategory(fetchedService.category);
          setRelatedServices(related.filter(s => s.id !== fetchedService.id).slice(0, 3));
        } else {
          // If no category, get other services
          const allServices = await DirectusService.getServices();
          setRelatedServices(allServices.filter(s => s.id !== fetchedService.id).slice(0, 3));
        }
      }
      setLoading(false);
    };

    fetchService();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F9A625] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-[#2A3959] mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black">
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {service.featured_image ? (
            <>
              <Image
                src={service.featured_image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
            </>
          ) : (
            <div className="bg-gradient-to-br from-[#2A3959] to-[#1a2332]" />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/services">
              <Button 
                variant="outline" 
                className="mb-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>

            <div className="max-w-4xl">
              {service.category && (
                <Badge className="mb-6 bg-[#F9A625]/20 text-[#F9A625] border-[#F9A625]/30 px-4 py-2 backdrop-blur-sm">
                  {service.category}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
                {service.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => openPopup('service-inquiry')}
                  className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  +91-990-0141-155
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display text-[#2A3959] mb-6">
                What Makes Us <span className="text-[#F9A625]">Different</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our comprehensive approach ensures every detail is perfected for your success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F9A625] rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading text-[#2A3959] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {service.stats && (
        <section className="py-20 bg-[#2A3959] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display mb-6">
                Proven <span className="text-[#F9A625]">Results</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Numbers that speak to our commitment to excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Users className="w-16 h-16 text-[#F9A625] mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-display mb-2">{service.stats.events}</div>
                <div className="text-white/80">Events Delivered</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Star className="w-16 h-16 text-[#F9A625] mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-display mb-2">{service.stats.satisfaction}</div>
                <div className="text-white/80">Client Satisfaction</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Award className="w-16 h-16 text-[#F9A625] mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-display mb-2">{service.stats.clients}</div>
                <div className="text-white/80">Happy Clients</div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display text-[#2A3959] mb-6">
                See Our Work <span className="text-[#F9A625]">In Action</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Every image tells a story of excellence, creativity, and unforgettable moments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {service.gallery.slice(0, 6).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square"
                  onClick={() => setSelectedGalleryImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${service.title} gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <GalleryIcon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            {service.gallery.length > 6 && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  className="border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black"
                >
                  View All Images ({service.gallery.length})
                  <GalleryIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#2A3959] via-[#1a2332] to-[#2A3959] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
              Ready to Create Your <span className="text-[#F9A625]">Masterpiece?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Let&apos;s transform your vision into an unforgettable experience that exceeds every expectation.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Phone className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Us Now</h3>
                <p className="text-white/80">+91-990-0141-155</p>
              </div>
              
              <div className="text-center">
                <Mail className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-white/80">info@whitemassif.com</p>
              </div>
              
              <div className="text-center">
                <Calendar className="w-12 h-12 text-[#F9A625] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Book Consultation</h3>
                <p className="text-white/80">Free 30-min session</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => openPopup('service-cta')}
                className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-bold px-10 py-5 rounded-full text-xl"
              >
                Start Your Project
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#2A3959] px-10 py-5 rounded-full text-xl"
              >
                View Portfolio
                <Target className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display text-[#2A3959] mb-6">
                Explore More <span className="text-[#F9A625]">Services</span>
              </h2>
              <p className="text-xl text-neutral-600">
                Discover other ways we can help bring your vision to life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
                    <Link href={`/services/${relatedService.slug}`}>
                      <div className="relative h-48">
                        {relatedService.featured_image ? (
                          <Image
                            src={relatedService.featured_image}
                            alt={relatedService.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#F9A625]/20 to-[#2A3959]/20 flex items-center justify-center">
                            <Target className="w-12 h-12 text-[#2A3959]" />
                          </div>
                        )}
                        {relatedService.category && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-black/50 text-white border-0 text-xs">
                              {relatedService.category}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-heading text-[#2A3959] mb-3 group-hover:text-[#F9A625] transition-colors">
                          {relatedService.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {relatedService.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#F9A625] font-medium text-sm">Learn More</span>
                          <ArrowRight className="w-4 h-4 text-[#F9A625] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <Image
              src={selectedGalleryImage}
              alt="Gallery image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#F9A625] transition-colors"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}