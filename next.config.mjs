/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Add protocol if it's missing
                hostname: 'www.freetogame.com',
            },
        ],
    },
};

export default nextConfig;