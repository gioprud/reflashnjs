/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {appDir: true,},

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://b61fc227-6f8e-49e9-8a14-2a7bc2505066.mock.pstmn.io/api/:path*',
      },
    ]
  }

}

module.exports = nextConfig