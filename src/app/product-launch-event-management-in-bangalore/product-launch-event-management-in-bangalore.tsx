'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, MapPin, Target, Lightbulb, Cast, Users, BarChart, Compass, Video, ShieldCheck, Award, Building2, TrendingUp, Presentation, Cog, CheckCircle2, Briefcase, Users2, LineChart, Star, Rocket, Globe, Building, Landmark, Hotel, Key, ChevronDown, Mic2, MonitorSpeaker, UserPlus, BookOpen, Zap, Megaphone, Search, Palette, Handshake, Settings, FileText, Sparkles, Laptop, HeartPulse, Factory, GlassWater, Monitor, Maximize } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function ProductLaunchEvent() {
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
                            Product Launch Event Management <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d]">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Launching a new product or service in Bangalore’s innovation hub demands precision and flair. Whether unveiling a SaaS platform in Whitefield or a consumer gadget in the CBD, your launch must generate buzz and brand credibility.
                            </p>
                            <p>
                                White Massif specializes in Bangalore product launch events that blend creative storytelling with flawless execution. From concept to completion, we ensure your launch resonates with stakeholders, customers, press, investors, and aligns with your broader corporate objectives.
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
                            Our end-to-end product launch event services in Bangalore include:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Launch Strategy",
                                desc: "Positioning and messaging workshops to define your launch narrative and unique selling propositions."
                            },
                            {
                                icon: Lightbulb,
                                title: "Creative Concept",
                                desc: "Thematic design (stage, graphics, live demos, AR/VR integrations) to showcase your product vision with impact."
                            },
                            {
                                icon: Mic2,
                                title: "Rehearsal Production",
                                desc: "Scripted show flows, stage cues (including dramatic reveal mechanics), and speaker coaching to ensure confident presentations."
                            },
                            {
                                icon: MonitorSpeaker,
                                title: "AV & Stage Production",
                                desc: "Custom-built stages with live demo areas, high-impact lighting, product unveiling effects (LED curtains, confetti drops, kinetic screens), and multi-camera live streaming for media coverage."
                            },
                            {
                                icon: MapPin,
                                title: "Venue Management",
                                desc: "Selection of suitable venues, premium malls, tech parks, and hotel ballrooms, along with complete liaison for permissions and logistics."
                            },
                            {
                                icon: UserPlus,
                                title: "Guest Journey Design",
                                desc: "Invitation creatives, digital registrations (via event platforms/apps), VIP management, hospitality arrangements (catering, transport, concierge support)."
                            },
                            {
                                icon: Globe,
                                title: "Hybrid Integration",
                                desc: "Live streaming to global audiences with interactive Q&A tools and engagement features for extended reach."
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
                            Why Choose White Massif for Launches in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: BookOpen,
                                title: "Creative Storytelling Focus",
                                desc: "We design launches around powerful narratives. For example, at a recent Bangalore launch, we used immersive 3D projection mapping to animate a product journey, reinforcing the brand’s innovation story."
                            },
                            {
                                icon: Zap,
                                title: "Tech-First Execution",
                                desc: "Our AV capabilities include 4K LED walls, event apps, live polling systems, and simultaneous interpretation equipment, ensuring your launch looks modern and future-ready."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Checks & Balances",
                                desc: "Launch timelines are unforgiving. We conduct dual-stream rehearsals (presenter run-throughs and technical crew drills) to eliminate last-minute glitches. We also anticipate risks, such as arranging backup power solutions for CBD venues."
                            },
                            {
                                icon: Megaphone,
                                title: "Media Coordination Expertise",
                                desc: "We understand Bangalore’s media ecosystem. Our team prepares press kits, manages interview zones on event day, and supports PR integration to maximize coverage."
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
                                    desc: "We understand your product’s USPs, target audience (B2B clients vs. consumer press), and success metrics such as media mentions, demo participation, or qualified leads."
                                },
                                {
                                    num: "02",
                                    title: "Concept Design",
                                    icon: Palette,
                                    desc: "We propose event themes (e.g., “Innovation Unveiled”), stage layouts, reveal moments, teaser elements, and a structured launch program (including CEO keynote or product unveiling ceremony)."
                                },
                                {
                                    num: "03",
                                    title: "Vendor & Venue Sourcing",
                                    icon: Handshake,
                                    desc: "We book specialized vendors (AR/VR developers, celebrity emcees, experiential booths) and secure ideal venues such as UB City showrooms, Phoenix Marketcity Bengaluru, or premium hotels with demo-ready facilities."
                                },
                                {
                                    num: "04",
                                    title: "Rehearsal & Technical Run",
                                    icon: Settings,
                                    desc: "A full-dress rehearsal is conducted with presenters and technical operators. Lighting cues, sound checks, live demo trials, and streaming tests are finalized."
                                },
                                {
                                    num: "05",
                                    title: "Launch Day Execution",
                                    icon: Rocket,
                                    desc: "An on-site show director manages real-time cue calling, technical transitions, media movement, and social streaming coordination."
                                },
                                {
                                    num: "06",
                                    title: "Post-Event Deliverables",
                                    icon: FileText,
                                    desc: "We provide highlight videos, professional photographs, attendance data, engagement analytics, and post-event insights (including app usage and lead metrics)."
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
                            Types of Events We Manage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Rocket,
                                title: "Product Launches (B2B SaaS & Hardware)",
                                desc: "Typically hosted at tech parks like Manyata or premium venues such as ITC Gardenia with immersive product demos."
                            },
                            {
                                icon: Sparkles,
                                title: "Brand Launches",
                                desc: "Consumer brand unveilings often take place at lifestyle venues like Orion Mall or UB City, incorporating influencer activations and photo opportunities."
                            },
                            {
                                icon: Building2,
                                title: "Facility & Office Inaugurations",
                                desc: "We manage ribbon-cutting ceremonies, walkthrough tours, and dignitary hosting when companies open new Bangalore offices or manufacturing plants."
                            },
                            {
                                icon: Handshake,
                                title: "Joint Launches & Strategic Announcements",
                                desc: "Complex events involving joint ventures or multi-brand reveals requiring simultaneous sessions and multi-stakeholder coordination."
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
                                We operate across industries, with deep experience in
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Laptop, title: "IT & Software", desc: "Large-scale tech demos and developer-focused showcases." },
                                    { icon: Landmark, title: "FinTech", desc: "Secure product demonstrations and compliance-sensitive launches." },
                                    { icon: HeartPulse, title: "Healthcare", desc: "Medical device trials and regulated launch environments requiring precision." },
                                    { icon: Factory, title: "Manufacturing", desc: "Plant inaugurations and high-level dignitary-led unveilings." },
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
                                Selecting the right Bangalore venue depends on audience profile, scale, and brand positioning.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: GlassWater,
                                        title: "Luxury Press Galas",
                                        desc: "JW Marriott Hotel Bengaluru or The Leela Palace Bengaluru for high-end media events."
                                    },
                                    {
                                        icon: Monitor,
                                        title: "Software Launches",
                                        desc: "ITPL tech park auditoriums for controlled demo environments."
                                    },
                                    {
                                        icon: Maximize,
                                        title: "Large-Scale Unveilings",
                                        desc: "Convention spaces in Electronic City for expansive stage builds."
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
                                We also evaluate venues based on Wi-Fi robustness for livestreaming, parking availability, access for outstation media (Mumbai/Bangalore routes), and on-ground technical support.
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
                                q: "How much lead time is needed?",
                                a: "Plan 8–12 weeks for a fully branded launch with custom stage builds and immersive production. Simpler reveal formats can be executed in shorter timelines."
                            },
                            {
                                q: "Can you manage launches for startups?",
                                a: "Yes. We scale creativity and production to suit startup budgets, particularly within Bangalore’s incubator and co-working ecosystems."
                            },
                            {
                                q: "Do you coordinate product demonstrations?",
                                a: "Absolutely. We set up demo kiosks, technical troubleshooting teams, and interactive product experience zones."
                            },
                            {
                                q: "Are hybrid launches possible?",
                                a: "Yes. We livestream launches so remote teams or investors (Mumbai, US, or global offices) can watch live, with translated or multi-language feeds if required."
                            },
                            {
                                q: "What’s included in a launch package?",
                                a: "Typically: concept development, creative design, audiovisual production, logistics management, and on-ground execution. Every proposal is customized to your launch objectives."
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
                        Launch your product with maximum impact in Bangalore. Share your tentative launch date, expected guest profile, and business goals (market reach, investor engagement, brand awareness), and we’ll present a creative vision and execution roadmap that ensures your debut is unforgettable, and results-driven.
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
