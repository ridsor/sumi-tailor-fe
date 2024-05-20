/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sumitailor.ridsor.my.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
