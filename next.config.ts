import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the dev-only indicator in the bottom-left corner. It only ever renders
   * under `next dev`, never in a production build, so this is purely cosmetic
   * while working locally. Compile and runtime errors are still surfaced.
   */
  devIndicators: false,
};

export default nextConfig;
