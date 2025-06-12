import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//     /* config options here */
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'randomuser.me',
//                 port: '',
//                 pathname: '/api/portraits/**'
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'flagcdn.com',
//                 port: '',
//                 pathname: '/**'
//             }
//         ]
//     }
// };

const nextConfig: NextConfig = {
    images: {
        domains: ['randomuser.me', 'flagcdn.com'],
        unoptimized: true,
    }
};

export default nextConfig;

