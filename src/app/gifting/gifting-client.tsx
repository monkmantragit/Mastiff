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
    ArrowDown,
    Sparkles,
    Gift,
    Snowflake,
    Handshake,
    Users,
    Leaf,
    Building2,
    Package,
    Trophy,
    Coffee,
    Heart,
    HeartPulse,
    CreditCard,
    Briefcase,
    Boxes,
    Cpu,
    PenTool,
    Truck,
    Palette,
    ShieldCheck,
    BadgeCheck,
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

// Occasions for Corporate Gifting
const occasions = [
    { icon: Package, title: "Employee Onboarding & Welcome Kits" },
    { icon: Sparkles, title: "Festive & Diwali Gifting" },
    { icon: Heart, title: "Employee Appreciation & Rewards" },
    { icon: Handshake, title: "Client & Partner Gifting" },
    { icon: Users, title: "Conferences, Offsites & Events" },
    { icon: Snowflake, title: "Year-End & New Year Gifting" },
    { icon: HeartPulse, title: "Employee Wellbeing & Hybrid Teams" },
    { icon: Leaf, title: "CSR & Sustainability Gifting" }
];

// Gifting Categories
const giftingCategories = [
    {
        icon: Package,
        title: "Onboarding & Welcome Kits",
        items: ["Joining-day kits", "Branded desk essentials", "Custom apparel", "Tech accessories", "Handwritten welcome notes"]
    },
    {
        icon: Heart,
        title: "Rewards & Recognition",
        items: ["Work-anniversary gifts", "Performance awards", "Spot rewards", "Long-service milestones"]
    },
    {
        icon: Sparkles,
        title: "Festive & Diwali Hampers",
        items: ["Diwali gift hampers", "Dry-fruit & sweet boxes", "Christmas & New Year gifts", "Regional festival hampers", "Eco-friendly festive packs"]
    },
    {
        icon: Handshake,
        title: "Client & Partner Gifting",
        items: ["Premium client hampers", "Executive leather sets", "Deal-closure gifts", "Year-in-review boxes"]
    },
    {
        icon: Users,
        title: "Conference & Event Kits",
        items: ["Delegate kits", "Speaker & VIP gifts", "Registration goodies", "Branded event merchandise"]
    },
    {
        icon: HeartPulse,
        title: "Employee Wellbeing",
        items: ["Wellness & self-care kits", "Fitness & desk-comfort gifts", "WFH & hybrid kits", "Mindfulness hampers"]
    },
    {
        icon: CreditCard,
        title: "Digital & Choice-Based Gifting",
        items: ["E-gift cards", "Reward points", "Curated gift catalogues", "Experience vouchers"]
    },
    {
        icon: Trophy,
        title: "Awards & Trophies",
        items: ["Custom trophies", "Crystal & acrylic awards", "Certificates", "Premium recognition boxes"]
    },
    {
        icon: Leaf,
        title: "Sustainable & CSR Gifting",
        items: ["Plantable seed-paper kits", "Recycled merchandise", "Bamboo gift sets", "NGO donation gifting"]
    },
    {
        icon: Coffee,
        title: "Gourmet & Artisanal",
        items: ["Gourmet snack hampers", "Artisanal chocolate boxes", "Speciality tea & coffee", "Local & handmade picks"]
    }
];

// Explore by Category
const exploreCategories = [
    { icon: Gift, label: "Premium Hampers" },
    { icon: Package, label: "Welcome Kits" },
    { icon: Boxes, label: "Branded Merchandise" },
    { icon: Cpu, label: "Tech & Smart Gadgets" },
    { icon: Leaf, label: "Eco-Friendly Gifts" },
    { icon: HeartPulse, label: "Wellness Kits" },
    { icon: Coffee, label: "Gourmet & Chocolates" },
    { icon: Briefcase, label: "Executive & Luxury Gifts" },
    { icon: PenTool, label: "Personalised Gifts" }
];

