/**
 * @type {NextConfig}
 * 
 * This configuration object is used to customize the behavior of a Next.js application.
 * 
 * Properties:
 * - `images`: Configuration for handling images in the Next.js application.
 *   - `remotePatterns`: An array of objects defining remote image patterns that are allowed to be optimized.
 *     - `protocol`: The protocol to be used for the remote image (e.g., "https").
 *     - `hostname`: The hostname of the remote image source (e.g., "www.google.com").
 * 
 * Example usage:
 * ```typescript
 * const nextConfig: NextConfig = {
 *   images: {
 *     remotePatterns: [{ protocol: "https", hostname: "www.google.com" }],
 *   },
 * };
 * ```
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [{ protocol: "https", hostname: "www.google.com" }],
  // },
};

export default nextConfig;
