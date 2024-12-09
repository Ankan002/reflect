import { twMerge } from "tailwind-merge";

interface Props {
	textClassName?: string;
	className?: string;
	type: "long" | "short";
}

const Logo = (props: Props) => {
	return (
		<div
			className={twMerge(
				"w-fit text-2xl font-semibold font-brand flex items-center justify-center",
				props.textClassName,
			)}
		>
			<h1
				className={twMerge(
					"text-primary tracking-wider",
					props.textClassName,
				)}
			>
				{props.type === "long" ? "Reflect" : "R"}
			</h1>
		</div>
	);
};

export default Logo;
