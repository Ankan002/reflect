"use client";

import { Button } from "@/components/ui/button";
import { ai_image } from "@prisma/client";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	image: ai_image;
}

const ImageCard = (props: Props) => {
	const { image } = props;

	return (
		<div className="relative m-1">
			<Image
				key={image.id}
				src={image.public_url}
				alt={image.id}
				height={1024}
				width={1024}
				className="rounded-md border border-primary w-64 h-64"
				style={{
					aspectRatio: "1:1",
				}}
			/>
			<div className="absolute w-64 h-64 flex flex-col rounded-md bg-background/30 z-30 top-0 left-0 opacity-0 hover:opacity-100 cursor-pointer p-2">
				<div className="w-full flex justify-end items-center">
					<Link
						href={`${image.public_url}`}
						download={`${image.id}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							size="icon"
							variant="link"
							className="cursor-pointer"
						>
							<Download />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
