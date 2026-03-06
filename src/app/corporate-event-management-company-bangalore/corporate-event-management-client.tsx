'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, MapPin, Target, Lightbulb, Cast, Users, BarChart, Compass, Video, ShieldCheck, Award, Building2, TrendingUp, Presentation, Cog, CheckCircle2, Briefcase, Users2, LineChart, Star, Rocket, Globe, Building, Landmark, Hotel, Key, ChevronDown } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function CorporateEventManagementClient() {
    const { openPopup } = usePopup();
    const serviceImages = ServicesMediaService.getServicesImages();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#2A3959]">
                    <Image
                        src={serviceImages.businessEvents}
                        alt="Corporate Event Management Company in Bangalore"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl"
                    >
                        {/* Main H1 Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-display text-white mb-8 leading-[1.1] drop-shadow-2xl tracking-tight">
                            Corporate Event Management Company <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d] lg:text-8xl">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-5xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Bangalore’s business districts, Whitefield, Electronic City, Manyata, and Outer Ring Road, house major tech giants and Fortune 500 offices. Meeting planner needs here go beyond décor; they demand strategic planning that aligns with corporate goals.
                            </p>
                            <p>
                                As an established Bangalore-based agency, White Massif delivers end-to-end corporate event solutions (strategy, design, and production) that create measurable impact. With 12+ years of experience and over 1,000 successful events, we understand local logistics (traffic, venue demand) and corporate compliance requirements.
                            </p>
                            <p>
                                If you’re searching for a corporate event partner in Bangalore, we offer the expertise and reliability to execute flawlessly.
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
                            Comprehensive Solutions
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Core Service Overview
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            We offer full-service corporate event management in Bangalore, covering events for 50 to 5,000 attendees including conferences, AGMs, leadership summits, and hybrid events.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Strategic Consulting",
                                desc: "Aligning event objectives with business goals (brand positioning, sales/partner engagement, or internal culture)."
                            },
                            {
                                icon: Lightbulb,
                                title: "Concept & Creative",
                                desc: "Tailored themes, agendas, and experiences that resonate with your audience and leave a lasting impression."
                            },
                            {
                                icon: MapPin,
                                title: "Venue & Vendor Management",
                                desc: "Sourcing and negotiation for the best locations (hotels, BIEC, local conference halls) and trusted vendors (catering, decor, AV)."
                            },
                            {
                                icon: Cast,
                                title: "Technical Production",
                                desc: "High-end AV, staging, lighting, and live streaming setups for conferences, galas, or hybrid town halls."
                            },
                            {
                                icon: Users,
                                title: "Logistics & On-Site Execution",
                                desc: "Registration, staffing, transportation coordination, rehearsal management, and on-the-day command."
                            },
                            {
                                icon: BarChart,
                                title: "Post-Event Analysis",
                                desc: "Data-driven reporting on attendance, engagement metrics, and ROI (surveys, feedback, follow-ups)."
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

                    <div className="mt-16 text-center">
                        <p className="inline-block px-8 py-4 bg-[#F9A625]/10 text-[#2A3959] rounded-2xl font-medium border border-[#F9A625]/20">
                            <span className="text-[#F9A625] mr-2">✦</span>
                            Our scope ensures nothing is missed and every detail supports your objectives.
                        </p>
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
                            Why Choose White Massif in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Compass,
                                title: "Local Expertise",
                                desc: "We know Bangalore corridors, for example, cross-campus broadcasts between Whitefield and Manyata, or managing rush-hour arrivals in Koramangala. Venues are chosen to minimize commute and maximize convenience for your audience."
                            },
                            {
                                icon: Video,
                                title: "Production-Driven Model",
                                desc: "Unlike a simple “decorator” approach, we invest in professional AV, multiple-camera live streams, LED walls, interpretation booths, and more for a polished corporate feel."
                            },
                            {
                                icon: ShieldCheck,
                                title: "End-to-End Accountability",
                                desc: "We act as your internal team with a single project lead overseeing all aspects (creative, technical, and operations). From budget approval to post-event analysis, responsibility never falls through the cracks."
                            },
                            {
                                icon: Award,
                                title: "Proven Track Record",
                                desc: "Founded in 2013, with 1,000+ events delivered. We hold ourselves to Fortune 500 standards (some clients are not publicized). Our leadership team, Prakarsh Vaswani in client relations and Vinay Kukreja in operations, brings decades of experience."
                            },
                            {
                                icon: Building2,
                                title: "Vendor & Venue Network",
                                desc: "Strong ties with Bangalore’s top hotels such as ITC Gardenia, Sheraton Grand Bangalore Hotel at Brigade Gateway, Conrad Bengaluru, and others ensure timely setups and preferential rates."
                            },
                            {
                                icon: TrendingUp,
                                title: "ROI & Engagement Focus",
                                desc: "Every element, from interactive polls to award ceremonies, is designed to drive your KPIs (brand lift, employee morale, and sales leads)."
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
                            How We Work
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-[#2A3959] mb-6">
                            Our Process
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            We follow a structured 4-phase process to ensure transparency and quality. Throughout the process, we use project management tools to track tasks, budgets, and approvals in real time.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gray-200" />

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    num: "01",
                                    title: "Discovery & Alignment",
                                    icon: Target,
                                    desc: "Workshop with your team to define objectives, audience personas, KPIs, brand guidelines, and compliance requirements. We finalize the high-level agenda and budget."
                                },
                                {
                                    num: "02",
                                    title: "Concept & Planning",
                                    icon: Presentation,
                                    desc: "We propose the theme and flow, shortlist venues (e.g., JW Marriott or local convention halls), finalize vendors and timelines, and develop detailed event storyboards."
                                },
                                {
                                    num: "03",
                                    title: "Production Build",
                                    icon: Cog,
                                    desc: "Technical logistics are meticulously planned. We conduct at least one rehearsal, finalize seating and registration plans, and create a detailed “run of show” schedule."
                                },
                                {
                                    num: "04",
                                    title: "Execution & Debrief",
                                    icon: CheckCircle2,
                                    desc: "An on-site command center manages the event day. Post-event, we compile attendance statistics, feedback surveys, and an ROI report to measure success."
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
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md border-2 border-transparent group-hover:border-[#F9A625] transition-all duration-300 relative z-10 group-hover:-translate-y-2">
                                        <span className="absolute -top-3 -right-3 text-4xl font-display font-bold text-gray-400 -z-10 group-hover:text-[#F9A625] transition-colors">
                                            {phase.num}
                                        </span>
                                        <phase.icon className="w-8 h-8 text-[#2A3959] group-hover:text-[#F9A625] transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2A3959] mb-4">
                                        {phase.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
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
                            Types of Events We Manage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Briefcase,
                                title: "Business Conferences & Conventions",
                                desc: "Industry forums and thought leadership summits at venues like Bangalore International Exhibition Centre or upscale hotels."
                            },
                            {
                                icon: Users2,
                                title: "All-Hands & Townhalls",
                                desc: "Large internal meetings (500–3000+ employees) for tech campuses on the Outer Ring Road or Whitefield."
                            },
                            {
                                icon: LineChart,
                                title: "Annual General Meetings (AGMs)",
                                desc: "Compliance-focused shareholder meetings with live-streaming for remote investors."
                            },
                            {
                                icon: Star,
                                title: "Leadership/Board Summits",
                                desc: "High-security offsites for CXOs, often at premium venues like The Leela Palace Bengaluru."
                            },
                            {
                                icon: Rocket,
                                title: "Product Launches & Brand Events",
                                desc: "Hosted in prime locations such as UB City or Whitefield with media and press integration."
                            },
                            {
                                icon: Globe,
                                title: "Hybrid/Virtual Events",
                                desc: "Tech-enabled conferences blending on-site audiences with global webcasts."
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
                                We bring specialized knowledge to diverse sectors including IT, SaaS, FinTech, Pharma, Manufacturing, Real Estate, Startups, Government, and PSU.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: ShieldCheck, title: "Pharma Compliance", desc: "Adhering to strict regulatory frameworks." },
                                    { icon: Building2, title: "ITIPCA Standards", desc: "Meeting global technology industry requirements." },
                                    { icon: Landmark, title: "Government Protocols", desc: "Executing compliant and protocol-driven events." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-[#F9A625]/10 rounded-xl flex items-center justify-center shrink-0 mr-4">
                                            <item.icon className="w-6 h-6 text-[#F9A625]" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#2A3959]">{item.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Venue & Local Expertise */}
                        <div>
                            <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2">
                                Premium Locations
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#2A3959] mb-8">
                                Venue & Local Expertise
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Bangalore&apos;s best venues are well known to us. We advise on arrival logistics (e.g., avoiding airport corridor traffic) and rehearsal spaces as needed.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Users,
                                        title: "Convention Scale",
                                        desc: "Bangalore International Exhibition Centre (host of the Bengaluru Tech Summit) and KTPO (Whitefield) for 1,000+ attendees."
                                    },
                                    {
                                        icon: Hotel,
                                        title: "Executive Hotels",
                                        desc: "JW Marriott Hotel Bengaluru, Conrad Bengaluru, The Leela Palace Bengaluru, ITC Gardenia, and Taj West End, offering ballrooms and breakout rooms."
                                    },
                                    {
                                        icon: Building,
                                        title: "Whitefield East",
                                        desc: "Sheraton Grand Bangalore Hotel at Brigade Gateway, perfect for tech industry client events."
                                    },
                                    {
                                        icon: Key,
                                        title: "Heritage & Boutique",
                                        desc: "For a unique ambiance, we recommend venues such as Bangalore Palace or exclusive boutique ballrooms."
                                    }
                                ].map((venue, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative pl-8 border-l-2 border-gray-200 hover:border-[#F9A625] transition-colors duration-300"
                                    >
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#F9A625] transition-colors duration-300" />
                                        <h4 className="text-lg font-bold text-[#2A3959] mb-2 flex items-center">
                                            <venue.icon className="w-5 h-5 mr-2 text-[#F9A625]" />
                                            {venue.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {venue.desc}
                                        </p>
                                    </motion.div>
                                ))}
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
                                q: "How much does a corporate event cost?",
                                a: "Pricing depends on scale (venue, AV, and guest count). Budgets range from ₹5–20L for mid-size events to ₹50L+ for large summits. We provide detailed quotes after understanding your requirements."
                            },
                            {
                                q: "Do you handle large conferences (1,000+ attendees)?",
                                a: "Yes. We have managed conferences of up to 5,000 attendees, coordinating multiple halls and live-streaming to overflow rooms."
                            },
                            {
                                q: "Can you run hybrid/virtual town halls?",
                                a: "Absolutely. We execute secure hybrid setups with high-quality streaming (using approved platforms) so remote employees can fully participate."
                            },
                            {
                                q: "What lead time is needed?",
                                a: "For medium events, plan 6–8 weeks. For large-scale conferences or peak season (October–December), 3–4 months is advisable to secure venues and production teams."
                            },
                            {
                                q: "Can you ensure ROI is measured?",
                                a: "Yes. We define success metrics (engagement scores, survey feedback, and business outcomes) during planning and report on them post-event."
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
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-6 leading-tight">
                        Ready to elevate your next corporate event in Bangalore?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                        Contact White Massif with your tentative date, audience size, and goals. Our team will craft a proposal with venue options, creative concepts, and a transparent execution plan to make your event a measurable success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => openPopup('bangalore-event-cta')}
                            className="btn-primary px-8 py-6 text-base lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Contact Our Planners
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
