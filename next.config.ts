import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
    images: {
        domains: ['randomuser.me', 'flagcdn.com'],
        unoptimized: true,
    }
};

export default nextConfig;

