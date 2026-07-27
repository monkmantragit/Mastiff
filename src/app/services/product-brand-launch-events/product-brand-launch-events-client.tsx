'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import {
    ArrowRight,
    Sparkles,
    Rocket,
    Target,
    Megaphone,
    Briefcase,
    MapPin,
    ChevronDown,
    Palette,
    ShieldCheck,
    Building2,
    Mic2
} from "lucide-react";

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function ProductBrandLaunchEventsClient() {
    const { openPopup } = usePopup();
    const serviceImages = ServicesMediaService.getServicesImages();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#2A3959]">
                    <Image
                        src={serviceImages.inauguration}
                        alt="Product & Brand Launch Events"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <Badge className="mb-12 mt-6 bg-[#F9A625]/80 backdrop-blur-md text-white border-[#F9A625] px-6 py-2 shadow-lg">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Premium Event Management Services
                        </Badge>

                        {/* Main H1 Heading */}
                        <h1 className="text-4xl mb-12 sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            Product & Brand Launch Events in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Strategic Launch Experiences That Create Visibility, Credibility & Market Impact
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                onClick={() => openPopup('corporate-event-management-hero')}
                                className="btn-primary px-10 py-6 text-lg rounded-2xl"
                            >
                                Get Started Today
                                <ArrowRight className="ml-0 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/work'}
                                className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-10 py-6 text-lg rounded-2xl"
                            >
                                View Our Portfolio
                                <ArrowRight className="ml-0 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Immersive Overview Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Dynamic Dark Background */}
                <div className="absolute inset-0 bg-[#2A3959]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A3959] via-[#1E2A3A] to-black/80"></div>

                    {/* Animated Glow Effects */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F9A625]/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 animate-pulse duration-[10000ms]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                    >
                        {/* Headline Side */}
                        <motion.div variants={fadeInUp} className="lg:col-span-7">
                            <div className="relative">
                                <div className="absolute -left-8 -top-8 w-24 h-24 bg-[#F9A625]/20 rounded-full blur-2xl"></div>
                                <h2 className="relative text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-[1.1] mb-8">
                                    End-to-End <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#FFD180]">
                                        Corporate Event Solutions
                                    </span>
                                    <br />
                                    That Drive Impact.
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                {['Impact', 'Engagement', 'Outcomes'].map((item, i) => (
                                    <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wide">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Content Side - Glass Card */}
                        <motion.div variants={fadeInUp} className="lg:col-span-5">
                            <div className="relative p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                                {/* Decorative highlight */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F9A625] to-transparent opacity-50"></div>

                                <div className="space-y-8">
                                    <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
                                        At <strong className="text-white font-semibold">White Massif</strong>, we specialize in delivering <span className="text-[#F9A625] font-bold">high-impact product and brand launch events in Bangalore</span> that generate buzz, attract attention, and position your offering with clarity and confidence. From large-scale product unveilings to press-led brand activations, we design launches that <span className="text-white font-medium border-b border-[#F9A625]/50">connect storytelling with execution excellence.</span>.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        Launching a product, brand, or facility is more than an announcement, it’s a <span className="text-white font-semibold italic">moment of market entry, perception building, and stakeholder influence.</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Key Services Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2 hover:bg-[#F9A625]/20 transition-colors">
                            Our Expertise
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-6 max-w-6xl mx-auto">
                            Our Product & Brand Launch Event Services in Bangalore
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            We provide <strong className="text-[#2A3959] font-bold">end-to-end launch event management</strong>, combining creative strategy, production, media alignment, and flawless execution.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Rocket,
                                title: "Product Launch Events",
                                description: <>We design and execute high-impact product launch events that clearly communicate innovation, value, and differentiation. From conceptual storytelling to the final reveal moment, our product launches are structured to capture attention, engage the audience, and position your offering confidently in the market. Whether launching a technology product, enterprise solution, or consumer offering, we ensure the experience aligns with your brand narrative and business goals.</>
                            },
                            {
                                icon: Building2,
                                title: "Facility & Operations Launches",
                                description: <>Facility and operations launches mark significant milestones in an organization's growth journey. We curate professional and well-orchestrated launch events for corporate offices, manufacturing units, R&D centers, and operational expansions. These launches are designed to showcase scale, capability, and leadership vision while ensuring smooth coordination of stakeholders, guests, and on-ground experiences.</>
                            },
                            {
                                icon: Megaphone,
                                title: "Brand Activation Campaigns",
                                description: <>Our brand activation campaigns focus on creating meaningful interactions that build awareness, recall, and emotional connection. By combining experiential elements with strategic storytelling, we help brands engage employees, customers, and partners through immersive on-ground experiences. Each activation is designed to reflect brand identity while encouraging participation and long-term brand association.</>
                            },
                            {
                                icon: Mic2,
                                title: "Press Conferences",
                                description: <>We manage press conferences with a strong emphasis on clarity, credibility, and media comfort. From venue setup and stage branding to speaker coordination and on-ground media facilitation, we ensure that your message is delivered professionally and consistently. Our approach helps organizations communicate key announcements effectively while reinforcing trust and authority with media stakeholders.</>
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-[#2A3959] border border-white/5 hover:border-[#F9A625]/20 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-white text-[#2A3959] rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <service.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-display text-[#F9A625] leading-tight">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-white leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Why Choose Us Section */}
            < section className="relative py-24 lg:py-32 bg-[#2A3959] overflow-hidden" >
                {/* Background Pattern */}
                < div className="absolute inset-0 opacity-10" >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div >

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading Section - Full Width */}
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                                Why Partner With Us?
                            </Badge>
                            <h2 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-tight max-w-4xl">
                                <span className="flex">Why Choose White Massif for</span>
                                <span className="text-[#F9A625] flex">Product & Brand Launch Events?</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Content Section - Points and Images */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Points List */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-8 max-w-2xl">
                                {[
                                    {
                                        icon: Target,
                                        title: "Launch-Focused Strategy",
                                        desc: "We approach launches as strategic business milestones, not just events, ensuring alignment with marketing, PR, and leadership goals."
                                    },
                                    {
                                        icon: Palette,
                                        title: "Strong Creative & Execution Balance",
                                        desc: "Our team blends conceptual thinking with operational discipline, delivering launches that look impressive and run seamlessly."
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Experience Across Launch Formats",
                                        desc: "From intimate press launches to large-scale brand reveals, we handle diverse formats with confidence."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Local Expertise in Bangalore",
                                        desc: "Deep understanding of venues, media environments, permissions, and logistics in Bangalore ensures reliability and speed."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "End-to-End Ownership",
                                        desc: "One team manages everything, from ideation and production to live execution and closure, ensuring accountability and consistency."
                                    }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F9A625]">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Images Section - Restored to Bigger Size */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <div className="space-y-6 mt-12">
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                                        <Image
                                            src={serviceImages.corporateOffsite}
                                            alt="Corporate Event Planning"
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6 rounded-3xl bg-[#F9A625] text-[#2A3959]">
                                        <div className="text-4xl font-bold mb-2">10+</div>
                                        <div className="font-medium">Years of Corporate Excellence</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
                                        <div className="text-4xl font-bold mb-2">500+</div>
                                        <div className="font-medium">Successful Business Events</div>
                                    </div>
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                                        <Image
                                            src={serviceImages.venueSelection}
                                            alt="Executive Conference"
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F9A625]/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Corporate Event Management Process Section */}
            < section className="py-24 bg-gray-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2 hover:bg-[#2A3959]/20 transition-colors">
                            Our Methodology
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-8">
                            Our Product & Brand Launch Management Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At <strong className="text-[#2A3959] font-bold">White Massif</strong>, our launch process is built to ensure <span className="font-semibold text-[#F9A625]">clarity of message, precision in execution, and maximum impact at the moment of reveal.</span>
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Launch Objective & Stakeholder Alignment",
                                desc: "We start by understanding the purpose of the launch and the audiences it needs to influence.",
                                points: [
                                    "Product or brand positioning goals",
                                    "Target audience & stakeholder mapping",
                                    "Media & PR alignment (if applicable)",
                                    "Past engagement efforts & feedback",
                                    "Timeline & success metrics"
                                ],
                                footer: <>This ensures the launch is <span className="font-semibold text-[#F9A625]">strategically positioned from day one.</span></>
                            },
                            {
                                title: "Planning, Production & Coordination",
                                desc: "Our team manages all planning and production elements with attention to detail.",
                                points: ["Venue sourcing & layout planning", "AV, lighting, staging & fabrication", "Vendor & partner coordination", "Technical rehearsals & dry runs", "Risk & contingency planning"],
                            },
                            {
                                title: "Live Execution & Launch Control",
                                desc: "On launch day, our team manages the event with precision and calm control.",
                                points: ["On-site coordination & run-of-show management", "Speaker & leadership support", "Media handling (for press events)", "Technical supervision & live troubleshooting"],
                                footer: <>This ensures the launch unfolds <span className="font-semibold text-[#F9A625]">smoothly and confidently.</span></>
                            },
                            {
                                title: "Post-Launch Closure & Insights",
                                desc: "Post-event support helps complete the launch cycle.",
                                points: ["Event closure & vendor settlements", "Media & visual asset handover", "Feedback & performance review", "Insights for future brand initiatives"],
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A3959] text-white flex items-center justify-center text-xl font-bold shadow-md group-hover:bg-[#F9A625] transition-colors duration-300">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2A3959] leading-tight flex-1">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>

                                    <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl flex-1">
                                        {step.points.map((point, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#F9A625] mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm font-medium">{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-4 border-t border-gray-100 mt-auto">
                                        <p className="text-sm text-[#2A3959] italic bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                                            {step.footer}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >
            {/* Industries We Serve Section */}
            < section className="py-24 bg-[#2A3959] relative overflow-hidden" >
                {/* Background Pattern */}
                < div className="absolute inset-0 opacity-5" >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div >

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                            Industries
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-white mb-6">
                            Industries We Serve
                        </h2>
                        <p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
                            Our product and brand launch expertise spans across industries, allowing us to tailor launches with <span className="font-semibold text-[#F9A625]">sector-specific relevance and credibility.</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Technology & SaaS Companies",
                                desc: "We support tech brands with launches that emphasize:",
                                points: [
                                    "Innovation & usability",
                                    "Product differentiation",
                                    "Enterprise & consumer communication"
                                ],
                            },
                            {
                                title: "Startups & Growth-Stage Businesses",
                                desc: "For startups, launches are critical milestones.",
                                points: ["Market entry announcements", "Investor-facing launches", "Brand credibility building"],
                            },
                            {
                                title: "Manufacturing & Industrial Organizations",
                                desc: "Facility and product launches for manufacturing brands focus on:",
                                points: ["Scale & capability showcasing", "Partner & stakeholder confidence", "Structured walkthrough experiences"],
                            },
                            {
                                title: "BFSI & Financial Services",
                                desc: "Launches in regulated industries require precision and clarity.",
                                points: ["Brand announcements", "New service or platform launches", "Stakeholder-driven press events"],
                            },
                            {
                                title: "Consumer Brands & Enterprises",
                                desc: "For consumer-facing brands, we design launches that:",
                                points: ["Drive awareness & recall", "Encourage engagement & trial", "Strengthen brand identity"],
                            }
                        ].map((industry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                            >
                                <h3 className="text-2xl font-bold text-[#2A3959] mb-4 group-hover:text-[#F9A625] transition-colors">
                                    {industry.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {industry.desc}
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {industry.points.map((point, i) => (
                                        <li key={i} className="flex items-center text-gray-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#2A3959] mr-3 group-hover:bg-[#F9A625] transition-colors"></div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-20 bg-[#2A3959] relative overflow-hidden" >
                {/* Background Glow */}
                < div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" ></div >

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-8">
                        Planning a Product or Brand Launch in Bangalore?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with White Massif to deliver a launch event that creates visibility, builds credibility, and drives impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-sm lg:text-lg rounded-2xl"
                        >
                            Get a Custom Launch Event Proposal
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-sm lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Speak to Our Launch Event Specialists
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section >

            {/* FAQ Section */}
            < section className="py-24 bg-white relative" >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-4">
                            FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "What types of launch events do you manage?",
                                a: "We manage product launches, facility inaugurations, brand activation campaigns, and press conferences across industries."
                            },
                            {
                                q: "Do you handle end-to-end launch execution?",
                                a: "Yes. From concept and production to live execution and post-event closure, we handle the complete launch lifecycle."
                            },
                            {
                                q: "Can you support media and press conferences?",
                                a: "Absolutely. We manage press-friendly venues, speaker coordination, branding, and on-ground media support."
                            },
                            {
                                q: "How early should a launch event be planned?",
                                a: "Ideally 4–8 weeks in advance for larger launches. Smaller launches can be planned on shorter timelines if required."
                            },
                            {
                                q: "Can launches be customized based on brand identity?",
                                a: "Yes. Every launch is fully customized to reflect your brand’s tone, positioning, and objectives."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-[#2A3959] pr-8">{faq.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#2A3959] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaqIndex === index ? 'auto' : 0, opacity: openFaqIndex === index ? 1 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );
}
