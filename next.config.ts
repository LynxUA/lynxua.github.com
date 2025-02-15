import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  images: { unoptimized: true }, // Disable Next.js image optimization
  webpack: (config) => {
    config.module.rules.push({
        test: /\.svg$/i,
        use: [{
            loader: "@svgr/webpack",
            options: {
                svgoConfig: {
                    plugins: [
                        {
                            name: 'cleanupIds',
                            params: {
                                remove: false
                            }
                        }
                    ]
                }
            }
        }],
    });
    return config;
  },
};

export default nextConfig;
