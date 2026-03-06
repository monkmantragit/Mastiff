'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, Globe, Laptop, Building, Hotel, Cast, Target, AppWindow, PlaySquare, GraduationCap, Briefcase, Handshake, Route, CalendarCheck, Lightbulb, UsersRound, ScreenShare, Sparkles, BookOpen, Presentation, Video, MessageSquare, Server, ChevronDown } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function VirtualHybridEventClient() {
    const { openPopup } = usePopup();
    const serviceImages = ServicesMediaService.getServicesImages();
    const defaultImage = serviceImages.hybridEvents || "/assets/images/placeholder.jpg";
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#2A3959]">
                    <Image
                        src={defaultImage}
                        alt="Virtual and Hybrid Events Management in Bangalore"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl"
                    >
                        {/* Main H1 Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display text-white mb-8 leading-[1.1] drop-shadow-2xl tracking-tight">
                            Virtual & Hybrid Corporate Event <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d]">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-5xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Remote work, distributed teams, and global stakeholders have transformed how businesses communicate. In Bangalore, India’s leading technology and innovation hub, companies require virtual and hybrid corporate events that deliver the same impact, professionalism, and engagement as in-person gatherings.
                            </p>
                            <p>
                                From corporate townhalls and leadership summits to product launches and training workshops, organizations in Bangalore need reliable digital event execution with zero technical compromise. White Massif pioneered hybrid event delivery in the city, creating seamless experiences that connect audiences in Whitefield boardrooms, Electronic City campuses, and international locations simultaneously.
                            </p>
                            <p>
                                Our virtual and hybrid corporate event solutions combine broadcast-grade production, secure streaming infrastructure, and interactive engagement tools, ensuring every participant, whether on-site or online, receives an equally immersive experience.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Service Overview Section */}
            <section id="core-services" className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2">
                            Complete Digital Event Solutions
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Core Service Overview
                        </h2>
                        <p className="text-md sm:text-xl text-gray-600 mb-6 max-w-5xl mx-auto font-light leading-relaxed drop-shadow-lg">
                            We provide comprehensive end-to-end virtual and hybrid event management services in Bangalore:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Platform Selection",
                                desc: "We recommend secure and scalable event platforms such as Zoom, Microsoft Teams, or customized virtual event applications based on your audience size, engagement requirements, confidentiality level, and content format."
                            },
                            {
                                icon: Cast,
                                title: "Professional Production Setup",
                                desc: "For hybrid events, we install complete on-site audiovisual infrastructure including multi-camera setups, wireless microphones, lighting systems, live switching consoles, and professional streaming encoders. For virtual-only events, we arrange studio-grade environments that ensure high-definition visuals, balanced audio, and brand-aligned backdrops."
                            },
                            {
                                icon: UsersRound,
                                title: "Content & Digital Engagement",
                                desc: "We manage virtual moderation, audience polls, live Q&A, chat monitoring, breakout rooms, and speaker transitions. Our team also trains presenters on virtual delivery techniques to maximize clarity, confidence, and audience connection."
                            },
                            {
                                icon: Server,
                                title: "Technical Support & Security",
                                desc: "We provide real-time technical assistance, redundant internet connections (fiber broadband plus 4G/LTE backup), password-protected sessions, waiting rooms, and compliance with corporate IT policies for sensitive meetings."
                            },
                            {
                                icon: PlaySquare,
                                title: "Recording & Post-Event Analytics",
                                desc: "Every session is recorded in broadcast quality. We deliver post-event highlight videos, attendance analytics, engagement reports, poll results, and Q&A logs to help measure impact and ROI."
                            }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-[#2A3959] hover:border-[#F9A625]/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <service.icon className="w-7 h-7 text-[#F9A625]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2A3959] mb-4 group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-[#2A3959] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                            The White Massif Advantage
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white mb-6">
                            Why Choose White Massif for Hybrid Events in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Broadcast-Grade Expertise",
                                desc: "Our production team handles the technical backbone so your leadership can focus on communication. For major hybrid conferences in Bangalore, we deploy redundant connectivity systems and professional-grade switching equipment to ensure near-zero downtime."
                            },
                            {
                                icon: Presentation,
                                title: "Executive Speaker Coaching",
                                desc: "Virtual speaking differs from stage presentation. We train executives and panelists on camera framing, microphone techniques, pacing, and digital audience engagement to enhance delivery quality."
                            },
                            {
                                icon: Laptop,
                                title: "Integrated Hybrid Design",
                                desc: "Hybrid is not an afterthought in our planning process. We design stage layouts optimized for camera angles, ensure seamless transitions between live and online segments, and align in-room and virtual engagement strategies from day one."
                            },
                            {
                                icon: Server,
                                title: "Data Privacy & Compliance",
                                desc: "We align with company IT security policies including URL whitelisting, NDAs, encrypted streaming links, and controlled attendee access for confidential corporate meetings."
                            },
                            {
                                icon: Building,
                                title: "Bangalore-Based Execution",
                                desc: "Whether streaming from corporate campuses in Manyata Tech Park, offices in Electronic City, or hotel venues in Whitefield, we bring complete production infrastructure directly to your location for seamless hybrid execution."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#F9A625]/50 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="w-14 h-14 bg-[#F9A625]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F9A625] transition-colors duration-300">
                                    <feature.icon className="w-7 h-7 text-[#F9A625] group-hover:text-[#2A3959] transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F9A625] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2">
                            Our Execution Approach
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6">
                            Our Process
                        </h2>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24">
                            {[
                                {
                                    num: "01",
                                    title: "Discovery & Strategy",
                                    icon: Lightbulb,
                                    desc: "We determine whether your event is fully virtual or hybrid, define audience size and geography, and align on format, time zones, engagement tools, and content structure."
                                },
                                {
                                    num: "02",
                                    title: "Experience Design",
                                    icon: AppWindow,
                                    desc: "We map the attendee journey for both physical and virtual participants. Technical planning includes bandwidth estimation, camera placement, lighting design, and interaction flow."
                                },
                                {
                                    num: "03",
                                    title: "Technical Planning & Setup",
                                    icon: Route,
                                    desc: "We create a detailed run-of-show document outlining timelines, cue points, and transitions. Firewall checks, latency testing, and connectivity validation are conducted in advance."
                                },
                                {
                                    num: "04",
                                    title: "Rehearsals & Dry Runs",
                                    icon: CalendarCheck,
                                    desc: "We conduct comprehensive rehearsals with speakers, whether presenting on stage or remotely, to test microphones, camera positioning, screen-sharing, and presentation timing."
                                },
                                {
                                    num: "05",
                                    title: "Live Event Management",
                                    icon: ScreenShare,
                                    desc: "An on-site production director manages camera switching and stage flow, while a virtual moderator oversees online engagement, Q&A sessions, and audience interaction."
                                },
                                {
                                    num: "06",
                                    title: "Post-Event Deliverables",
                                    icon: PlaySquare,
                                    desc: "We share recordings, edited highlight reels, interaction transcripts, engagement analytics, and structured feedback surveys for internal review."
                                }
                            ].map((phase, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="relative flex flex-col items-center text-center group"
                                >
                                    {/* Responsive Connecting Line */}
                                    {((idx + 1) % 3 !== 0) && (
                                        <div className="hidden md:block absolute top-[40px] left-[50%] w-full h-[2px] bg-gray-200 z-0" />
                                    )}

                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md border-2 border-transparent group-hover:border-[#F9A625] transition-all duration-300 relative z-10 group-hover:-translate-y-2">
                                        <span className="absolute -top-10 -right-10 text-[80px] leading-none font-display font-bold text-gray-400/50 -z-10 group-hover:text-[#F9A625] transition-colors pointer-events-none">
                                            {phase.num}
                                        </span>
                                        <phase.icon className="w-8 h-8 text-[#2A3959] group-hover:text-[#F9A625] transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2A3959] mb-4">
                                        {phase.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base px-2">
                                        {phase.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Events Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2">
                            Our Portfolio
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6">
                            Types of Virtual & Hybrid Corporate Events We Manage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: UsersRound,
                                title: "Hybrid Corporate Townhalls",
                                desc: "Leadership townhalls hosted at Bangalore headquarters and streamed to regional or international offices."
                            },
                            {
                                icon: BookOpen,
                                title: "Virtual Conferences & Webinars",
                                desc: "Fully digital summits with keynote speakers, breakout sessions, and panel discussions."
                            },
                            {
                                icon: GraduationCap,
                                title: "Online Training Workshops",
                                desc: "Interactive learning sessions with breakout groups and live facilitator engagement."
                            },
                            {
                                icon: ScreenShare,
                                title: "Product & Website Launches",
                                desc: "Global virtual demonstrations targeting clients, investors, and media audiences."
                            },
                            {
                                icon: Sparkles,
                                title: "Hybrid Awards & Leadership Summits",
                                desc: "In-person gala events with simultaneous professional live streaming for remote participants."
                            }
                        ].map((event, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#F9A625]/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                            >
                                {/* Subtle background fill on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F9A625]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F9A625]/10 transition-colors duration-300">
                                        <event.icon className="w-7 h-7 text-[#2A3959] group-hover:text-[#F9A625] transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2A3959] mb-3">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-light">
                                        {event.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Combined Industries and Venues Section */}
            <section className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Industries We Serve */}
                        <div>
                            <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2">
                                Tailored Understanding
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#2A3959] mb-8">
                                Industries We Serve
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Our virtual and hybrid event solutions support:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Laptop, title: "Technology Companies", desc: "For teams requiring secure and scalable remote collaboration." },
                                    { icon: BookOpen, title: "Educational Institutions", desc: "Hosting large-scale online conferences and digital symposiums." },
                                    { icon: Handshake, title: "Pharmaceutical Organizations", desc: "Engaging distributed sales networks with compliant streaming platforms." },
                                    { icon: Briefcase, title: "Retail and FMCG Brands", desc: "Conducting national or international leadership meetings efficiently." },
                                    { icon: Globe, title: "Global Enterprises", desc: "Seeking scalable and dynamic digital communication platforms across regions." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-[#F9A625]/10 rounded-xl flex items-center justify-center shrink-0 mr-4">
                                            <item.icon className="w-6 h-6 text-[#F9A625]" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#2A3959] mt-2.5">{item.title}</h4>
                                            {/* <p className="text-sm text-gray-600 mt-1">{item.desc}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Venues & Technical Expertise */}
                        <div>
                            <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2">
                                Local Expertise
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#2A3959] mb-8">
                                Venues & Technical Expertise in Bangalore
                            </h2>

                            <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6">
                                <p>
                                    Even for hybrid events, location and connectivity are critical. We frequently operate from corporate offices, hotel conference halls, and private studios across Bangalore.
                                </p>
                                <p>
                                    For large-scale hybrid events, we select venues with dedicated network lines and stable bandwidth infrastructure to ensure uninterrupted streaming quality and seamless interaction between on-site presenters and their remote audience.
                                </p>
                            </div>
                        </div>

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
                                q: "What is a hybrid corporate event?",
                                a: "A hybrid event combines in-person attendees and online participants into a single synchronized experience using professional audiovisual and streaming systems."
                            },
                            {
                                q: "How do you ensure there are no technical disruptions?",
                                a: "We use professional streaming encoders, dedicated high-speed internet connections, and backup mobile hotspots for redundancy."
                            },
                            {
                                q: "Can virtual attendees interact during the event?",
                                a: "Yes. We enable moderated Q&A sessions, real-time polls, chat discussions, and breakout rooms for active participation."
                            },
                            {
                                q: "Are hybrid events more expensive than physical events?",
                                a: "Hybrid events involve additional production costs, but savings on travel, accommodation, and large-scale catering often balance budgets. The extended audience reach and reusable content typically provide higher overall ROI."
                            },
                            {
                                q: "How do participants join the event?",
                                a: "Attendees receive a secure access link with simple login instructions. Our support team remains available for technical assistance if required."
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

            {/* Final CTA Section */}
            <section className="py-20 bg-[#2A3959] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                        Get Started
                    </Badge>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                        Transform your next corporate gathering in Bangalore into a seamless virtual or hybrid experience. Share your event requirements with White Massif, and we will demonstrate how our secure streaming, professional production, and engagement expertise can connect your audience, wherever they are.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => openPopup('Virtual & Hybrid Event Bangalore CTA')}
                            className="btn-primary px-8 py-6 text-base lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Discuss Your Digital Strategy
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
