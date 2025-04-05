"use client";

import { DashboardProvider } from "@/components/providers";
import { useGalleryScreen } from "./hook";
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
							src={image.public_url}
							alt={image.id}
							height={1024}
							width={1024}
							className="m-1 rounded-md border border-primary w-52 h-52"
							style={{
								aspectRatio: "1:1",
							}}
						/>
					);
				})}
			</main>
		</DashboardProvider>
	);
};

export default GalleryScreen;
