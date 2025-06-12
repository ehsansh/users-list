import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
    images: {
        domains: [
            new URL(process.env.NEXT_PUBLIC_API_BASE_URL!).hostname,
            new URL(process.env.NEXT_PUBLIC_FLAG_BASE_URL!).hostname
        ],
        unoptimized: true,
    }
};

export default nextConfig;

