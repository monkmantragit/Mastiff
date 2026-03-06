'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, MapPin, Briefcase, Rocket, Presentation, Map, Video, Award, Building2, Star, LineChart, Key, Hotel, Compass, Landmark, CheckCircle2, Search, Palette, Handshake, CalendarCheck, Zap, FileText, ChevronDown } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function BangaloreClient() {
    const { openPopup } = usePopup();
    const serviceImages = ServicesMediaService.getServicesImages();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#2A3959]">
                    <Image
                        src={serviceImages.businessEvents}
                        alt="Bangalore's Premier Corporate Event Management"
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
                        className="max-w-4xl"
                    >


                        {/* Main H1 Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display text-white mb-8 leading-[1.1] drop-shadow-2xl tracking-tight">
                            Bangalore&apos;s Premier <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d]">Corporate Event Management</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Bangalore (Bengaluru) is India&apos;s Silicon Valley and a hub of innovation. Local companies need event management that <strong className="font-medium text-white">delivers on business goals.</strong>
                            </p>
                            <p>
                                At White Massif, we are Bangalore-based event experts (est. 2013) with 12+ years of experience and over 1,000 successful events across India. We offer end-to-end corporate event solutions in Bangalore &ndash; from initial strategy to on-site execution.
                            </p>
                            <p>
                                Our clients include tech giants, financial firms, and leading startups. Browse our services below and see why Bangalore organizations trust us to make their events shine.
                            </p>
                        </div>


                    </motion.div>
                </div>


            </section>

            {/* Our Bangalore Services Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2">
                            What We Do
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Our Bangalore Services
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Briefcase,
                                title: "Corporate Event Management",
                                desc: "Full-service planning for conferences, all-hands, and corporate meetings.",
                                link: "/corporate-event-management-company-bangalore"
                            },
                            {
                                icon: Rocket,
                                title: "Product Launch Management",
                                desc: "High-impact product and brand launches in Bangalore.",
                                link: "/product-launch-event-management-in-bangalore"
                            },
                            {
                                icon: Presentation,
                                title: "Conferences & Summits",
                                desc: "Large-scale conferences and summits (B2B, dealer meets).",
                                link: "/conference-and-summit-management-in-bangalore"
                            },
                            {
                                icon: Map,
                                title: "MICE Events",
                                desc: "Meetings, Incentives, Conferences & Exhibitions – comprehensive MICE programs.",
                                link: "/mice-event-management-in-bangalore"
                            },
                            {
                                icon: Video,
                                title: "Virtual & Hybrid Events",
                                desc: "Professional live and online event production.",
                                link: "/virtual-and-hybrid-events-in-bangalore"
                            },
                            {
                                icon: Award,
                                title: "Annual Day & Awards Nights",
                                desc: "Employee awards, annual celebrations and gala events.",
                                link: "/annual-day-and-award-event-management-bangalore"
                            }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                            >
                                <div className="w-14 h-14 bg-[#2A3959]/5 rounded-2xl flex items-center justify-center mb-6 shadow-none group-hover:bg-[#F9A625] transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-[#2A3959] group-hover:text-white transition-colors duration-300" />
                                </div>

                                <h3 className="text-2xl font-display font-medium text-[#2A3959] mb-4 group-hover:text-[#F9A625] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed font-light mb-8 flex-grow">
                                    {service.desc}
                                </p>

                                <Link
                                    href={service.link}
                                    className="inline-flex items-center text-[#2A3959] font-medium hover:text-[#F9A625] transition-colors mt-auto group/link"
                                >
                                    Learn more
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>

                                {/* Decorative hover effect */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#F9A625] to-[#fcd34d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[2rem]"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose White Massif in Bangalore Section */}
            <section className="py-24 bg-[#FAF9F6] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2">
                            Our Advantage
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Why Choose White Massif in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: "Local Bangalore Expertise",
                                desc: "We know Bangalore corridors (Manyata, Whitefield, ORR, Koramangala, MG Road) and venues like BIEC (Tumkur Road), KTPO (Whitefield), JW Marriott, ITC Gardenia, Leela Palace, etc. We select locations to minimize travel issues and match your brand."
                            },
                            {
                                icon: Briefcase,
                                title: "End-to-End Partner",
                                desc: "We handle every step – strategic planning, creative design, venue sourcing, production, staffing, and post-event ROI reporting. You get one cohesive plan and clear accountability."
                            },
                            {
                                icon: Building2,
                                title: "Enterprise-Grade Delivery",
                                desc: "Since 2013, White Massif has delivered 1000+ events. Our leadership team (with 15+ years’ experience) ensures Fortune-500 quality controls (budgets, timelines, risk management)."
                            },
                            {
                                icon: Star,
                                title: "Premium Production",
                                desc: "We invest in top AV and staging. For example, JW Marriott Bengaluru can host up to 1,500 guests on its outdoor lawn with full AV infrastructure – we leverage such venues for maximum impact."
                            },
                            {
                                icon: LineChart,
                                title: "Proven Results",
                                desc: "Clients trust us for our reliability and focus on ROI. We include engagement metrics and success reports."
                            },
                            {
                                icon: Key,
                                title: "Transparent & Flexible",
                                desc: "We build detailed budgets and timelines with room for adjustments. Our in-house creative and logistics teams allow quick turnarounds and value."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#F9A625]/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F9A625]/5 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="w-16 h-16 bg-[#2A3959]/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-[#F9A625] transition-colors duration-300">
                                    <feature.icon className="w-8 h-8 text-[#2A3959] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-display font-medium text-[#2A3959] mb-4 group-hover:text-[#F9A625] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split Section: Process & Venues */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left Column: Our Process */}
                        <div>
                            <div className="mb-10">
                                <Badge className="mb-4 bg-gray-100 text-gray-600 border-none px-4 py-1.5 font-medium hover:bg-gray-200 transition-colors">
                                    Tailored Understanding
                                </Badge>
                                <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-4 font-bold tracking-tight">
                                    Our Process
                                </h2>
                                <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                                    Every Bangalore event is aligned to clear business outcomes from day one, ensuring a seamless journey from concept to execution.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Strategic Discovery",
                                        desc: "We begin with a focused consultation to understand your objectives, target audience, budget, timelines, and desired ROI.",
                                        icon: Search
                                    },
                                    {
                                        title: "Concept & Experience Design",
                                        desc: "Our team develops the event theme, agenda flow, engagement strategy, and production blueprint, tailored to your audience.",
                                        icon: Palette
                                    },
                                    {
                                        title: "Venue & Vendor Coordination",
                                        desc: "We finalize Bangalore venues, production partners, AV teams, and logistics vendors under a single, structured execution plan.",
                                        icon: Handshake
                                    },
                                    {
                                        title: "Pre-Event Planning",
                                        desc: "We manage registrations, speaker coordination, rehearsals, compliance checks, and contingency planning to eliminate last-minute risks.",
                                        icon: CalendarCheck
                                    },
                                    {
                                        title: "On-Ground Execution",
                                        desc: "Our command team oversees stage management, technical supervision, guest flow, and real-time troubleshooting for seamless delivery.",
                                        icon: Zap
                                    },
                                    {
                                        title: "Post-Event Reporting",
                                        desc: "We provide attendance metrics, engagement insights, and budget reconciliation to measure performance and ROI.",
                                        icon: FileText
                                    }
                                ].map((process, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex gap-5 items-start hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                            <process.icon className="w-6 h-6 text-[#F9A625]" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg sm:text-lg font-bold text-[#2A3959] mb-1">{process.title}</h4>
                                            <p className="text-sm sm:text-sm text-gray-500 leading-relaxed font-light">
                                                {process.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Venue & Logistics */}
                        <div className="mt-16 lg:mt-0">
                            <div className="mb-12">
                                <Badge className="mb-4 bg-[#F9A625]/10 text-[#e0921a] border-[#F9A625]/20 px-4 py-1.5 font-medium hover:bg-[#F9A625]/20 transition-colors">
                                    Premium Locations
                                </Badge>
                                <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-4 font-bold tracking-tight">
                                    Venue &amp; Local Expertise
                                </h2>
                                <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                                    Bangalore&apos;s best venues are well known to us. We advise on arrival logistics, avoiding traffic corridors, and rehearsals as needed.
                                </p>
                            </div>

                            <div className="pl-6 border-l-2 border-gray-100 space-y-10 py-2">
                                {[
                                    {
                                        title: "Convention Scale",
                                        desc: "Bangalore International Exhibition Centre (host of the Bengaluru Tech Summit) and KTPO (Whitefield) for 1,000+ attendees.",
                                        icon: Map
                                    },
                                    {
                                        title: "Executive Hotels",
                                        desc: "JW Marriott Hotel Bengaluru, Conrad Bengaluru, The Leela Palace Bengaluru, ITC Gardenia, and Taj West End, offering ballrooms and breakout rooms.",
                                        icon: Hotel
                                    },
                                    {
                                        title: "Whitefield East",
                                        desc: "Sheraton Grand Bangalore Hotel at Brigade Gateway, perfect for tech industry client events.",
                                        icon: Building2
                                    },
                                    {
                                        title: "Heritage & Boutique",
                                        desc: "For a unique ambiance, we recommend venues such as Bangalore Palace or exclusive boutique ballrooms.",
                                        icon: Landmark
                                    },
                                    {
                                        title: "Resorts & Offsites",
                                        desc: "Nandi Hills resorts, coastal-themed venues near Bangalore for retreats.",
                                        icon: Compass
                                    }
                                ].map((venue, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 }}
                                        className="relative"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[32px] sm:-left-[33px] top-1 w-[14px] h-[14px] bg-white border-[2.5px] border-gray-200 rounded-full"></div>

                                        <div className="flex items-center gap-3 mb-2">
                                            <venue.icon className="w-5 h-5 text-[#F9A625]" />
                                            <h4 className="text-lg sm:text-xl font-bold text-[#2A3959]">{venue.title}</h4>
                                        </div>
                                        <p className="text-sm sm:text-sm text-gray-500 leading-relaxed pl-8 font-light">
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
                                q: "How much lead time is needed to plan a Bangalore event?",
                                a: "Typically 8–12 weeks. For large conferences or holiday periods, we suggest 4–6 months."
                            },
                            {
                                q: "Can you handle city permits and local requirements?",
                                a: "Yes. We coordinate with local authorities (e.g. traffic police for road shows, noise permits) and venue management as needed."
                            },
                            {
                                q: "Do you provide audio-visual equipment?",
                                a: "Absolutely. We supply professional sound systems, lighting rigs, LED screens, interpretation equipment, and streaming platforms for hybrid events."
                            },
                            {
                                q: "Is there a local White Massif manager?",
                                a: "Yes. Every Bangalore event has a dedicated Project Lead from our local team, backed by specialists in production and design."
                            },
                            {
                                q: "What does a proposal include?",
                                a: "Our proposal outlines concept ideas, budget estimates (venue, AV, staffing, etc.), a draft schedule, and projected outcomes. It’s usually delivered within 3 business days of briefing."
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
