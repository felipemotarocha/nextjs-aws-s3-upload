/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fsc-nextjs-app.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
