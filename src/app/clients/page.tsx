'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/components/popup-provider";
import { DirectusService, type Testimonial } from '@/lib/directus-service';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles,
  Users, 
  Calendar,
  Trophy,
  Star,
  Phone,
  X,
  Search,
  Filter
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

// Removed client categories as per requirements

const stats = [
  {
    number: "165+",
    label: "Corporate Clients",
    icon: Users,
    color: "text-amber-400"
  },
  {
    number: "12+",
    label: "Years Experience", 
    icon: Trophy,
    color: "text-blue-400"
  },
  {
    number: "1000+",
    label: "Events Delivered",
    icon: Calendar,
    color: "text-purple-400"
  },
  {
    number: "2M+",
    label: "Audience Engagement",
    icon: Star,
    color: "text-emerald-400"
  }
];

// Featured premium clients for hero display
const featuredClients = [
  {
    name: "Microsoft",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-010.png",
    fallback: "/assets/images/clients/Microsoft.webp",
    category: "Technology"
  },
  {
    name: "Amazon Web Services", 
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-002.png",
    fallback: "/assets/images/clients/Amazon-Web-services.webp",
    category: "Technology"
  },
  {
    name: "Johnson & Johnson",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-007.png",
    fallback: "/assets/images/clients/Johnson-controls-1.png",
    category: "Healthcare"
  },
  {
    name: "GSK",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-006.png",
    fallback: "/assets/images/clients/GSK-1.png",
    category: "Pharmaceutical"
  },
  {
    name: "Coca Cola",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-003.png",
    fallback: "/assets/images/clients/Coca-cola-1.png",
    category: "Consumer Goods"
  },
  {
    name: "Ericsson",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-005.png",
    fallback: "/assets/images/clients/Ericsson.webp",
    category: "Telecommunications"
  },
  {
    name: "Hitachi",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-015.png",
    fallback: "/assets/images/clients/Hitachi.png",
    category: "Industrial"
  },
  {
    name: "TVS",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-014.png",
    fallback: "/assets/images/clients/TVS.png",
    category: "Automotive"
  },
  {
    name: "The New York Times",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-012.png",
    fallback: "/assets/images/clients/The-new-york-times-1.png",
    category: "Media"
  },
  {
    name: "KLM",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-008.png",
    fallback: "/assets/images/clients/KLM-1.png",
    category: "Aviation"
  },
  {
    name: "ABB",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-001.png",
    fallback: "/assets/images/clients/ABB.png",
    category: "Industrial"
  },
  {
    name: "EMC",
    logo: "https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-004.png",
    fallback: "/assets/images/clients/EMC.webp",
    category: "Technology"
  }
];

// Generate all client logos for modal display
const generateAllClientLogos = () => {
  return Array.from({length: 154}, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return {
      id: `client-${num}`,
      src: `https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Clients%20Logo-%20wm-${num}.png`,
      alt: `Client ${num}`,
      // Assign industry categories (simplified for demo)
      category: ['Technology', 'Healthcare', 'Manufacturing', 'Finance', 'Automotive', 'Media'][i % 6]
    };
  });
};

const allClientLogos = generateAllClientLogos();

export default function ClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { openPopup } = usePopup();
  const [showAllClients, setShowAllClients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await DirectusService.getFeaturedTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Generate client rows for scrolling
  const moreClientsRow1 = allClientLogos.slice(0, Math.floor(allClientLogos.length / 2));
  const moreClientsRow2 = allClientLogos.slice(Math.floor(allClientLogos.length / 2));

  const filteredClients = allClientLogos.filter((client) =>
    client.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return <div>Test</div>;
}
