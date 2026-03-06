'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServicesMediaService } from "@/lib/services-media";
import { ArrowRight, Trophy, Music, Building, Camera, ChevronDown, CheckCircle2, Wine, Tent, MapPin, Speaker, Palette, Layers, ClipboardList, HeartHandshake, Clapperboard, Heart, Clock, Compass, LayoutTemplate, UsersRound, Handshake, Sliders, Activity, FileText, PartyPopper, Presentation, Cpu, Landmark, HeartPulse, Factory, Rocket, Hotel, Building2 } from "lucide-react";
import { usePopup } from "@/components/popup-provider";

export default function AnnualDayEventClient() {
    const { openPopup } = usePopup();
    const serviceImages = ServicesMediaService.getServicesImages();
    // Use an appropriate image for annual day/awards
    const defaultImage = serviceImages.employeeEngagement || serviceImages.eventManagement || "/assets/images/placeholder.jpg";
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#2A3959]">
                    <Image
                        src={defaultImage}
                        alt="Annual Day and Award Event Management in Bangalore"
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
                            Annual Day & Corporate Award Night Event Management<br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#fcd34d]">in Bangalore</span>
                        </h1>

                        {/* Subtext Paragraphs */}
                        <div className="space-y-6 text-lg sm:text-xl text-gray-200 mb-12 max-w-5xl leading-relaxed font-light drop-shadow-xl">
                            <p>
                                Annual days and corporate award nights are defining moments in a company’s yearly calendar. In Bangalore, where thriving tech firms, GCCs, startups, and established enterprises shape a dynamic corporate culture, these celebrations are more than parties, they are platforms for recognition, motivation, and employer branding.
                            </p>
                            <p>
                                Employees look forward to this one evening when their achievements are applauded on stage, leaders share milestones, and teams celebrate collective success. These events must be glamorous, professionally produced, and emotionally impactful, while remaining tightly managed and on schedule.
                            </p>
                            <p>
                                White Massif specializes in Corporate Annual Day and Awards Night event management in Bangalore. From grand stage production and thematic décor to scripting CEO speeches and coordinating award presentations, we deliver polished, celebrity-style productions that reinforce company culture and elevate morale.
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
                            End-to-End Solutions
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#2A3959] mb-6">
                            Core Service Overview
                        </h2>
                        <p className="text-md sm:text-xl text-gray-600 mb-6 max-w-5xl mx-auto font-light leading-relaxed drop-shadow-lg">
                            We offer complete end-to-end planning and production services for annual days and corporate award ceremonies:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Palette,
                                title: "Concept & Theme Development",
                                desc: "We create compelling themes, such as “Masquerade Gala,” “Futuristic Trends,” or culture-driven concepts, that reflect your brand values and organizational identity."
                            },
                            {
                                icon: Layers,
                                title: "Stage & Production Design",
                                desc: "Our team designs impactful stage environments featuring red-carpet entry arches, large-format LED screens for award graphics, dynamic lighting for performances, and immersive set elements tailored to your theme."
                            },
                            {
                                icon: Music,
                                title: "Entertainment Curation",
                                desc: "We book professional emcees, live bands, dance troupes, stand-up comedians, and specialty performers. We structure the award flow, nominations, winner announcements, acceptance speeches, to maintain energy throughout the evening."
                            },
                            {
                                icon: Speaker,
                                title: "AV & Sound Management",
                                desc: "We deploy high-quality sound systems optimized for Bangalore’s large banquet halls and auditoriums. Multiple wireless microphones and backup systems ensure seamless transitions and uninterrupted performances."
                            },
                            {
                                icon: ClipboardList,
                                title: "Ceremony & Show Flow Management",
                                desc: "Our stage managers coordinate presenters, cue lighting and audio transitions, manage video playback, and ensure award handovers occur smoothly and on time."
                            },
                            {
                                icon: HeartHandshake,
                                title: "Guest Experience Planning",
                                desc: "We design seating layouts (round-table gala setups or theatre-style formats), coordinate catering plans (buffet or plated service), and incorporate family-friendly zones when required."
                            },
                            {
                                icon: Camera,
                                title: "Photography & Videography",
                                desc: "We capture high-resolution photographs and cinematic highlight videos for company archives, internal communication, and social media engagement."
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
                            Why Choose White Massif for Annual Day & Awards Night Events
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Clapperboard,
                                title: "Show Production Mindset",
                                desc: "We treat every awards night like a prime-time television production. Technical rehearsals, including walk-throughs with award winners and presenters, ensure flawless execution without visible errors."
                            },
                            {
                                icon: Heart,
                                title: "Emotional Storytelling",
                                desc: "Our creative team designs programs that build anticipation and excitement. For example, we may open the evening with a high-energy video montage celebrating the year’s milestones before transitioning into the awards ceremony."
                            },
                            {
                                icon: UsersRound,
                                title: "Scalable Execution",
                                desc: "From intimate 100-person dinner events to 3,000+ attendee celebrations, we scale production teams, staging setups, and coordination structures accordingly. Large events may include multiple emcees and split-stage formats to maintain engagement."
                            },
                            {
                                icon: Clock,
                                title: "On-Time Delivery",
                                desc: "Award functions often risk running late. Our stage managers enforce strict adherence to the run-of-show timeline, maintaining program discipline while preserving entertainment value."
                            },
                            {
                                icon: MapPin,
                                title: "Local Venue Expertise",
                                desc: "We understand Bangalore’s venue landscape, from auditoriums in tech parks to luxury hotels and unconventional spaces. We advise on logistics such as parking, shuttle transfers from corporate offices, and backstage management to ensure seamless execution."
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
                                    title: "Discovery & Planning",
                                    icon: Compass,
                                    desc: "We identify award categories, event objectives, tone (formal gala or festive celebration), and special segments such as tribute videos or leadership speeches."
                                },
                                {
                                    num: "02",
                                    title: "Event Storyboarding",
                                    icon: LayoutTemplate,
                                    desc: "Our team designs the event narrative, opening act, entertainment interludes, award sequences, and closing segments, ensuring balanced pacing."
                                },
                                {
                                    num: "03",
                                    title: "Vendor & Talent Sourcing",
                                    icon: Handshake,
                                    desc: "We collaborate with trusted AV partners, decorators, and artists, including performers from Bangalore’s vibrant theatre and music community when required."
                                },
                                {
                                    num: "04",
                                    title: "Rehearsals & Technical Runs",
                                    icon: Sliders,
                                    desc: "Rehearsals are critical for dance performances, choir presentations, and award sequences. We schedule practice sessions in advance, including full technical runs with lighting and sound."
                                },
                                {
                                    num: "05",
                                    title: "Live Execution",
                                    icon: Activity,
                                    desc: "A dedicated stage manager oversees minute-by-minute coordination. Our team handles unexpected changes, such as last-minute winner updates or technical adjustments, without disrupting audience experience."
                                },
                                {
                                    num: "06",
                                    title: "Post-Event Reporting",
                                    icon: FileText,
                                    desc: "We deliver highlight reels, full event recordings, and professional photo albums. Feedback collection helps refine future annual celebrations."
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
                            Types of Annual Day & Award Night Events
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: PartyPopper,
                                title: "Employee Annual Day Celebrations",
                                desc: "Company-wide gatherings featuring leadership speeches, employee performances, and recognition awards."
                            },
                            {
                                icon: Trophy,
                                title: "Corporate Awards Night",
                                desc: "Formal recognition events focused on excellence categories, often structured as elegant gala evenings."
                            },
                            {
                                icon: Wine,
                                title: "Black-Tie Gala Dinners",
                                desc: "Sophisticated networking evenings blending fine dining, entertainment, and selective award presentations."
                            },
                            {
                                icon: Presentation,
                                title: "Combined All-Hands & Awards Events",
                                desc: "Daytime corporate meetings followed by evening awards and celebration programs."
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
                                We manage annual days and awards events across diverse sectors including:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Cpu, title: "Technology and Global Capability Centers" },
                                    { icon: Landmark, title: "Banking, Financial Services & Insurance (BFSI)" },
                                    { icon: HeartPulse, title: "Pharmaceutical and Healthcare Companies" },
                                    { icon: Factory, title: "Manufacturing and Engineering Firms" },
                                    { icon: Rocket, title: "Startups and Growth-Stage Enterprises" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-[#F9A625]/10 rounded-xl flex items-center justify-center shrink-0 mr-4">
                                            <item.icon className="w-6 h-6 text-[#F9A625]" />
                                        </div>
                                        <div className="flex items-center">
                                            <h4 className="text-lg font-bold text-[#2A3959] mt-2.5">{item.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-[#F9A625]/5 rounded-2xl border border-[#F9A625]/20">
                                <p className="text-gray-700 leading-relaxed font-light">
                                    Many organizations in Bangalore also include families in their celebrations, and we design family-inclusive zones or resort-based formats accordingly.
                                </p>
                            </div>
                        </div>

                        {/* Venues & Technical Expertise */}
                        <div>
                            <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2">
                                Local Expertise
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#2A3959] mb-8">
                                Popular Venues in Bangalore
                            </h2>

                            <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6">
                                <p>
                                    Large corporate campuses such as Manyata Tech Park often utilize in-house auditoriums for annual celebrations. Luxury hotels including Sheraton Grand Bengaluru Whitefield Hotel & Convention Center, ITC Gardenia, and Conrad Bengaluru are preferred for high-glamour gala events. Unique venues such as clubs, alumni halls, and resort spaces can also be curated depending on event size and theme.
                                </p>
                            </div>

                            <div className="mt-12 space-y-6">
                                {[
                                    {
                                        icon: Hotel,
                                        title: "Luxury 5-Star Hotels",
                                        desc: "Grand ballrooms at The Leela Palace, Taj West End, or Sheraton Grand for premium gala nights."
                                    },
                                    {
                                        icon: Tent,
                                        title: "Resorts & Retreats",
                                        desc: "Expansive lawns at resorts in Yelahanka, Kanakapura, or Devanahalli for day-long carnivals and outdoor concerts."
                                    },
                                    {
                                        icon: Building2,
                                        title: "Mega Convention Centers",
                                        desc: "Spaces like KTPO or BIEC for massive IT corporate annual days accommodating thousands of employees."
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
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "When should we begin planning our annual day or awards night?",
                                a: "Ideally 3–4 months in advance. Bangalore’s peak corporate event season (especially Q4) results in early venue bookings."
                            },
                            {
                                q: "Do you provide complete audio and lighting for performances?",
                                a: "Yes. We partner with leading production providers in Bangalore to deliver professional sound, lighting, and stage setups."
                            },
                            {
                                q: "Can employees perform at the event?",
                                a: "Absolutely. We facilitate rehearsals, manage stage coordination, and ensure appropriate audio-visual support for employee-led performances."
                            },
                            {
                                q: "Can families be included in the celebration?",
                                a: "Yes. We design separate kids’ activity zones or family-friendly layouts depending on company culture and preferences."
                            },
                            {
                                q: "What safety measures are implemented?",
                                a: "We coordinate crowd management with venue teams and arrange security oversight. Sanitization stations and spaced seating can also be implemented when required."
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
                        Make Your Celebration Unforgettable
                    </Badge>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                        Transform your annual day or corporate awards night into a truly memorable production. Share your theme ideas, level of formality, entertainment preferences, and guest count with White Massif. We will craft a detailed proposal, complete with stage concepts, show flow planning, and execution strategy, to honor your team’s achievements in style.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => openPopup('Annual Day Event Bangalore CTA')}
                            className="btn-primary px-8 py-6 text-base lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Discuss Your Event Strategy
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
