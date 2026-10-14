import type { NextConfig } from "next";

// A fully static portfolio: Cache Components / PPR aren't needed, and keeping
// them off means each route unmounts normally (videos and menus reset).
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  experimental: {
    // Size the build worker pool by free memory instead of CPU count, so
    // builds don't crash on machines with little RAM to spare.
    memoryBasedWorkersCount: true,
  },
};

export default nextConfig;
