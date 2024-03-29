/** @type {import('next').NextConfig} */
module.exports = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      reactStrictMode: true,
      compress: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
        ],
      },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
        serverActions: {
            bodySizeLimit : '2mb'
        },
        serverComponentsExternalPackages: ["mongoose"],
        
    }
}

