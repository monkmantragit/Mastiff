'use client';

import { useState } from 'react';
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
import { type Service } from '@/lib/directus-service';
import { usePopup } from "@/components/popup-provider";

interface ServiceClientProps {
  service: Service;
  relatedServices: Service[];
}

export default function ServiceClient({ service, relatedServices }: ServiceClientProps) {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const { openPopup } = usePopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Hero Section with Service Details */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat'
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center space-x-2 text-sm text-neutral-600 mb-8">
              <Link href="/" className="hover:text-[#F9A625] transition-colors">
                Home
              </Link>
              <span className="text-neutral-400">/</span>
              <Link href="/services" className="hover:text-[#F9A625] transition-colors">
                Services
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-[#2A3959] font-medium">
                {service.title}
              </span>
            </nav>

            {/* Service Category Badge */}
            {service.category && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/30 px-6 py-2 text-base font-medium">
                  {service.category}
                </Badge>
              </motion.div>
            )}

            {/* Service Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display text-[#2A3959] mb-8 leading-tight"
            >
              {service.title}
            </motion.h1>

            {/* Service Description */}
            {service.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                {service.description}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button 
                onClick={() => openPopup('service-inquiry')}
                className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg group"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/portfolio">
                <Button 
                  variant="outline" 
                  className="border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white px-8 py-4 rounded-full text-lg"
                >
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {service.content && (
              <div className="prose prose-lg max-w-none mb-16">
                <div 
                  dangerouslySetInnerHTML={{ __html: service.content }}
                  className="text-neutral-700 leading-relaxed prose-headings:text-[#2A3959] prose-headings:font-display prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2"
                />
              </div>
            )}

            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <h2 className="text-3xl font-display text-[#2A3959] mb-8 md:col-span-2">
                  What Makes Our {service.title} Special?
                </h2>
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-200"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#F9A625]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        {typeof feature === 'string' ? feature : feature.title}
                      </h3>
                      {typeof feature !== 'string' && feature.description && (
                        <p className="text-neutral-700 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Service Gallery */}
            {service.gallery && service.gallery.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-display text-[#2A3959] mb-8 text-center">
                  See Our {service.title} in Action
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.gallery.slice(0, 6).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                      onClick={() => setSelectedGalleryImage(image)}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={image}
                          alt={`${service.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                          <GalleryIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-[#2A3959] text-center mb-16">
                Explore More Services
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedServices.slice(0, 3).map((relatedService, index) => (
                  <Card key={relatedService.id} className="glass rounded-2xl hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                    <Link href={`/services/${relatedService.slug || relatedService.id}`}>
                      <div className="aspect-video overflow-hidden rounded-t-2xl relative">
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
                        <h3 className="font-heading text-xl text-[#2A3959] mb-3 group-hover:text-[#F9A625] transition-colors line-clamp-2">
                          {relatedService.title}
                        </h3>
                        
                        {relatedService.description && (
                          <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                            {relatedService.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-neutral-500">
                            <Star className="w-3 h-3" />
                            Premium Service
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-[#F9A625] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#2A3959] via-[#1a2332] to-[#2A3959] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-4xl md:text-5xl font-display mb-6 leading-tight">
              Ready for Exceptional <span className="text-[#F9A625]">{service.title}?</span>
            </h3>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Let our experts bring your vision to life with unmatched creativity and flawless execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => openPopup('service-cta')}
                className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedGalleryImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}