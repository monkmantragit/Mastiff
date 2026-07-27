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
    Handshake,
    Heart,
    Share2,
    UserCheck
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

export default function DealerAndCustomerMeetEventsClient() {
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
                        src={serviceImages.conventionMeet}
                        alt="Dealer & Customer Meet Events"
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
                            Dealer & Customer Meet Events in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Strategic Dealer & Customer Engagement Experiences That Strengthen Relationships and Drive Growth
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
                                        At <strong className="text-white font-semibold">White Massif</strong>, we specialize in delivering <span className="text-[#F9A625] font-bold">dealer and customer meet events in Bangalore</span> that combine relationship-building with strategic communication. From high-energy dealer meets to focused product demonstrations and customer appreciation events, we design experiences that strengthen loyalty, improve alignment, and support long-term business growth.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        Dealer and customer meet events play a crucial role in building trust, reinforcing partnerships, and aligning business objectives across the value chain.
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
                            Our Dealer & Customer Meet Event Services in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Handshake,
                                title: "Dealer Meets",
                                description: <>We design and manage dealer meets that bring channel partners together to align on vision, performance goals, and market strategies. These events are structured to encourage dialogue, knowledge sharing, and motivation while reinforcing brand trust and partnership value. Whether regional or national in scope, our dealer meets are professionally executed and purpose-driven.</>
                            },
                            {
                                icon: Heart,
                                title: "Customer Appreciation Events",
                                description: <>Customer appreciation events are curated to celebrate loyalty, recognize long-term relationships, and deepen brand affinity. We create warm, engaging experiences that allow organizations to connect meaningfully with customers in a relaxed yet professional setting. Every element is designed to leave a lasting positive impression and strengthen emotional connections with your brand.</>
                            },
                            {
                                icon: Share2,
                                title: "Channel Partner Conferences",
                                description: <>Channel partner conferences require a balance of strategic communication and collaborative engagement. We manage conferences that help organizations communicate business updates, share market insights, and align partners with future plans. These events are designed to foster transparency, collaboration, and confidence across distribution and partner networks.</>
                            },
                            {
                                icon: Presentation,
                                title: "Product Demonstrations",
                                description: <>Product demonstration events are focused on clarity, confidence, and hands-on engagement. We plan demonstrations that allow dealers and customers to experience product features, benefits, and use cases in a structured environment. These events help drive product understanding, accelerate adoption, and support sales effectiveness.</>
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
            </section>

            {/* Why Choose Us Section */}
            <section className="relative py-24 lg:py-32 bg-[#2A3959] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

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
                                <span className="text-[#F9A625] flex">Dealer & Customer Meet Events?</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
                                At <strong className="text-white font-semibold">White Massif</strong>, dealer and customer meet events are approached as <span className="text-[#F9A625] font-bold">strategic relationship platforms</span>, not just formal gatherings. Our strength lies in combining business understanding with experience-led execution to create events that deliver long-term value.
                            </p>
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
                                        icon: TrendingUp,
                                        title: "Deep Understanding of Channel & Customer Dynamics",
                                        desc: "We understand how dealer networks, channel partners, and customers influence sales performance, brand perception, and market expansion. Every event is designed to strengthen trust, alignment, and collaborationSationships across the value chain."
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Business-First Event Strategy",
                                        desc: "Our events are built around clear business objectives, whether it’s improving dealer motivation, driving product adoption, increasing partner confidence, or reinforcing customer loyalty, ensuring every interaction serves a purpose."
                                    },
                                    {
                                        icon: Megaphone,
                                        title: "Balanced Communication & Engagement",
                                        desc: "We strike the right balance between information sharing and engagement, ensuring presentations, product demos, and interactions are structured, relevant, and impactful without overwhelming attendees."
                                    },
                                    {
                                        icon: UserCheck,
                                        title: "Professional Stakeholder & Guest Management",
                                        desc: "From senior leadership and key dealers to valued customers and partners, we ensure smooth guest handling, clear communication, and a premium experience throughout the event lifecycle."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "End-to-End Ownership & Accountability",
                                        desc: " A single dedicated team manages planning, coordination, execution, and closure, ensuring consistency, accountability, and seamless execution across all touchpoints."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Local Execution Expertise in Bangalore",
                                        desc: "With strong on-ground knowledge of venues, logistics, and vendor ecosystems in Bangalore, we deliver dealer and customer meets with reliability, speed, and execution precision."
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
            </section>

            {/* Corporate Event Management Process Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2 hover:bg-[#2A3959]/20 transition-colors">
                            Our Methodology
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-8">
                            Our Dealer & Customer Meet Event Management Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At <strong className="text-[#2A3959] font-bold">White Massif</strong>, our process ensures that every dealer or customer interaction is <span className="font-semibold text-[#F9A625]">intentional, well-structured, and impactful.</span>
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Business Objective & Stakeholder Alignment",
                                desc: "We begin by understanding the purpose of the meet and the stakeholders involved.",
                                points: [
                                    "Business and sales objectives",
                                    "Dealer, customer, or partner profiles",
                                    "Key messages and outcomes",
                                    "Scale, format, and timeline expectations"
                                ]
                            },
                            {
                                title: "Experience Design & Content Structuring",
                                desc: "Once objectives are defined, we design an experience that supports communication and engagement.",
                                points: ["Event flow and session sequencing", "Content structure for presentations and demos", "Engagement moments and interaction design", "Brand and messaging alignment"]
                            },
                            {
                                title: "Planning, Venue & Logistics Management",
                                desc: "We manage all operational and logistical elements to ensure smooth execution.",
                                points: ["Venue selection and setup in Bangalore", "Audio-visual and technical arrangements", "Branding, signage, and spatial planning", "Vendor coordination and quality contro"]
                            },
                            {
                                title: "On-Ground Execution & Guest Management",
                                desc: "On event day, our team ensures professional and seamless execution.",
                                points: ["End-to-end on-site coordination", "Speaker and leadership support", "Guest, dealer, and customer handling", "Timeline control and issue resolution"]
                            },
                            {
                                title: "Post-Event Closure & Relationship Insights",
                                desc: "Our support continues after the event to help organizations maximize value.",
                                points: ["Event closure and vendor settlements", "Feedback collection and analysis", "Engagement observations and insights", "Recommendations for future dealer or customer events"]
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

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Industries We Serve Section */}
            <section className="py-24 bg-[#2A3959] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                            Industries
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-white mb-6">
                            Industries We Serve
                        </h2>
                        <p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
                            Our dealer and customer meet expertise spans multiple industries, allowing us to design events that are <span className="font-semibold text-[#F9A625]">relevant, credible, and aligned with sector-specific needs.</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Manufacturing & Industrial Organizations",
                                desc: "We support manufacturing and industrial brands with dealer meets and partner conferences that focus on:",
                                points: [
                                    "Distributor and dealer alignment",
                                    "Product capability and technical understanding",
                                    "Market expansion strategies",
                                    "Long-term channel relationship building"
                                ]
                            },
                            {
                                title: "FMCG & Consumer Goods",
                                desc: "For FMCG and consumer brands, our events are structured to:",
                                points: ["Strengthen dealer and retailer engagement", "Improve product visibility and recall", "Drive consistency in brand communication", "Encourage market-level collaboration"],
                            },
                            {
                                title: "Automotive & Mobility",
                                desc: "In the automotive and mobility sector, we manage dealer and customer events that emphasize:",
                                points: ["Product performance and innovation showcases", "Dealer motivation and recognition", "Customer engagement and loyalty building", "Service and after-sales communication"],
                            },
                            {
                                title: "Technology & Electronics",
                                desc: "We work with technology and electronics brands to deliver partner and customer meets that enable:",
                                points: ["Clear product demonstrations and walkthroughs", "Simplification of complex offerings", "Sales enablement and partner education", "Stronger channel confidence and alignment"],
                            },
                            {
                                title: "BFSI & Financial Services",
                                desc: "For BFSI organizations, we design structured dealer and customer engagement events that focus on:",
                                points: ["Trust and relationship building", "Compliance-aligned communication", "Product and service clarity", "Stakeholder confidence and transparency"],
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
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#2A3959] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-8">
                        Planning a Dealer or Customer Meet in Bangalore?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with White Massif to create engagement experiences that build relationships, strengthen channels, and support business growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-sm lg:text-lg rounded-2xl"
                        >
                            Speak to Our Event Specialists
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-sm lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Get a Custom Dealer Meet Proposal
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-4">
                            FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "What types of dealer and customer events do you manage?",
                                a: "We manage dealer meets, customer appreciation events, channel partner conferences, and structured product demonstration events."
                            },
                            {
                                q: "Can these events be customized for different audiences?",
                                a: "Yes. Every event is tailored based on audience profile, business objectives, and brand positioning."
                            },
                            {
                                q: "Do you handle end-to-end execution?",
                                a: "Absolutely. From planning and logistics to live execution and post-event closure, we manage the complete lifecycle."
                            },
                            {
                                q: "How early should dealer or customer meets be planned?",
                                a: "Ideally 4–6 weeks in advance for larger events, though smaller meets can be organized on shorter timelines."
                            },
                            {
                                q: "Do you provide post-event insights?",
                                a: "Yes. We share feedback and engagement insights to help refine future dealer and customer engagement strategies."
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
            </section>
        </div>
    );
}
