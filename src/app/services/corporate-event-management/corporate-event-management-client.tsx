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
    ChevronDown
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

export default function CorporateEventManagementClient() {
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
                        src={serviceImages.businessEvents}
                        alt="Corporate Event Management"
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
                            Corporate Event Management in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Transform your business gatherings into extraordinary experiences with Bangalore's leading corporate event management company
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
                                        At <strong className="text-white font-semibold">White Massif</strong>, we specialize in delivering <span className="px-1 py-0.5 bg-[#F9A625]/20 text-[#FFD180] rounded">strategic corporate events in Bangalore</span> that go beyond logistics, events designed to <span className="text-white font-medium border-b border-[#F9A625]/50">align teams, elevate brands, and achieve measurable</span> <span className="text-[#F9A625] font-bold">business goals</span>.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        From high-stake business conferences to investor forums and all-hands meetings, we manage every detail with precision. As one of the most trusted <span className="text-white font-semibold italic">corporate event management companies in Bangalore</span>, we create experiences that leave a lasting impression.
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
                            Our Corporate Event Management Services in Bangalore
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We offer end-to-end planning, production, and execution for a wide range of corporate events, tailored to your objectives, audience, and brand positioning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Presentation,
                                title: "Business Conferences",
                                description: "We plan and execute professional, large-scale business conferences that enable knowledge exchange, networking, and thought leadership.",
                                includes: [
                                    "Conference theme & agenda planning",
                                    "Speaker management & coordination",
                                    "Venue sourcing & setup",
                                    "Stage design, AV & technical production",
                                    "Registration & attendee experience management"
                                ]
                            },
                            {
                                icon: Megaphone,
                                title: "All-Hands Meetings",
                                description: "Bring your entire organization together with seamless all-hands meetings that foster transparency, alignment, and motivation.",
                                includes: [
                                    "Leadership updates",
                                    "Company milestones",
                                    "Strategy rollouts",
                                    "Hybrid & in-person formats"
                                ]
                            },
                            {
                                icon: Rocket,
                                title: "Kick-Off Events",
                                description: "Start new financial years, product cycles, or major initiatives with high-energy kick-off events that set the tone for success.",
                                includes: [
                                    "Vision alignment",
                                    "Team engagement",
                                    "Leadership messaging",
                                    "Interactive experiences"
                                ]
                            },
                            {
                                icon: Globe,
                                title: "Corporate Summits",
                                description: "We manage executive-level and industry-focused corporate summits that position your organization as a market leader.",
                                includes: [
                                    "Curated content flow",
                                    "Premium delegate experience",
                                    "Sponsor & partner integrations",
                                    "Brand storytelling through design"
                                ]
                            },
                            {
                                icon: TrendingUp,
                                title: "Investor Forums",
                                description: "Host high-credibility investor forums that reflect professionalism, trust, and strategic intent.",
                                includes: [
                                    "Confidential planning & logistics",
                                    "High-end venue management",
                                    "Presentation & stage aesthetics",
                                    "VIP guest handling"
                                ]
                            },
                            {
                                icon: Users,
                                title: "Annual General Meetings (AGMs)",
                                description: "We ensure AGMs are conducted smoothly, compliantly, and professionally, whether physical, virtual, or hybrid.",
                                includes: [
                                    "End-to-end AGM logistics",
                                    "Shareholder experience",
                                    "Technical & voting support",
                                    "Compliance-friendly execution"
                                ]
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
                                <div className="flex items-center gap-4 mb-6 ">
                                    <div className="w-14 h-14 bg-white text-[#2A3959] rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <service.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-display text-[#F9A625] leading-tight">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-white leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <div className="border-t border-gray-100 pt-6">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-[#F9A625] rounded-full"></div>
                                        Includes
                                    </h4>
                                    <ul className="space-y-3">
                                        {service.includes.map((item, i) => (
                                            <li key={i} className="flex items-start text-sm text-white/70">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#F9A625] mt-1.5 mr-3 flex-shrink-0"></div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                                <span className="text-[#F9A625] flex">Corporate Event Management?</span>
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
                                        title: "Strategy-First Approach",
                                        desc: "We don’t just execute events, we design experiences aligned with your business objectives, audience psychology, and brand narrative."
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Proven Corporate Expertise",
                                        desc: "With extensive experience across IT, startups, enterprises, and MNCs, we understand corporate expectations, timelines, and governance."
                                    },
                                    {
                                        icon: Layers,
                                        title: "End-to-End Ownership",
                                        desc: "From concept to closure, one dedicated team manages planning, vendors, production, and on-ground execution."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Flawless Execution in Bangalore",
                                        desc: "Deep local expertise across venues, vendors, permissions, and logistics in Bangalore ensures reliability and speed."
                                    },
                                    {
                                        icon: BarChart,
                                        title: "Measurable Outcomes",
                                        desc: "We focus on engagement, attendance, satisfaction, and brand recall, not just aesthetics."
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
                            Our Corporate Event Management Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At <strong className="text-[#2A3959] font-bold">White Massif</strong>, our corporate event management process is built to deliver <span className="font-semibold text-[#F9A625]">clarity, control, and consistency at every stage</span>. We follow a structured yet flexible approach that ensures <span className="font-semibold text-[#F9A625]">on-time delivery, budget discipline, and exceptional attendee experience</span>, regardless of event scale or complexity.
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Strategic Discovery & Requirement Mapping",
                                desc: "Every successful corporate event starts with a deep understanding of your business objectives, audience profile, and success metrics.",
                                points: [
                                    "Event purpose (alignment, communication, branding, compliance, engagement)",
                                    "Target audience & stakeholder expectations",
                                    "Event format (in-person, hybrid, virtual)",
                                    "Budget framework & timelines",
                                    "Brand guidelines and internal protocols"
                                ],
                                footer: <>This ensures the event strategy is <span className="font-semibold text-[#F9A625]">business-led, not execution-driven.</span></>
                            },
                            {
                                title: "Concept Development & Experience Design",
                                desc: "Once the foundation is clear, our team crafts a cohesive event concept that aligns messaging, flow, and visual identity.",
                                points: ["Event theme and narrative", "Agenda & session flow planning", "Stage design & spatial planning", "Attendee journey mapping", "Engagement touchpoints & interactions"],
                                footer: <>The focus is on creating <span className="font-semibold text-[#F9A625]">purposeful experiences</span>, not just good-looking setups.</>
                            },
                            {
                                title: "Detailed Planning & Vendor Coordination",
                                desc: "Our team handles all planning and coordination, acting as a single point of accountability.",
                                points: ["Venue shortlisting & negotiations in Bangalore", "AV, lighting, staging & technical production", "Speaker & VIP logistics", "Vendor management & quality control", "Risk assessment & contingency planning"],
                                footer: <>Every element is planned with <span className="font-semibold text-[#F9A625]">precision, compliance, and scalability</span> in mind.</>
                            },
                            {
                                title: "On-Ground Execution & Live Event Management",
                                desc: "Our experienced team takes full control on the day of the event.",
                                points: ["End-to-end on-site coordination", "Run-of-show & timeline control", "Speaker, leadership & guest handling", "Technical supervision & live troubleshooting", "Seamless transitions between sessions"],
                                footer: <>Our team operates quietly in the background, ensuring the event unfolds <span className="font-semibold text-[#F9A625]">flawlessly and stress-free</span>for your stakeholders.</>
                            },
                            {
                                title: "Post-Event Closure, Reporting & Insights",
                                desc: "Our involvement doesn’t end when the event does.",
                                points: ["Event closure & vendor settlements", "Feedback collection & analysis", "Attendance & engagement reporting", "Visual documentation handover", "Strategic recommendations for future events"],
                                footer: <>This stage helps organizations <span className="font-semibold text-[#F9A625]">measure ROI and refine future corporate events.</span>.</>
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
                            Our experience spans across diverse industries, enabling us to understand <span className="font-semibold text-[#F9A625]">sector-specific expectations, compliance requirements, and audience behaviors.</span> This allows us to design corporate events that feel <span className="font-semibold text-[#F9A625]">relevant, credible, and impactful.</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Information Technology & Tech Companies",
                                desc: "We work extensively with IT firms, SaaS companies, and product organizations to deliver:",
                                points: [
                                    "Annual conferences",
                                    "Leadership offsites",
                                    "All-hands meetings",
                                    "Product & innovation showcases"
                                ]
                            },
                            {
                                title: "Startups & Scale-Ups",
                                desc: "Fast-growing companies trust us for:",
                                points: ["Kick-off events", "Investor forums", "Town halls & internal communications", "Brand positioning events"],
                                footer: "We understand the need for speed, agility, and cost efficiency without compromising quality."
                            },
                            {
                                title: "BFSI & Financial Services",
                                desc: "For banks, financial institutions, and fintech companies, we manage:",
                                points: ["Investor meets", "AGMs", "Compliance-driven events", "Leadership summits"],
                                footer: "Our approach emphasizes precision, confidentiality, and professionalism."
                            },
                            {
                                title: "Manufacturing & Engineering",
                                desc: "We support manufacturing and engineering organizations with:",
                                points: ["Corporate conferences", "Dealer & partner meets", "Annual business reviews", "Leadership forums"],
                                footer: "These events are designed to balance functionality with brand presence."
                            },
                            {
                                title: "Healthcare, Pharma & Life Sciences",
                                desc: "For regulated industries, we deliver:",
                                points: ["Corporate summits", "Internal leadership meetings", "Stakeholder conferences", "Knowledge-sharing forums"],
                                footer: "All events are executed with strict adherence to industry norms and protocols."
                            },
                            {
                                title: "Enterprise & Corporate Organizations",
                                desc: "We partner with large enterprises across sectors for:",
                                points: ["Company-wide town halls", "Annual strategy meets", "Executive summits", "High-stake internal & external events"],
                                footer: "Our team understands enterprise-level governance, approvals, and reporting structures."
                            }
                        ].map((industry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
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
                                <div className="pt-6 border-t border-gray-50">
                                    <p className="text-sm font-medium text-[#2A3959]/70 italic flex items-center gap-2">
                                        {industry.footer}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Corporate Events in Bangalore Section */}
            <section className="py-24 bg-gray-50 text-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-5xl font-display text-[#2A3959] mb-6">
                        Corporate Events in Bangalore –<span className="text-[#F9A625]"> Built for Today’s Business Needs</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Whether you’re hosting a high-profile corporate summit, an internal all-hands meeting, or a formal AGM, White Massif ensures your event reflects professionalism, precision, and purpose.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#2A3959] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-8">
                        Planning a Corporate Event in Bangalore?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with White Massif for seamless corporate event management that delivers real business impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-lg rounded-2xl"
                        >
                            Talk to Our Event Experts
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Get a Custom Event Proposal
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
                                q: "What types of corporate events do you manage in Bangalore?",
                                a: "We manage business conferences, all-hands meetings, kick-off events, corporate summits, investor forums, and AGMs, both in-person and hybrid."
                            },
                            {
                                q: "Do you handle end-to-end corporate event management?",
                                a: "Yes. We manage everything from concept, venues, vendors, and production to live execution and post-event closure."
                            },
                            {
                                q: "Can you manage large-scale corporate events?",
                                a: "Absolutely. We specialize in mid-to-large scale corporate events with complex logistics and senior stakeholders."
                            },
                            {
                                q: "Do you provide customized event solutions?",
                                a: "Yes. Every event is tailored based on business goals, audience type, and brand positioning."
                            },
                            {
                                q: "How early should we plan a corporate event?",
                                a: "Ideally 4–8 weeks in advance for large events. However, we can also handle short-timeline corporate events when required."
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