// Our Process - 5 step timeline
const processSteps = [
    {
        title: "Understand Your Requirement",
        desc: "We start with the brief — budget, audience, occasion, deadline — before anyone talks products.",
        points: ["Budget", "Audience", "Occasion", "Timeline"]
    },
    {
        title: "Curate Concepts",
        desc: "You get a few thought-through options, with real samples and honest costings to compare.",
        points: ["Concept options", "Brand-aligned curation", "Samples & costings"]
    },
    {
        title: "Branding & Customisation",
        desc: "Then we make it unmistakably yours — logo, colours, packaging, and a note that sounds like your company.",
        points: ["Logo application", "Packaging", "Personalisation", "Custom notes"]
    },
    {
        title: "Production",
        desc: "Vetted suppliers, in-house assembly, and a quality check on every unit before it leaves us.",
        points: ["Quality sourcing", "Assembly", "Quality checks"]
    },
    {
        title: "Delivery",
        desc: "Then it ships — to one office or a hundred home addresses, on the date that matters.",
        points: ["PAN India delivery", "Multi-location dispatch", "Event venue delivery"]
    }
];

// Why Choose Us
const whyChooseUs = [
    { icon: PenTool, title: "Curated, not off-the-shelf", desc: "Every gift is chosen for your brief and your people, never lifted from a catalogue." },
    { icon: Package, title: "Premium packaging", desc: "The box is half the gift, so we sweat it as much as what's inside." },
    { icon: Palette, title: "Brand-first, always", desc: "Your logo, colours and tone applied with restraint, so it reads premium, not loud." },
    { icon: Boxes, title: "One team, end to end", desc: "Idea, sourcing, branding, assembly and dispatch — handled in-house, not passed around." },
    { icon: Truck, title: "Delivered PAN India", desc: "To offices, homes and event venues, wherever your people happen to be." },
    { icon: Building2, title: "Bulk without the drop-off", desc: "A hundred kits or ten thousand, with the same quality on every single one." },
    { icon: Leaf, title: "Sustainable when it counts", desc: "Eco-friendly products, recycled packaging and seed-paper kits for greener CSR gifting." },
    { icon: ShieldCheck, title: "A person who owns it", desc: "One point of contact who stays on your project from brief to delivery." }
];

// FAQs
const faqs = [
    {
        q: "Do you customise gifts with our branding?",
        a: "Yes — branding is the point. Logos, brand colours, custom packaging and personalised notes or names go on every gift in the order."
    },
    {
        q: "What's your minimum order quantity?",
        a: "It depends on the product and how much customisation you want. Tell us the plan and we'll suggest options that fit your numbers and budget."
    },
    {
        q: "Do you deliver outside Bangalore?",
        a: "Yes. We're based in Bangalore and dispatch PAN India — to one office, to your event venue, or to hundreds of individual home addresses."
    },
    {
        q: "Can you work to a fixed per-gift budget?",
        a: "Absolutely. Give us a per-head budget and who it's for, and we'll get you the best-looking, best-feeling gift that number allows."
    },
    {
        q: "Do you offer digital or choice-based gifting?",
        a: "Yes. Alongside physical gifts, we set up e-gift cards, curated catalogues and reward points, so recipients pick what they actually want."
    },
    {
        q: "Do you have sustainable gifting options?",
        a: "Yes. Plantable seed-paper kits, recycled and bamboo products, and eco-friendly packaging are all available for CSR and green gifting programmes."
    }
];

