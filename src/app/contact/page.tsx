'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle,
  Globe,
  MessageCircle,
  Calendar,
  Users,
  Award,
  Star
} from "lucide-react";
import { useRef, useState } from "react";
import { FormService } from "@/lib/form-service";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // Advanced parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const contactInfo = [
    {
      icon: Phone,
      title: "Call The Experts",
      details: ["Prakash: +91 99001 41155", "Vinay: +91 99001 41177"],
      description: "Available when inspiration strikes",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Mail,
      title: "Start The Conversation",
      details: ["info@whitemassif.com", "Where excellence begins"],
      description: "We're here when you need us",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: MapPin,
      title: "Meet The Visionaries",
      details: ["Bangalore, Karnataka", "Where dreams take shape"],
      description: "Experience our creative sanctuary",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: Clock,
      title: "Always Creating",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Dreams don't keep office hours"],
      description: "Extended availability for urgent projects",
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  const services = [
    { name: "Corporate Events", icon: Users },
    { name: "Celebrations", icon: Star },
    { name: "Inaugurations", icon: Award },
    { name: "Hybrid Events", icon: Globe },
    { name: "Conventions", icon: MessageCircle },
    { name: "Special Projects", icon: Sparkles }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      const result = await FormService.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        eventType: formData.eventType,
        message: formData.message
      });

      setSubmitStatus({
        success: result.success,
        message: result.message
      });

      // Reset form on success
      if (result.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          eventType: '',
          message: ''
        });
      }

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Ultra-Modern Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 gradient-mesh"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        />
        
        {/* Floating Geometric Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 glass rounded-full"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 glass-primary organic-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl floating"
          style={{ rotate: 45 }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Let&apos;s Talk</span>
            </motion.div>
            
            {/* Main Headline with Kinetic Typography */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="kinetic-text">
                Dreams Don't
              </span>
              <br />
              <span className="text-neutral-800">
                Build Themselves
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Your vision deserves more than hope. It deserves action. It deserves partners who turn impossible into inevitable. 
              Let&apos;s start the conversation that changes everything.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary group">
                <span>Begin The Journey</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                <span>Book Your Vision Call</span>
                <Calendar className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-body text-neutral-500">Let&apos;s connect</span>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Connection Points
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900 leading-tight">
                <span className="kinetic-text">Every Vision</span> Starts With Hello
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Every extraordinary journey begins with a single step. Choose yours.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="neomorphism rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading mb-4 text-neutral-900">{info.title}</h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-neutral-700 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-neutral-500 font-body text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-fluid mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                  Send Message
                </Badge>
                <h2 className="text-4xl md:text-5xl font-display mb-6 text-neutral-900 leading-tight">
                  Tell Us About Your <span className="kinetic-text">Vision</span>
                </h2>
                <p className="text-lg text-neutral-600 mb-8 font-body">
                  Share your event details and we'll get back to you with a customized proposal tailored to your vision.
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit}
                variants={fadeInUp}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Company/Organization
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl px-4 py-3"
                  >
                    <option value="">Select event type</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="celebration">Celebrations</option>
                    <option value="inauguration">Inaugurations</option>
                    <option value="hybrid">Hybrid Events</option>
                    <option value="convention">Conventions</option>
                    <option value="special">Special Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event vision, requirements, and any specific details..."
                    rows={6}
                    className="glass border-neutral-200 focus:border-amber-500 focus:ring-amber-500"
                    required
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
                        <MessageCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium">{submitStatus.message}</span>
                    </div>
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </motion.form>
            </motion.div>

            {/* Services & Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <Card className="glass border-neutral-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span>Our Services</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive event management solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 glass rounded-xl hover:bg-amber-50 transition-colors">
                          <service.icon className="w-5 h-5 text-amber-600" />
                          <span className="text-sm font-medium text-neutral-700">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="glass border-neutral-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span>What to Expect</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900">Quick Response</h4>
                          <p className="text-sm text-neutral-600">We respond promptly to all inquiries</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900">Free Consultation</h4>
                          <p className="text-sm text-neutral-600">Complimentary strategy session for your event</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900">Custom Proposal</h4>
                          <p className="text-sm text-neutral-600">Tailored solutions for your event</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="glass border-neutral-200 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading text-neutral-900 mb-2">Urgent Inquiry?</h3>
                    <p className="text-neutral-600 mb-4">Call us directly for immediate assistance</p>
                    <div className="space-y-2">
                      <a 
                        href="tel:+91-99001-41155"
                        className="block text-lg font-bold text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        Prakash: +91 99001 41155
                      </a>
                      <a 
                        href="tel:+91-99001-41177"
                        className="block text-lg font-bold text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        Vinay: +91 99001 41177
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Frequently Asked
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                Common <span className="kinetic-text">Questions</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Quick answers to help you understand our process and services better.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking 2-3 months in advance for optimal planning, though we can accommodate shorter timelines for urgent events."
              },
              {
                question: "Do you handle events outside Bangalore?",
                answer: "Yes, we manage events across India and internationally. Additional travel and logistics costs may apply for outstation events."
              },
              {
                question: "What's included in your event management?",
                answer: "Our comprehensive service includes planning, coordination, vendor management, on-site execution, and post-event analysis."
              },
              {
                question: "Can you work within our budget?",
                answer: "Absolutely! We create customized solutions that maximize value within your budget constraints while maintaining quality standards."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-heading text-neutral-900 mb-4">{faq.question}</h3>
                <p className="text-neutral-600 font-body leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 