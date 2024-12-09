import { getImagesAction } from "@/actions/ai-images";
import { useAPIErrorHandler } from "@/hooks";
import { ai_image } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export const useGalleryScreen = () => {
	const [images, setImages] = useState<ai_image[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();
	const loadErrorHandler = protectedAPIErrorHandler();

	const loadRef = useRef<boolean>(false);

	const onLoad = async () => {
		if (loading) return;

		setLoading(true);

		try {
			const response = await getImagesAction();

			setLoading(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			if (!response.data) {
				throw new Error("Something went wrong");
			}

			setImages(response.data.images);
		} catch (error) {
			setLoading(false);
			loadErrorHandler(error);
		}
	};

	useEffect(() => {
		if (loadRef.current) return;

		loadRef.current = true;
		onLoad();
	}, []);

	return {
		images,
	};
};
