import type { NextConfig } from 'next';

// URLs are hardcoded to solve errors of DOCKER build and run
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://randomuser.me/api/",
        NEXT_PUBLIC_FLAG_BASE_URL: process.env.NEXT_PUBLIC_FLAG_BASE_URL || "https://flagcdn.com/w40/",
        NEXT_PUBLIC_RESULTS_PER_PAGE: process.env.NEXT_PUBLIC_RESULTS_PER_PAGE || "20"
    },
    images: {
        domains: [
            new URL(process.env.NEXT_PUBLIC_API_BASE_URL || 'https://randomuser.me/api').hostname,
            new URL(process.env.NEXT_PUBLIC_FLAG_BASE_URL || 'https://flagcdn.com/w40/').hostname
        ],
        unoptimized: true,
    }
};

export default nextConfig;



