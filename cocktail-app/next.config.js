/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'cocktailclub.com',
      'kitchenswagger.com',
      'cdn.shopify.com',
      'drink818.com',
      'shakit.co.kr',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}
