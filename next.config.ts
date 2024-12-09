import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "minio-api.ankn.dev",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
