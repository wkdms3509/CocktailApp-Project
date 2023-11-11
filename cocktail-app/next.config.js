/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/app',
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'cocktailclub.com', 'kitchenswagger.com'],
  },
}
