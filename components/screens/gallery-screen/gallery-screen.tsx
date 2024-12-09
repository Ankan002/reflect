"use client";

import { DashboardProvider } from "@/components/providers";
import { useGalleryScreen } from "./hook";
import { Masonry } from "masonic";
import Image from "next/image";

const GalleryScreen = () => {
	const { images } = useGalleryScreen();

	return (
		<DashboardProvider heading="Gallery">
			<main className="w-full flex-1 flex flex-col px-5 pb-5 font-geist-sans text-primary mt-5">
				<Masonry
					items={images}
					render={({ data, width }) => (
						<img
							src={data.asset_url}
							width={width}
							className="aspect-auto rounded-lg border border-primary"
							alt={data.id}
						/>
					)}
					columnGutter={10}
				/>
			</main>
		</DashboardProvider>
	);
};

export default GalleryScreen;
