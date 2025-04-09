"use client";

import { DashboardProvider } from "@/components/providers";
import { useGalleryScreen } from "./hook";
import { ImageCard } from "@/components/common";

const GalleryScreen = () => {
	const { images } = useGalleryScreen();

	return (
		<DashboardProvider heading="Gallery">
			<main className="w-full flex flex-wrap px-5 pb-5 font-body text-primary mt-5">
				{images.map((image) => {
					return <ImageCard image={image} key={image.id} />;
				})}
			</main>
		</DashboardProvider>
	);
};

export default GalleryScreen;
