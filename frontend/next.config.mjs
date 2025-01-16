/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BACKEND_PATH}/:path*`,
            },
        ];
    },
    output: process.env.OUTPUT_MODE
};

export default nextConfig;