export default function GiftingClient() {
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
                        alt="Curated corporate gift hampers by Massif Gifting Studio, Bangalore"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Layered overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#2A3959]/90"></div>
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
                            <Gift className="w-4 h-4 mr-2" />
                            Massif Gifting Studio
                        </Badge>

                        {/* Main H1 Heading */}
                        <h1 className="text-4xl mb-12 sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            Corporate Gifting in Bangalore, <span className="text-[#F9A625]">Worth Unwrapping</span>
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                            One team to plan, brand, pack and deliver your corporate gifts, right across India.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                onClick={() => openPopup('gifting-hero')}
                                className="btn-primary px-10 py-6 text-lg rounded-2xl"
                            >
                                Let&apos;s Discuss Your Requirement
                                <ArrowRight className="ml-0 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => openPopup('gifting-hero-enquire')}
                                className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-10 py-6 text-lg rounded-2xl"
                            >
                                Enquire Now
                                <ArrowRight className="ml-0 w-5 h-5" />
                            </Button>
                        </div>

                        {/* Scroll cue */}
                        <motion.a
                            href="#gifting-about"
                            aria-label="Scroll to learn more about Massif Gifting Studio"
                            className="inline-flex mt-16 w-11 h-11 rounded-full border border-white/30 items-center justify-center text-white/70 hover:text-white hover:border-white/70 transition-colors"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* About Massif Gifting Studio */}
            <section id="gifting-about" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24">
                {/* Dynamic Dark Background */}
                <div className="absolute inset-0 bg-[#2A3959]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A3959] via-[#1E2A3A] to-black/80"></div>

                    {/* Animated Glow Effects */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F9A625]/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 animate-pulse [animation-duration:10s]"></div>
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
                                    About <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A625] to-[#FFD180]">
                                        Massif Gifting Studio
                                    </span>
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                {['Design', 'Source', 'Customize', 'Package', 'Deliver'].map((item, i) => (
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
                                        <strong className="text-white font-semibold">Massif Gifting Studio</strong> is the <span className="px-1 py-0.5 bg-[#F9A625]/20 text-[#FFD180] rounded">gifting arm of White Massif</span>, Bangalore&apos;s event people.
                                    </p>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                        From a new hire&apos;s welcome kit to a client&apos;s Diwali hamper, we own <span className="text-white font-semibold">the idea, the branding, the packing and the doorstep delivery</span> — so your team doesn&apos;t.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* What We Do - Occasions for Corporate Gifting */}
            <section id="gifting-occasions" className="py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2 hover:bg-[#F9A625]/20 transition-colors">
                            What We Do
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-6 max-w-5xl mx-auto">
                            Occasions for Corporate Gifting
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Good gifting isn&apos;t just a Diwali thing. These are the moments across your year when the right gift quietly does real work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {occasions.map((occasion, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#F9A625]/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="w-12 h-12 flex-shrink-0 rounded-xl bg-[#F9A625]/10 flex items-center justify-center text-[#F9A625] group-hover:bg-[#F9A625] group-hover:text-white transition-colors duration-300">
                                    <occasion.icon className="w-6 h-6" />
                                </span>
                                <h3 className="text-base font-bold text-[#2A3959] leading-snug group-hover:text-[#F9A625] transition-colors">
                                    {occasion.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gifting Categories */}
            <section id="gifting-categories" className="py-24 bg-[#2A3959] relative overflow-hidden scroll-mt-24">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#F9A625] text-white border-none px-4 py-2">
                            Our Range
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-white mb-6">
                            Gifting Categories
                        </h2>
                        <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Whatever the reason you&apos;re gifting, there&apos;s a ready programme for it here — built for <span className="font-semibold text-[#F9A625]">one recipient or ten thousand,</span> and everyone in between.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {giftingCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 2) * 0.1 }}
                                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#2A3959] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#F9A625] transition-colors duration-300">
                                        <category.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#2A3959] leading-tight group-hover:text-[#F9A625] transition-colors">
                                        {category.title}
                                    </h3>
                                </div>
                                <ul className="flex flex-wrap gap-2.5">
                                    {category.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="px-3.5 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700 group-hover:border-[#F9A625]/25 group-hover:bg-[#F9A625]/5 transition-colors duration-300"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore by Category */}
            <section id="gifting-explore" className="py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-[#2A3959]/10 text-[#2A3959] border-[#2A3959]/20 px-4 py-2 hover:bg-[#2A3959]/20 transition-colors">
                            Browse
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-6">
                            Explore by Category
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Prefer to start from the product? Pick a category and we&apos;ll shape the programme around it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {exploreCategories.map((category, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openPopup(`gifting-category-${category.label.toLowerCase().replace(/\s+/g, '-')}`)}
                                className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#F9A625]/40 hover:-translate-y-1 transition-all duration-300 text-left"
                            >
                                <span className="w-12 h-12 flex-shrink-0 rounded-xl bg-[#F9A625]/10 flex items-center justify-center text-[#F9A625] group-hover:bg-[#F9A625] group-hover:text-white transition-colors duration-300">
                                    <category.icon className="w-6 h-6" />
                                </span>
                                <span className="flex-1 text-base font-bold text-[#2A3959] group-hover:text-[#F9A625] transition-colors">
                                    {category.label}
                                </span>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#F9A625] group-hover:translate-x-1 transition-all duration-300" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process - 5 step timeline */}
            <section id="gifting-process" className="py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <Badge className="mb-6 bg-[#F9A625]/10 text-[#D98A10] border-[#F9A625]/20 px-4 py-2 hover:bg-[#F9A625]/20 transition-colors">
                            Our Methodology
                        </Badge>
                        <h2 className="text-4xl sm:text-6xl font-display text-[#2A3959] mb-8">
                            Our Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Five steps from your brief to your team&apos;s doorstep, with <span className="font-semibold text-[#F9A625]">the same people on it</span> throughout.
                        </p>
                    </div>

                    {/* Timeline: vertical on mobile, horizontal from lg */}
                    <div className="relative">
                        {/* Horizontal connector rail (desktop) */}
                        <div
                            aria-hidden="true"
                            className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#F9A625]/0 via-[#F9A625]/50 to-[#F9A625]/0"
                        ></div>

                        <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
                            {processSteps.map((step, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.12 }}
                                    className="group relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center"
                                >
                                    {/* Rail: number + vertical connector on mobile */}
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#2A3959] text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:bg-[#F9A625] group-hover:scale-105 transition-all duration-300">
                                            {index + 1}
                                        </div>
                                        {index < processSteps.length - 1 && (
                                            <div
                                                aria-hidden="true"
                                                className="lg:hidden w-0.5 flex-1 min-h-[2rem] mt-3 bg-gradient-to-b from-[#F9A625]/50 to-[#F9A625]/5"
                                            ></div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-2 lg:pb-0 lg:mt-6">
                                        <h3 className="text-lg font-bold text-[#2A3959] leading-tight mb-3 group-hover:text-[#F9A625] transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {step.desc}
                                        </p>
                                        <ul className="flex flex-wrap gap-2 lg:justify-center">
                                            {step.points.map((point, i) => (
                                                <li
                                                    key={i}
                                                    className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-xs font-medium text-gray-700"
                                                >
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section id="gifting-why-us" className="relative py-24 lg:py-32 bg-[#2A3959] overflow-hidden scroll-mt-24">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading Section */}
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
                                <span className="flex">Why Choose</span>
                                <span className="text-[#F9A625] flex">Massif Gifting Studio?</span>
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
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                                {whyChooseUs.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#F9A625]">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-white leading-snug mb-1.5">{item.title}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Images Section */}
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
                                            src={serviceImages.celebrationGalore}
                                            alt="Premium branded corporate gift hampers curated in Bangalore"
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                        />
                                    </div>
                                    <div className="p-6 rounded-3xl bg-[#F9A625] text-[#2A3959]">
                                        <div className="text-3xl font-bold mb-2">PAN India</div>
                                        <div className="font-medium">Multi-Location Dispatch</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
                                        <div className="text-3xl font-bold mb-2">End-to-End</div>
                                        <div className="font-medium">Design to Delivery</div>
                                    </div>
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                                        <Image
                                            src={serviceImages.conventionMeet}
                                            alt="Branded corporate merchandise and employee welcome kits for a dealer meet"
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 50vw, 25vw"
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

            {/* FAQ Section */}
            <section id="gifting-faqs" className="py-24 bg-white relative scroll-mt-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-display text-[#2A3959] mb-4">
                            FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaqIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <h3>
                                        <button
                                            id={`gifting-faq-trigger-${index}`}
                                            aria-expanded={isOpen}
                                            aria-controls={`gifting-faq-panel-${index}`}
                                            onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-lg font-bold text-[#2A3959] pr-8">{faq.q}</span>
                                            <ChevronDown
                                                aria-hidden="true"
                                                className={`w-5 h-5 flex-shrink-0 text-[#2A3959] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    </h3>
                                    <motion.div
                                        id={`gifting-faq-panel-${index}`}
                                        role="region"
                                        aria-labelledby={`gifting-faq-trigger-${index}`}
                                        initial={false}
                                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-[#2A3959] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A625]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <BadgeCheck className="w-12 h-12 text-[#F9A625] mx-auto mb-8" />
                    <h2 className="text-3xl sm:text-5xl font-display text-white mb-8">
                        Let&apos;s Plan Gifting <span className="text-[#F9A625]">Your People Actually Want.</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Tell us the occasion, the headcount and the budget, and we&apos;ll come back with gifts worth giving — and ready to ship.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            onClick={() => openPopup('gifting-final-cta')}
                            className="btn-primary px-8 py-6 text-lg rounded-2xl bg-[#F9A625] text-white hover:bg-[#e0921a] border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Enquire Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => openPopup('gifting-final-discuss')}
                            className="bg-transparent border-white text-white hover:!bg-white hover:!text-[#2A3959] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg px-8 py-6 text-lg rounded-2xl"
                        >
                            Let&apos;s Discuss Your Requirement
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
