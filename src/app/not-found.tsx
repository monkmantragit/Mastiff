import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | White Massif',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: true },
};

const popularLinks = [
  { name: 'Corporate Event Management', href: '/corporate-event-management-company-bangalore' },
  { name: 'All Services', href: '/services' },
  { name: 'Our Portfolio', href: '/portfolio' },
  { name: 'Corporate Gifting', href: '/gifting' },
  { name: 'Blog', href: '/blog' },
];

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-amber-50/40 px-6 pt-28 pb-20">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-[#F9A625] uppercase mb-4">Error 404</p>
        <h1 className="text-4xl md:text-5xl font-display text-[#2A3959] mb-6">We couldn&apos;t find that page</h1>
        <p className="text-lg text-neutral-600 mb-10">
          The link may be outdated or the page may have moved. Try one of these instead, or talk to our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-3"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white font-semibold px-8 py-3 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <nav aria-label="Popular pages">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[#2A3959]">
            {popularLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="underline underline-offset-4 hover:text-[#F9A625]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
