import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "minio-api.ankn.dev",
				protocol: "https",
			},
			{
				hostname:
					"ankan002-primary-space.blr1.cdn.digitaloceanspaces.com",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
