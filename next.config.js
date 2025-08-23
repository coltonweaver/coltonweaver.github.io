/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/coltonweaver.github.io',
  assetPrefix: '/coltonweaver.github.io',
  images: {
    unoptimized: true
  }
}

export default nextConfig
