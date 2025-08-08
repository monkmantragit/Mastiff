'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { WorkMediaService } from "@/lib/work-media";
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  Star,
  Calendar,
  Award,
  Filter,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Image from "next/image";
import { usePopup } from "@/components/popup-provider";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WorkPage() {
  const { openPopup } = usePopup();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  // Dynamic portfolio data from Supabase
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const items = await WorkMediaService.getPortfolioItems();
        setPortfolioItems(items);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      }
    };
    fetchPortfolio();
  }, []);

  const stats = [
    { number: "500+", label: "Events Delivered", icon: Calendar },
    { number: "165+", label: "Happy Clients", icon: Users },
    { number: "12+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  const categories = ["All", "Corporate Event", "Corporate Celebration", "Awards Ceremony", "Summit"];
  const years = ["All", "2025", "2024", "2023"];

  const filteredPortfolio = portfolioItems.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const yearMatch = selectedYear === "All" || item.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  return <div>Work Page Test</div>;
}
