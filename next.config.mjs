import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Run Velite during `next dev`/`next build` so generated content stays fresh.
  webpack: (config, { isServer }) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

let veliteStarted = false;
class VeliteWebpackPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (veliteStarted) return;
      veliteStarted = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
