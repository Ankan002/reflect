"use client";

import { DashboardProvider } from "@/components/providers";
import { useGalleryScreen } from "./hook";
import { Masonry } from "masonic";
import Image from "next/image";

const GalleryScreen = () => {
	const { images } = useGalleryScreen();

	return (
		<DashboardProvider heading="Gallery">
			<main className="w-full flex flex-wrap px-5 pb-5 font-body text-primary mt-5">
				{images.map((image) => {
					return (
						<Image
							key={image.id}
							src={image.asset_url}
							alt={image.id}
							height={
								(200 /
									Number(image.aspect_ratio.split(":")[0])) *
								Number(image.aspect_ratio.split(":")[1])
							}
							width={200}
							className="m-1 rounded-md border border-primary"
							style={{
								aspectRatio: image.aspect_ratio,
							}}
						/>
					);
				})}
			</main>
		</DashboardProvider>
	);
};

export default GalleryScreen;
