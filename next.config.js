/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ridsor.my.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
