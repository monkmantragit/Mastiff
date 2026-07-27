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
    Presentation,
    Rocket,
    Users,
    Target,
    Globe,
    Megaphone,
    TrendingUp,
    Briefcase,
    Layers,
    MapPin,
    BarChart,
    ChevronDown,
    Trophy,
    Palette,
    Lightbulb,
    Puzzle,
    CheckCircle,
    ShieldCheck,
    Zap,
    Cast,
    Cpu
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

export default function HybridAndVirtualEventsClient() {
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
                        src={serviceImages.hybridEvents}
                        alt="Hybrid & Virtual Events"
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
                            Hybrid & Virtual Events in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Seamless Digital & Hybrid Event Experiences Designed for Engagement, Reach & Reliability
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
                                        At <strong className="text-white font-semibold">White Massif</strong>, we deliver <span className="text-[#F9A625] font-bold">end-to-end hybrid and virtual event management in Bangalore</span>, combining robust technology, thoughtful experience design, and flawless execution. From high-impact webinars and virtual conferences to live-streamed events and interactive online workshops, we help organizations connect with audiences, anywhere, anytime, without compromise.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        In today’s distributed and digital-first business environment, virtual and hybrid events have become essential for communication, engagement, and growth.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* Key Services Section */}
            < section className="py-24 bg-white" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2 hover:bg-[#F9A625]/20 transition-colors">
                            Our Expertise
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-6 max-w-6xl mx-auto">
                            Our Hybrid & Virtual Event Services in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Presentation,
                                title: "Webinars",
                                description: <>We plan and manage professional webinars that are structured, engaging, and purpose-driven. Our webinar solutions are designed to support knowledge sharing, lead generation, internal communication, and thought leadership. From speaker coordination and content flow to audience interaction and platform management, we ensure webinars are smooth, engaging, and outcome-focused.</>
                            },
                            {
                                icon: Globe,
                                title: "Virtual Conferences",
                                description: <>Virtual conferences require careful orchestration to maintain attention and deliver value across multiple sessions and audiences. We design and execute virtual conferences that mirror the impact of physical events through strong content structuring, seamless transitions, speaker support, and immersive digital environments. These conferences are ideal for industry forums, leadership summits, and large-scale knowledge-sharing events.</>
                            },
                            {
                                icon: Cast,
                                title: "Live Streaming Services",
                                description: <>Our live streaming services enable organizations to broadcast events in real time with clarity, stability, and professional production quality. Whether streaming corporate announcements, leadership addresses, product launches, or hybrid events, we manage the complete live streaming setup, ensuring consistent audio-visual quality and uninterrupted transmission across platforms.</>
                            },
                            {
                                icon: Users,
                                title: "Interactive Online Workshops",
                                description: <>Interactive online workshops are designed to promote collaboration, learning, and engagement in a virtual setting. We curate workshops that go beyond presentations by incorporating breakout sessions, real-time activities, facilitated discussions, and interactive tools. These workshops are ideal for training programs, leadership development, team engagement, and skill-building initiatives.</>
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
                                <span className="text-[#F9A625] flex">Hybrid & Virtual Events?</span>
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
                                        icon: Palette,
                                        title: "Experience-Driven Digital Design",
                                        desc: "We design digital experiences that prioritize audience attention, interaction, and clarity, ensuring virtual events feel purposeful, not passive."
                                    },
                                    {
                                        icon: Cpu,
                                        title: "Strong Technology & Execution Control",
                                        desc: "Our team manages platforms, tools, and technical workflows with precision, minimizing risks and ensuring smooth execution throughout the event lifecycle."
                                    },
                                    {
                                        icon: Layers,
                                        title: "Flexible Event Formats",
                                        desc: "We support fully virtual, hybrid, and multi-location event formats, adapting seamlessly to your audience size, geography, and engagement goals."
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Enterprise-Ready Processes",
                                        desc: "From speaker rehearsals to data privacy and contingency planning, our processes are built to meet enterprise-level expectations and governance standards."
                                    },
                                    {
                                        icon: CheckCircle,
                                        title: "End-to-End Ownership",
                                        desc: "A single dedicated team manages planning, technology, execution, and post-event closure, ensuring accountability and consistency."
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
                            Our Hybrid & Virtual Event Management Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At <strong className="text-[#2A3959] font-bold">White Massif</strong>, our hybrid and virtual event process is built to ensure <span className="font-semibold text-[#F9A625]">technical reliability, audience engagement, and brand consistency</span>, without the risks commonly associated with digital events.
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Event Objectives, Audience & Format Mapping",
                                desc: "We begin by defining the strategic foundation of the event to ensure the right format and tools are chosen.",
                                points: [
                                    "Core event objective (engagement, training, communication, branding, lead generation)",
                                    "Audience type, size, and geographic spread",
                                    "Event format selection (virtual, hybrid, live-streamed)",
                                    "Duration, agenda depth, and interaction intensity",
                                    "Success metrics and reporting expectations"
                                ],
                                footer: <>This clarity helps avoid over-engineering and ensures a <span className="font-semibold text-[#F9A625]">purpose-driven digital experience.</span></>
                            },
                            {
                                title: "Digital Experience & Content Flow Design",
                                desc: "Once objectives are clear, we design the virtual or hybrid experience to keep audiences attentive and involved.",
                                points: ["Session structure and agenda sequencing", "Speaker order and time allocation", "Engagement touchpoints such as polls, Q&A, chats, and breakout rooms", "Audience journey mapping from login to closure", "Brand integration across digital touchpoints"],
                                footer: <>The focus is on<span className="font-semibold text-[#F9A625]"> maintaining attention and reducing virtual fatigue.</span></>
                            },
                            {
                                title: "Platform Selection, Tech Setup & Rehearsals",
                                desc: "Technology reliability is critical to virtual and hybrid events.",
                                points: ["Platform selection based on scale, security, and interactivity needs", "Integration of streaming, engagement, and registration tools", "Speaker onboarding and technical checks", "Full run-throughs and rehearsals", "Backup planning and contingency workflows"],
                                footer: <>Every technical element is stress-tested to ensure <span className="font-semibold text-[#F9A625]">zero disruption during live execution.</span></>
                            },
                            {
                                title: "Live Event Execution & Real-Time Control",
                                desc: "On event day, our team manages both the human and technical aspects of execution.",
                                points: ["Live coordination and run-of-show control", "Speaker cueing and session transitions", "Audience engagement moderation", "Real-time technical monitoring", "Immediate troubleshooting and adjustments"],
                                footer: <>This ensures a smooth, professional experience for both virtual and on-ground participants.</>
                            },
                            {
                                title: "Post-Event Closure, Analytics & Insights",
                                desc: "After the event, we help close the loop with structured reporting and asset handover.",
                                points: ["Session recordings and content delivery", "Attendance and engagement analytics", "Feedback summaries and qualitative insights", "Performance review against objectives", "Recommendations for future virtual or hybrid events"],
                                footer: <>This enables organizations to <span className="font-semibold text-[#F9A625]">measure ROI and continuously improve digital engagement.</span></>
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] flex flex-col"
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
                            Our hybrid and virtual event solutions are tailored to industry-specific communication needs, compliance requirements, and audience expectations.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Technology & IT Companies",
                                desc: "We help tech organizations manage:",
                                points: [
                                    "Large-scale webinars and virtual conferences",
                                    "Product demos and internal town halls",
                                    "Distributed team engagement and training",
                                    "Global leadership communications"
                                ]
                            },
                            {
                                title: "Startups & Growth-Stage Companies",
                                desc: "For fast-scaling teams, we support:",
                                points: ["Investor updates and virtual pitches", "Internal alignment meetings", "Brand-building webinars", "Cost-effective, scalable digital events"],
                            },
                            {
                                title: "BFSI & Financial Services",
                                desc: "In regulated environments, precision matters. Our virtual event solutions support:",
                                points: ["Leadership announcements", "Investor and stakeholder communication", "Secure, compliance-friendly events", "Clear and structured information delivery"],
                            },
                            {
                                title: "Healthcare, Pharma & Life Sciences",
                                desc: "We design professional virtual formats for:",
                                points: ["Medical and knowledge conferences", "Training and certification programs", "Stakeholder workshops", "Industry forums with high credibility"],
                            },
                            {
                                title: "Large Enterprises & Multinational Corporations",
                                desc: "For complex, multi-location organizations, we deliver:",
                                points: ["Hybrid town halls and global meets", "Multi-session virtual conferences", "Leadership-driven communication events", "Scalable digital engagement programs"],
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
                        Planning a Hybrid or Virtual Event in Bangalore?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with White Massif to deliver digital and hybrid experiences that are reliable, engaging, and professionally executed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-sm lg:text-lg rounded-2xl"
                        >
                            Request a Custom Virtual Event Plan
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-sm lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Speak to Our Hybrid Event Specialists
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
                                q: "What types of virtual and hybrid events do you manage?",
                                a: "We manage webinars, virtual conferences, live-streamed corporate events, and interactive online workshops across industries."
                            },
                            {
                                q: "Do you provide end-to-end virtual event management?",
                                a: "Yes. We handle planning, platform management, technical execution, live coordination, and post-event closure."
                            },
                            {
                                q: "Can hybrid events support both physical and online audiences?",
                                a: "Absolutely. We design hybrid events that deliver a seamless experience for both in-person and virtual participants."
                            },
                            {
                                q: "How early should virtual events be planned?",
                                a: "Smaller virtual events can be planned within a few weeks, while larger conferences and hybrid events ideally require 4–6 weeks of preparation."
                            },
                            {
                                q: "Do you provide post-event analytics and recordings?",
                                a: "Yes. We provide recordings, participation data, and engagement insights to help measure event performance."
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
