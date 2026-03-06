'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, MapPin, Target, Smartphone, MonitorSpeaker, Mic2, Hotel, Globe, Briefcase, Settings, Zap, Award, ShieldCheck, Search, Handshake, UserPlus, FileText, Users, Star, HeartPulse, Users2, Laptop, Landmark, BookOpen, Maximize, Monitor, ChevronDown, Store, Clock, LayoutDashboard, Timer, Video, Building, SlidersHorizontal, Rocket, BarChart, Calendar, GraduationCap, Cpu, Wallet, Stethoscope, Factory, Map } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function ConferenceSummitClient() {
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
                        alt="Conference and Summit Management in Bangalore"
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
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-display text-white mb-8 leading-[1.1] drop-shadow-2xl tracking-tight">
                            Conference & Summit Event Management <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d] lg:text-8xl">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Bangalore hosts numerous high-profile conferences, tech summits, vendor meets, leadership offsites, and global partner forums. Organizers here expect more than just venue booking; they require strategic conference production capable of managing multi-day agendas, parallel sessions, sponsors, and diverse delegate profiles.
                            </p>
                            <p>
                                White Massif specializes in end-to-end conference and summit management for Bangalore-based organizations. We ensure sessions run on time, sponsors gain visibility, speakers are well-supported, and attendees experience seamless engagement from registration to closing remarks.
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
                            Our comprehensive conference management services include:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Program Design",
                                desc: "Strategic agenda planning with keynotes, breakout tracks, fireside chats, and panel discussions to maximize knowledge flow and engagement."
                            },
                            {
                                icon: Map,
                                title: "Venue Logistics",
                                desc: "Ballroom allocations, seating layouts (theatre, classroom, round-table), signage systems, registration counters, meal flow management, and attendee navigation planning."
                            },
                            {
                                icon: MonitorSpeaker,
                                title: "Audio/Visual Production",
                                desc: "Professional stage setups, advanced sound systems, simultaneous interpretation booths, LED walls, confidence monitors, and multi-screen projection for impactful delivery."
                            },
                            {
                                icon: Mic2,
                                title: "Speaker Management",
                                desc: "Travel coordination, speaker rehearsals, bio collation, presentation management, and backstage cueing."
                            },
                            {
                                icon: Smartphone,
                                title: "Technology Integration",
                                desc: "Audience response systems, live polling tools, event apps, QR-based registrations, live streaming, and session recordings for multi-city or global participation."
                            },
                            {
                                icon: Store,
                                title: "Sponsorship & Exhibition Management",
                                desc: "Booth planning, sponsor branding placements, exhibition floor coordination, and on-site sponsor fulfillment."
                            },
                            {
                                icon: Clock,
                                title: "On-Site Coordination",
                                desc: "Real-time announcements, session tracking, timekeeping, A/V troubleshooting, and crowd movement management."
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
                            Why Choose White Massif for Bangalore Conferences
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: LayoutDashboard,
                                title: "Multi-Room Expertise",
                                desc: "We manage multi-track events with 10+ parallel sessions, ensuring seamless transitions between plenaries and breakout rooms. For example, we’ve executed large-scale tech summits at Bangalore International Exhibition Centre for over 2,000 attendees."
                            },
                            {
                                icon: Timer,
                                title: "Timekeeping Discipline",
                                desc: "We prioritize strict schedule adherence. Speakers receive cue cards, backstage countdown timers are deployed, and room managers ensure no session overruns disrupt the agenda."
                            },
                            {
                                icon: Video,
                                title: "High-End Production Standards",
                                desc: "From digital mixing consoles and robotic cameras to interpretation booths and simultaneous streaming setups, our production quality meets Fortune 500 conference standards. Our team is well-versed with the technical specifications of major Bangalore convention venues."
                            },
                            {
                                icon: Star,
                                title: "Enhanced Delegate Experience",
                                desc: "We streamline the delegate journey, QR badge check-ins, guided signage, curated networking zones, and structured sponsor interactions, so attendees focus on content rather than logistics."
                            },
                            {
                                icon: MapPin,
                                title: "Local Venue Insight",
                                desc: "We recommend venues strategically, airport-side hotels for pharma regulators, Whitefield venues for IT audiences, or central business district hotels for finance forums."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Full Accountability",
                                desc: "Each conference is led by a dedicated Conference Director. Stakeholders receive detailed run-of-show documents, escalation matrices, and 24/7 emergency contacts during event days."
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
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24">
                            {[
                                {
                                    num: "01",
                                    title: "Discovery",
                                    icon: Search,
                                    desc: "Define conference objectives (lead generation, knowledge exchange, brand positioning), audience size, agenda structure, sponsor requirements, and budget parameters."
                                },
                                {
                                    num: "02",
                                    title: "Planning & Venue Finalization",
                                    icon: Building,
                                    desc: "Shortlist suitable Bangalore venues, for example, Sheraton Grand Bangalore Hotel at Brigade Gateway for large IT gatherings or Taj Yeshwantpur Bengaluru for financial and leadership forums, and finalize hall allocations and breakout room layouts."
                                },
                                {
                                    num: "03",
                                    title: "Vendor Coordination",
                                    icon: Users,
                                    desc: "Engage A/V teams, stage designers, exhibition fabricators, caterers, and IT support providers. We work closely with hotel event managers for seamless alignment."
                                },
                                {
                                    num: "04",
                                    title: "Technical Rehearsals",
                                    icon: SlidersHorizontal,
                                    desc: "Conduct full run-throughs for keynote sessions, sound checks for panel discussions, lighting transitions, and rehearsals for opening and closing ceremonies."
                                },
                                {
                                    num: "05",
                                    title: "Execution",
                                    icon: Rocket,
                                    desc: "On-ground management of registrations, signage, speaker coordination, sponsor zones, and session timing, handled by an experienced operations team."
                                },
                                {
                                    num: "06",
                                    title: "Post-Event Reporting",
                                    icon: BarChart,
                                    desc: "Detailed debrief including attendance per session, poll analytics, feedback surveys, sponsor performance insights, and recommendations for future improvements."
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
                            Types of Conferences & Summits We Manage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Calendar,
                                title: "Annual Conferences & Conventions",
                                desc: "Single or multi-day events (100–2,000+ delegates) with structured plenaries and breakout sessions."
                            },
                            {
                                icon: Landmark,
                                title: "Industry Summits",
                                desc: "Cross-company knowledge forums (e.g., fintech or SaaS summits in Bangalore) often requiring interpretation booths or restricted-access sessions."
                            },
                            {
                                icon: Handshake,
                                title: "Dealer & Partner Conferences",
                                desc: "Sales conferences and reseller meets combining keynote addresses with product showcases and networking sessions."
                            },
                            {
                                icon: GraduationCap,
                                title: "Training Programs & Workshops",
                                desc: "Educational programs with breakout rooms and hands-on labs hosted in hotels with training infrastructure."
                            },
                            {
                                icon: Globe,
                                title: "Hybrid Conferences",
                                desc: "Integrated in-person and virtual experiences with real-time streaming for global headquarters and remote teams."
                            },
                            {
                                icon: Award,
                                title: "Conference + Awards Galas",
                                desc: "When conferences conclude with recognition ceremonies, we manage entertainment segments, stage production, and award presentations."
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
                                We manage conferences across sectors, with strong expertise in:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Cpu, title: "Technology & ITES", desc: "Bangalore’s thriving tech ecosystem demands high-bandwidth setups for live demos and developer sessions." },
                                    { icon: Globe, title: "Global Capability Centers (GCCs)", desc: "Multi-location hybrid conferences requiring seamless global connectivity." },
                                    { icon: Wallet, title: "Financial Services", desc: "Compliance-focused forums with secure access and controlled participation." },
                                    { icon: Stethoscope, title: "Pharmaceuticals", desc: "Regulated events requiring documentation protocols and ethical compliance standards." },
                                    { icon: Factory, title: "Manufacturing", desc: "Dealer conventions and industrial leadership summits." },
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
                                Bangalore offers world-class conference venues, including:
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Maximize,
                                        title: "Large-Scale Convention Venues",
                                        desc: "Bangalore International Exhibition Centre (Tumkur Road), known for hosting major expos and the Bengaluru Tech Summit. KTPO (Whitefield), suitable for tech-focused exhibitions and summits."
                                    },
                                    {
                                        icon: Hotel,
                                        title: "Five-Star Hotels",
                                        desc: "Sheraton Grand Bangalore Hotel at Brigade Gateway, Conrad Bengaluru, and ITC Gardenia, ideal for conferences requiring accommodation and breakout facilities under one roof."
                                    },
                                    {
                                        icon: Monitor,
                                        title: "Innovation & Tech Park Venues",
                                        desc: "Auditoriums within Manyata Tech Park and central corridor hotels such as The Lalit Ashok for accessibility and convenience."
                                    },
                                    {
                                        icon: Monitor,
                                        title: "Resorts & Offsite Locations",
                                        desc: "For leadership retreats or multi-day workshops outside city limits, we recommend premium resorts with integrated meeting infrastructure."
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
                            <p className="text-lg text-gray-600 leading-relaxed mt-8">
                                We also assess bandwidth reliability, parking capacity, accessibility for outstation delegates, and exhibition space availability before recommending venues.
                            </p>
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
                                q: "How far in advance should I plan a conference?",
                                a: " For 500+ delegates, begin planning at least 3–4 months in advance. Large conventions or multi-day summits may require 6+ months for venue and sponsor alignment."
                            },
                            {
                                q: "Do you handle delegate registration systems?",
                                a: "Yes. We set up online registration portals, QR-based on-site check-in systems, badge printing stations, and self-service kiosks."
                            },
                            {
                                q: "Can you coordinate international delegations?",
                                a: "Yes. We collaborate with travel partners and DMCs to support visas, airport transfers, hotel bookings, and protocol management."
                            },
                            {
                                q: "What technology capabilities do you provide?",
                                a: "Professional A/V systems, live polling apps, interpretation equipment, Wi-Fi optimization, recording services, and secure streaming solutions."
                            },
                            {
                                q: "Is on-site support included?",
                                a: "Absolutely. Our team manages the event floor throughout the conference duration, often operating a centralized control room for multi-day events."
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
                        Planning a conference or summit in Bangalore? Share your objectives, audience profile, preferred dates, and budget range. Our team will handle venue selection, agenda structuring, sponsor coordination, and flawless execution, so you can focus on delivering impactful content while we manage the logistics.
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
