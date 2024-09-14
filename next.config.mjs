/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.donmai.us',
            },
            {
                protocol: 'https',
                hostname: 'images-na.ssl-images-amazon.com',
            }
        ]
    }
};

export default nextConfig;
