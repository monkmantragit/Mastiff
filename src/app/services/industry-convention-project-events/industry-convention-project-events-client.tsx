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
    Store,
    GalleryHorizontal,
    Hammer,
    Maximize,
    Compass,
    PenTool,
    Award
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

export default function IndustryConventionProjectEventsClient() {
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
                        src={serviceImages.specialEvents}
                        alt="Industry Convention & Project Events"
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
                            Industry Conventions & Special Projects in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Large-Scale Industry Events & Custom Event Solutions Designed for Impact, Scale & Precision
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
                                        At <strong className="text-white font-semibold">White Massif</strong>, we specialize in delivering <span className="text-[#F9A625] font-bold">industry conventions and special event projects in Bangalore</span> that bring together stakeholders, experts, partners, and organizations through well-structured, professionally executed experiences. From trade shows and exhibitions to specialized workshops and custom event solutions, we manage complex events with clarity, control, and confidence.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        Industry conventions and special projects demand a higher level of planning, coordination, and strategic thinking. These events are not just about execution, they are platforms for <span className="text-white font-semibold italic">knowledge exchange, industry positioning, collaboration, and long-term influence.</span>
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
                            Our Industry Convention & Special Project Services in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Store,
                                title: "Trade Shows",
                                description: <>We plan and manage trade shows that enable industries to showcase innovations, connect with buyers, and strengthen business networks. Our approach focuses on smooth exhibitor coordination, structured visitor flow, and professional event environments that support meaningful interactions and commercial outcomes.</>
                            },
                            {
                                icon: GalleryHorizontal,
                                title: "Exhibitions",
                                description: <>Exhibitions require detailed planning and precise execution to balance scale with experience. We manage exhibitions that highlight products, services, and ideas through well-designed layouts, clear navigation, and strong branding. Each exhibition is curated to maximize visibility, engagement, and value for exhibitors and attendees alike.</>
                            },
                            {
                                icon: Hammer,
                                title: "Specialized Workshops",
                                description: <>Specialized workshops are designed to facilitate focused learning, collaboration, and skill development within specific industries or domains. We manage workshops that bring together experts, practitioners, and participants in structured formats that encourage discussion, hands-on learning, and knowledge sharing in a professional setting.</>
                            },
                            {
                                icon: Puzzle,
                                title: "Custom Event Solutions",
                                description: <>Some events don't fit into standard formats, and that's where our custom event solutions come in. We design and execute tailored event concepts based on unique objectives, audiences, and environments. From multi-format conventions to one-of-a-kind industry experiences, we build solutions that are aligned with purpose and executed with precision.</>
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
                            <h2 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-tight max-w-6xl">
                                <span className="flex">Why Choose White Massif for</span>
                                <span className="text-[#F9A625] flex">Industry Conventions & Special Projects?</span>
                            </h2>
                            <p className="text-lg text-gray-300 max-w-5xl leading-relaxed">
                                At <strong className="text-white font-bold">White Massif</strong>, industry conventions and special projects are handled as <span className="font-semibold text-[#F9A625]">high-impact business platforms</span>, not routine events. Our approach combines strategic thinking, operational rigor, and large-scale execution expertise to deliver events that influence industries, not just audiences.
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
                                        icon: Maximize,
                                        title: "Expertise in Large-Scale & High-Complexity Events",
                                        desc: "We specialize in managing conventions, trade shows, and special projects that involve multiple stakeholders, parallel sessions, exhibitors, and large audiences. Our experience allows us to maintain control, clarity, and consistency even in complex environments."
                                    },
                                    {
                                        icon: Compass,
                                        title: "Strategy-Led Event Architecture",
                                        desc: "Every industry convention or special project is designed around clear objectives, knowledge exchange, industry positioning, collaboration, or commercial outcomes, ensuring the event delivers long-term value beyond the event days."
                                    },
                                    {
                                        icon: Users,
                                        title: "Strong Stakeholder & Multi-Partner Management",
                                        desc: "Industry events often involve associations, sponsors, exhibitors, speakers, and delegates. We manage these relationships with structured communication, defined workflows, and accountability to ensure alignment across all parties."
                                    },
                                    {
                                        icon: PenTool,
                                        title: "Custom-Built Solutions, Not Templates",
                                        desc: "We understand that industry conventions and special projects rarely follow a fixed format. Our team designs custom event solutions tailored to industry context, audience expectations, and operational constraints."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Operational Excellence & Risk Management",
                                        desc: "From venue logistics and fabrication to technical production and safety compliance, we follow disciplined planning and contingency protocols to minimize risk and ensure smooth execution."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Strong On-Ground Capability in Bangalore",
                                        desc: "With deep local knowledge of venues, vendors, permissions, and infrastructure in Bangalore, we deliver industry events with speed, reliability, and execution precision."
                                    },
                                    {
                                        icon: Award,
                                        title: "Consistent Professional & Brand Representation",
                                        desc: "Every touchpoint, from stage design and exhibition layouts to signage and delegate experience, is aligned with the event’s professional and industry positioning."
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
                            Our Industry Convention & Special Project Management Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Our process is built to manage<strong className="text-[#2A3959] font-bold"> scale, complexity, and customization</strong>while maintaining control and consistency across all event elements.
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Objective Definition & Stakeholder Alignment",
                                desc: "We begin by understanding the purpose of the convention or project, the stakeholders involved, and the outcomes expected.",
                                points: [
                                    "Event objectives and success criteria",
                                    "Audience and participant profiling",
                                    "Industry context and sensitivities",
                                    "Scale, format, and duration planning"
                                ]
                            },
                            {
                                title: "Event Architecture & Experience Design",
                                desc: "Once objectives are clear, we design the overall event structure and experience flow.",
                                points: ["Event format and program design", "Session planning and sequencing", "Exhibition or trade show layout strategy", "Participant journey and engagement design"]
                            },
                            {
                                title: "Planning, Production & Coordination",
                                desc: "We manage all planning and production elements with attention to detail and risk control.",
                                points: ["Venue selection and spatial planning in Bangalore", "Vendor, fabrication, and technical coordination", "Exhibitor and participant management", "Compliance, safety, and contingency planning"]
                            },
                            {
                                title: "On-Ground Execution & Live Management",
                                desc: "During the event, our team ensures smooth coordination across all moving parts.",
                                points: ["End-to-end on-site operations", "Speaker, exhibitor, and guest support", "Schedule adherence and issue resolution", "Real-time coordination across teams"]
                            },
                            {
                                title: "Post-Event Closure & Project Review",
                                desc: "After the event, we support closure and evaluation.",
                                points: ["Event dismantling and vendor settlements", "Feedback collection and performance review", "Participation and engagement insights", "Recommendations for future editions or projects"]
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
                            Our experience across diverse sectors enables us to design <span className="font-semibold text-[#F9A625]">industry-specific conventions and special projects</span> that are relevant, credible, and outcome-driven.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Trade Associations & Industry Bodies",
                                desc: "We work closely with associations and councils to deliver conventions, exhibitions, and forums that:",
                                points: [
                                    "Facilitate industry dialogue and collaboration",
                                    "Support policy discussions and knowledge sharing",
                                    "Strengthen member engagement and participation"
                                ]
                            },
                            {
                                title: "Manufacturing & Industrial Sectors",
                                desc: "For manufacturing and industrial organizations, we manage events that focus on:",
                                points: ["Trade shows and exhibitions for capability showcase", "Technical workshops and partner forums", "Dealer, distributor, and stakeholder alignment"],
                            },
                            {
                                title: "Technology, Innovation & Emerging Sectors",
                                desc: "We support technology-driven ecosystems with events that:",
                                points: ["Highlight innovation, research, and future trends", "Enable networking between startups, enterprises, and investors", "Support demo-led exhibitions and industry conventions"],
                            },
                            {
                                title: "Healthcare, Pharma & Life Sciences",
                                desc: "In regulated and knowledge-intensive sectors, we manage events that emphasize:",
                                points: ["Professional knowledge exchange", "Compliance-aligned execution", "Collaboration between institutions, experts, and industry leaders"],
                            },
                            {
                                title: "Education, Research & Skill Development",
                                desc: "We design conventions and workshops for academic and research institutions that focus on:",
                                points: ["Industry-academia collaboration", "Skill development and training initiatives", "Conferences, exhibitions, and learning-centric forums"],
                            },
                            {
                                title: "Enterprise & Multi-Sector Organizations",
                                desc: "For large enterprises operating across sectors, we deliver:",
                                points: ["Custom industry events and special projects", "Multi-format conventions and exhibitions", "Scalable solutions aligned with enterprise governance and branding"],
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
                        Planning an Industry Convention or Special Event in Bangalore?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with White Massif to deliver large-scale, custom-built industry events with clarity, professionalism, and execution excellence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-sm lg:text-lg rounded-2xl"
                        >
                            Speak to Our Event Strategy Team
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-sm lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Get a Custom Convention Proposal
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
                                q: "What types of industry events do you manage?",
                                a: "We manage trade shows, exhibitions, industry conventions, specialized workshops, and fully customized event projects."
                            },
                            {
                                q: "Can you handle large-scale, multi-day events?",
                                a: "Yes. We have experience managing large, multi-day conventions with multiple stakeholders, sessions, and exhibitors."
                            },
                            {
                                q: "Do you offer customized event formats?",
                                a: "Absolutely. We design custom event solutions based on unique objectives, audiences, and environments."
                            },
                            {
                                q: "How early should industry conventions be planned?",
                                a: "Large-scale events ideally require 2–4 months of planning, depending on complexity and scale."
                            },
                            {
                                q: "Do you support post-event reporting and insights?",
                                a: "Yes. We provide feedback summaries and insights to help evaluate event success and guide future planning."
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
