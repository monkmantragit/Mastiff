import type { Metadata } from "next";
import VirtualHybridEventClient from "./virtual-and-hybrid-events-client";

export const metadata: Metadata = {
    title: "Virtual & Hybrid Corporate Events Bangalore | White Massif",
    description: "Virtual and hybrid corporate events in Bangalore. Secure streaming, professional AV, and engaging online experiences. Book a demo event.",
    alternates: {
        canonical: 'https://whitemassif.com/virtual-and-hybrid-events-in-bangalore'
    }
};

export default function VirtualHybridEventPage() {
    return <VirtualHybridEventClient />;
}
