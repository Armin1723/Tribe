/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ['img.clerk.com'],
    },
    experimental: {
        serverActions: {
            bodySizeLimit : '2mb'
        }
        
    }
}
