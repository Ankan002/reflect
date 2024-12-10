"use client";

import dynamic from "next/dynamic";

const GalleryPage = () => {
	const GalleryScreen = dynamic(
		async () =>
			import("@/components/screens/gallery-screen/gallery-screen"),
		{ ssr: false }
	);

	return <GalleryScreen />;
};

export default GalleryPage;
