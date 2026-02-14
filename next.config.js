/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Required for Cloudflare Pages static export
    distDir: 'out',
};

module.exports = nextConfig;
