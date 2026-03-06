'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, MapPin, Target, Smartphone, MonitorSpeaker, Mic2, Hotel, Globe, Briefcase, Settings, Zap, Award, ShieldCheck, Search, Handshake, UserPlus, FileText, Users, Star, HeartPulse, Users2, Laptop, Landmark, BookOpen, Maximize, Monitor, ChevronDown, Store, Clock, LayoutDashboard, Timer, Video, Building, SlidersHorizontal, Rocket, BarChart, Calendar, GraduationCap, Cpu, Wallet, Stethoscope, Factory, Map, Plane, Compass, Presentation, Tent, Truck, MessagesSquare, Route, BarChartBig, Link, Sparkles, ShieldAlert, Telescope, PenTool, Cog, PieChart, Gift, MonitorPlay, FlaskConical, ShoppingCart, GlassWater, Trees } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function MiceEventClient() {
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
                        alt="MICE Event Management in Bangalore"
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
                            MICE Event Management <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d]">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                MICE, Meetings, Incentives, Conferences, and Exhibitions, represents high-value corporate programs that often span multiple days, venues, and stakeholder groups. In Bangalore, India’s leading technology and innovation hub, companies frequently organize MICE programs to motivate employees, engage partners, and host large-scale knowledge forums.
                            </p>
                            <p>
                                White Massif delivers fully integrated MICE event management in Bangalore, handling everything from executive meetings in North Bangalore to incentive retreats and exhibition logistics. Our strength lies in managing complexity, multiple venues, coordinated travel, VIP hospitality, sponsor integration, and seamless execution across every touchpoint.
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
                            Comprehensive MICE Solutions
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Our comprehensive MICE solutions include:
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Presentation,
                                title: "Meetings",
                                desc: "Strategy offsites, board meetings, leadership retreats, and team-building programs. We manage room configurations, facilitation support, branded environments, and engagement activities."
                            },
                            {
                                icon: Plane,
                                title: "Incentives",
                                desc: "Reward and recognition programs such as curated city experiences, treasure hunts, adventure outings, and gala award ceremonies. We coordinate travel logistics, entertainment, and experiential design to make incentive trips memorable."
                            },
                            {
                                icon: MessagesSquare,
                                title: "Conferences",
                                desc: "Large-scale corporate or association conventions with multi-track sessions, sponsorship zones, and hybrid participation."
                            },
                            {
                                icon: Building,
                                title: "Exhibitions",
                                desc: "Trade shows and expos including space planning, booth fabrication, visitor registration systems, exhibitor coordination, and on-site management."
                            },
                            {
                                icon: Route,
                                title: "Travel & Logistics Coordination",
                                desc: "While not a travel agency, we collaborate with trusted partners to arrange flights, hotel room blocks, airport transfers, and inter-city movement. We build cohesive itineraries, for example, airport pick-ups at Kempegowda International Airport followed by a resort stay and next-day conference at a convention center."
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
                            Why Choose White Massif for MICE in Bangalore
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BarChartBig,
                                title: "Scalable Execution",
                                desc: "We have successfully managed MICE programs with 500–1,000+ delegates across multiple venues. Our project timelines detail every session and transition hour-by-hour to ensure seamless flow."
                            },
                            {
                                icon: Link,
                                title: "Strong Supplier Network",
                                desc: "Established relationships with leading Bangalore hotels such as The Lalit Ashok and Goldfinch Hotel Bengaluru, along with resorts near Nandi Hills, allow us to negotiate competitive group packages."
                            },
                            {
                                icon: Sparkles,
                                title: "Experience-Led Design",
                                desc: "We elevate corporate programs with immersive touches, curated welcome kits, branded décor themes, regional cultural performances (such as Carnatic music showcases), and experiential networking environments."
                            },
                            {
                                icon: ShieldAlert,
                                title: "Crisis-Ready Planning",
                                desc: "Multi-day programs carry inherent risks like flight delays or traffic disruptions. We build contingency buffers, keep backup venues or meeting rooms on standby, and maintain 24/7 support contacts throughout the event."
                            },
                            {
                                icon: Compass,
                                title: "Deep Local Insight",
                                desc: "We plan around Bangalore’s traffic patterns (for example, concluding sessions before peak evening congestion) and recommend venues with reliable power backups and strong connectivity."
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
                                    icon: Telescope,
                                    desc: "Define program objectives, team bonding, leadership alignment, partner awards, product showcase, along with participant profiles and budget scope."
                                },
                                {
                                    num: "02",
                                    title: "Blueprint Creation",
                                    icon: PenTool,
                                    desc: "Develop a multi-day itinerary with venue mapping (e.g., Day 1 incentive retreat at a resort; Day 2 conference at Bangalore International Exhibition Centre). Success metrics such as participant satisfaction and engagement levels are established."
                                },
                                {
                                    num: "03",
                                    title: "Logistics & Coordination",
                                    icon: Cog,
                                    desc: "Arrange city transfers (e.g., bus movement from Koramangala to Whitefield), manage hotel room blocks, coordinate airport pickups, and oversee travel-related requirements in collaboration with partners."
                                },
                                {
                                    num: "04",
                                    title: "Execution",
                                    icon: Rocket,
                                    desc: "Deploy on-site teams to manage each event segment, meetings, dinners, excursions, exhibitions, ensuring smooth transitions and real-time issue resolution."
                                },
                                {
                                    num: "05",
                                    title: "Post-Program Analysis",
                                    icon: PieChart,
                                    desc: "Compile feedback surveys, attendance data, engagement reports, and ROI summaries (such as sales leads or partner conversions generated)."
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
                            Types of MICE Events We Manage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Briefcase,
                                title: "Corporate Meetings & Leadership Retreats",
                                desc: "Single-location strategy sessions hosted in Bangalore outskirts or nearby destinations, with full city logistics coordination."
                            },
                            {
                                icon: Gift,
                                title: "Incentive Trips",
                                desc: " “Surprise” or themed incentive programs for sales teams, often including overnight retreats near Nandi Hills or destination-style experiences within Karnataka."
                            },
                            {
                                icon: MonitorPlay,
                                title: "Hybrid & Live-Streamed Programs",
                                desc: "For distributed teams, we integrate live broadcast capabilities so global stakeholders can participate remotely."
                            },
                            {
                                icon: Handshake,
                                title: "Vendor Meets & Partner Incentives",
                                desc: "Dealer conferences, product showcases, and partner award evenings that combine recognition with strategic business sessions."
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
                                MICE programs are common across sectors, including:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Cpu, title: "Technology & IT", desc: "Annual offsites and multi-day global capability center meets." },
                                    { icon: FlaskConical, title: "Pharmaceuticals", desc: "Medical conferences with regulated exhibition setups." },
                                    { icon: Factory, title: "Manufacturing", desc: "Dealer conventions and distributor meets." },
                                    { icon: ShoppingCart, title: "Retail", desc: "Incentive tours and recognition programs for high-performing store teams." },
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
                            <p className="text-lg text-gray-600 leading-relaxed mt-8">
                                Each industry has unique compliance, branding, and engagement requirements, which we incorporate into every program design.
                            </p>
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
                                Bangalore offers diverse venues suited for MICE programs:
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Maximize,
                                        title: "Convention Centers",
                                        desc: "Bangalore International Exhibition Centre and KTPO (Whitefield) for large expos and conventions."
                                    },
                                    {
                                        icon: Hotel,
                                        title: "Hotels with Integrated Conference Facilities",
                                        desc: "Sheraton Grand Bangalore Hotel at Brigade Gateway and The Lalit Ashok for mid-sized MICE programs combining accommodation and meeting spaces."
                                    },
                                    {
                                        icon: Trees,
                                        title: "Resorts & Hill Destinations",
                                        desc: "Properties near Nandi Hills or Coorg for incentive retreats and team-building experiences."
                                    },
                                    {
                                        icon: GlassWater,
                                        title: "Unique Networking Spaces",
                                        desc: "Lifestyle and experiential venues suitable for informal networking dinners or brand showcases."
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
                                We evaluate each venue for accessibility, infrastructure quality, exhibition capacity, accommodation strength, and power backup reliability.
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
                                q: "What does MICE include?",
                                a: "MICE stands for Meetings, Incentives, Conferences, and Exhibitions, covering corporate programs that often involve travel and multi-day planning."
                            },
                            {
                                q: "Do you handle travel bookings?",
                                a: "We coordinate with trusted travel and hospitality partners to manage flights, transfers, and accommodation while overseeing the complete event flow."
                            },
                            {
                                q: "Can you organize international conferences in Bangalore?",
                                a: "Yes. Bangalore is globally connected, and we can support visa coordination and compliance protocols in collaboration with specialized partners."
                            },
                            {
                                q: "Do you manage MICE budgets?",
                                a: "Absolutely. We maintain detailed, transparent budgets covering venue rentals, production, hospitality, travel, and contingency planning, along with cost optimization strategies."
                            },
                            {
                                q: "What’s the typical planning timeline?",
                                a: "For multi-day MICE programs, 3–6 months is ideal. For single-day meetings, 8–10 weeks may be sufficient depending on scale."
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
                        Planning a meeting, incentive program, conference, or exhibition in Bangalore? Partner with White Massif for a turnkey MICE solution, from airport pickups and curated itineraries to gala dinners and closing ceremonies. We design experiences that engage your audience and deliver measurable business results.
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
