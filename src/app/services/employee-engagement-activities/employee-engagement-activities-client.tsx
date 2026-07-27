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
    Zap
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

export default function EmployeeEngagementActivitiesClient() {
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
                        src={serviceImages.celebrationGalore}
                        alt="Employee Engagement Activities"
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
                            Employee Engagement & Team Building Activities in Bangalore
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            Boost Motivation, Collaboration & Workplace Performance Through Curated Engagement & Team Experiences
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
                                        At <strong className="text-white font-semibold">White Massif</strong>, we design <span className="text-[#F9A625] font-bold">impactful employee engagement and team building activities in Bangalore</span> that go beyond logistics, events designed to <span className="text-white font-medium border-b border-[#F9A625]/50">that promote stronger interpersonal relationships, strengthen teamwork, and enhance organizational culture.</span> <span>Whether you’re celebrating annual milestones, hosting interactive workshops, rewarding performance, or planning team offsites, our solutions are tailored to meet your unique goals and workforce dynamics.</span>.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        With Bangalore’s vibrant corporate ecosystem and diverse venues, we help companies build <span className="text-white font-semibold italic">meaningful employee experiences that drive morale, productivity, and retention.</span>
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
                            Our Employee Engagement & Team Building Services
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Annual Day Celebrations",
                                description: <>Celebrate milestones and company achievements with memorable <span className="font-semibold text-[#F9A625]">annual day events</span> that reflect your culture and success story. We handle everything, from event theme, entertainment, and award ceremonies to employee participation campaigns that make every individual feel valued. Annual celebrations are a powerful way to <span className="font-semibold text-[#F9A625]">reinforce organizational vision and unity.</span></>
                            },
                            {
                                icon: Palette,
                                title: "Themed Celebrations",
                                description: <>Make employee engagement fun and immersive with <span className="font-semibold text-[#F9A625]">themed celebrations</span>. Whether it’s cultural festivals, seasonal celebrations, or customized themes tied to company values, we curate experiences that spark joy, encourage participation, and strengthen team spirit.</>
                            },
                            {
                                icon: MapPin,
                                title: "Team Offsites",
                                description: <>Get your team out of the office and into a fresh environment with <span className="font-semibold text-[#F9A625]">team offsite experiences</span>. Designed to foster collaboration and strategic thinking, our offsite programs combine structured activities with relaxation, networking, and leadership bonding. Offsites can be tailored to location, duration, and desired outcomes, from half-day workshops to multi-day retreats.</>
                            },
                            {
                                icon: Trophy,
                                title: "Rewards & Recognition Programs",
                                description: <>Celebrate excellence with <span className="font-semibold text-[#F9A625]">employee recognition and reward initiatives</span> that elevate workplace motivation. From formal award ceremonies to gamified recognition moments, we design programs that anchor performance-based appreciation into your company culture, encouraging long-term engagement and loyalty.</>
                            },
                            {
                                icon: Lightbulb,
                                title: "Interactive Workshops",
                                description: <>Interactive workshops are structured, experiential sessions that focus on enhancing specific skills such as communication, problem-solving, creativity, and leadership. Using a mix of <span className="font-semibold text-[#F9A625]">hands-on exercises, facilitated discussions, and collaborative games</span>, our workshops help teams learn, connect, and grow together.</>
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-[#2A3959] border border-white/5 hover:border-[#F9A625]/20 hover:scale-[1.02] transition-all duration-300 shadow-xl w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
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
                                <span className="text-[#F9A625] flex">Engagement & Team Building?</span>
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
                                        icon: Puzzle,
                                        title: "Tailored Engagement Strategy",
                                        desc: "Every organization is different. We develop employee engagement programs that align with your culture, business goals, and workforce dynamics."
                                    },
                                    {
                                        icon: CheckCircle,
                                        title: "End-to-End Execution",
                                        desc: "From ideation and planning to logistics and on-site facilitation, we handle every detail, so your HR and leadership teams can focus on outcomes, not operations."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Proven Activity Framework",
                                        desc: "Our team builds experiences grounded in best practices that improve communication, trust, problem-solving, and team cohesion, not just entertainment value."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Local Expertise in Bangalore",
                                        desc: "We leverage Bangalore’s diverse venues, from corporate spaces to resorts and outdoor settings, to create environments that energize and inspire participants."
                                    },
                                    {
                                        icon: Zap,
                                        title: "Participation-Driven Designs",
                                        desc: "By combining structured activities with fun elements, we keep teams engaged, motivated, and ready to apply learnings back at work."
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
                            Our Employee Engagement & Team Building Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At <strong className="text-[#2A3959] font-bold">White Massif</strong>, our employee engagement and team building process is designed to deliver <span className="font-semibold text-[#F9A625]">measurable behavioral impact</span>, not just momentary excitement. Every program is built around <span className="font-semibold text-[#F9A625]">people psychology, organizational goals, and real workplace challenges.</span>
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Engagement Objective Mapping & Workforce Understanding",
                                desc: "We begin by understanding why the engagement activity is needed, not just what kind of activity is requested.",
                                points: [
                                    "Organizational goals (culture building, collaboration, motivation, retention)",
                                    "Team size, hierarchy & dynamics",
                                    "Employee demographics & work environment",
                                    "Past engagement efforts & feedback",
                                    "Desired short-term and long-term outcomes"
                                ],
                                footer: <>This ensures the program is <span className="font-semibold text-[#F9A625]">strategic, relevant, and outcome-oriented.</span></>
                            },
                            {
                                title: "Experience Design & Activity Customization",
                                desc: "Based on insights gathered, we design custom engagement journeys that balance fun with purpose.",
                                points: ["Selection of engagement format (celebration, workshop, offsite, recognition)", "Activity flow & participation design", "Alignment with company values & leadership messaging", "Engagement intensity planning (high-energy vs reflective)", "Inclusion & accessibility considerations"],
                                footer: <>No two teams are the same, so no two engagement programs should be either.</>
                            },
                            {
                                title: "Venue, Logistics & Program Planning",
                                desc: "We manage all logistical and operational elements to ensure a smooth and distraction-free experience.",
                                points: ["Venue identification (corporate spaces, resorts, outdoor locations in Bangalore)", "Setup, props, materials & activity infrastructure", "Time management & session sequencing", "Safety, permissions & contingency planning"],
                                footer: <>Everything is structured to allow teams to <span className="font-semibold text-[#F9A625]">fully focus on participation and connection.</span></>
                            },
                            {
                                title: "Facilitated Execution & On-Ground Engagement",
                                desc: "Execution is led by experienced facilitators who know how to energize teams while maintaining purpose.",
                                points: ["Live facilitation & activity moderation", "Group dynamics & participation balance", "Energy management across sessions", "Leadership & stakeholder coordination", "Real-time adjustments for maximum impact"],
                                footer: <>The result is high participation, meaningful interaction, and lasting engagement.</>
                            },
                            {
                                title: "Post-Event Closure, Reporting & Insights",
                                desc: "Engagement doesn’t end when the activity does.",
                                points: ["Participation & engagement observations", "Feedback collection & qualitative insights", "Key behavioral takeaways", "Recommendations for future engagement initiatives"],
                                footer: <>This helps organizations <span className="font-semibold text-[#F9A625]">build continuity in their engagement strategy</span>, not one-off events.</>
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
                            Our employee engagement and team building solutions are crafted with <span className="font-semibold text-[#F9A625]">industry context in mind</span>, ensuring relevance, credibility, and acceptance across diverse work cultures.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Technology & IT Companies",
                                desc: "In Bangalore’s fast-paced tech ecosystem, we help teams:",
                                points: [
                                    "Improve collaboration across functions",
                                    "Break silos in large organizations",
                                    "Re-energize remote or hybrid teams",
                                    "Foster innovation-driven mindsets"
                                ]
                            },
                            {
                                title: "Startups & Growth-Stage Companies",
                                desc: "For startups and scale-ups, engagement plays a key role in culture building.",
                                points: ["Founding team alignment", "Rapidly growing teams", "High-pressure work environments", "Culture reinforcement during scaling phases"],
                            },
                            {
                                title: "BFSI & Financial Services",
                                desc: "Structured engagement is critical in high-compliance, high-stress environments.",
                                points: ["Trust building", "Performance recognition", "Cross-team coordination", "Stress relief & morale boosting"],
                            },
                            {
                                title: "Manufacturing & Engineering Organizations",
                                desc: "For technical and operational teams, engagement programs are designed to:",
                                points: ["Enhance problem-solving skills", "Improve communication across departments", "Strengthen leadership alignment", "Encourage collaborative thinking"],
                            },
                            {
                                title: "Healthcare, Pharma & Life Sciences",
                                desc: "We create sensitive, purpose-driven engagement experiences that emphasize:",
                                points: ["Team empathy & communication", "Stress management", "Knowledge sharing", "Leadership and peer bonding"],
                            },
                            {
                                title: "Large Enterprises & Multinational Corporations",
                                desc: "For large workforces, we deliver scalable engagement programs that maintain personalization.",
                                points: ["Company-wide engagement days", "Multi-team workshops", "Leadership-driven recognition programs", "Structured offsites & celebrations"],
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
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#2A3959] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-8">
                        Ready to Elevate Employee Engagement?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Transform the way your team connects, collaborates, and grows with our expertly designed engagement and team building experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/contact'}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-sm lg:text-lg rounded-2xl"
                        >
                            Talk to Our Employee Engagement Specialists
                        </Button>
                        <Button
                            onClick={() => openPopup('corporate-event-management-cta')}
                            className="btn-primary px-8 py-6 text-sm lg:text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Request a Custom Engagement Plan
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
                                q: "What types of team building activities can you customize?",
                                a: "We design a wide range of activities including outdoor adventures, interactive workshops, collaborative problem-solving games, and theme-based celebrations tailored to your goals."
                            },
                            {
                                q: "Can you handle events for remote or hybrid teams?",
                                a: "Yes. We can plan hybrid engagement activities that combine in-person experiences with virtual collaboration elements for distributed teams."
                            },
                            {
                                q: "What is the ideal group size for these activities?",
                                a: "Activities can be designed for small teams of 10–20 people or large groups of 100+ participants depending on your event goals and space requirements."
                            },
                            {
                                q: "How far in advance should we plan employee engagement events?",
                                a: "For larger programs and offsites, it’s ideal to plan 4–8 weeks ahead. Shorter engagement workshops can be organized within shorter timelines as needed."
                            },
                            {
                                q: "Do you provide post-event engagement insights?",
                                a: "Yes. We provide summary reports and insights that help you measure engagement outcomes and inform future planning."
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
