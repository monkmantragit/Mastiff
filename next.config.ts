import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'directus-production-bc75.up.railway.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'whitemassif.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.whitemassif.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'directus.whitemassif.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qkzwdwhnbzrlyijluxdg.supabase.co',
        port: '',
        pathname: '/**',
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/rolls-royce',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/empower-celebration',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/dtici-awards',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-8',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/withum-summit-2024',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/brigade-fiesta-2023',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-10',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-hitachi',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/micelio-mobility-summit',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-9',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/seasonal-and-festive-content',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-6-copy',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/our-work-3-copy',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/home-wm',
        destination: '/',
        permanent: true,
      },
      {
        source: '/our-team-corporate-events',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/event-planners-for-companies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/corporate-event-theme-and-ideas',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
