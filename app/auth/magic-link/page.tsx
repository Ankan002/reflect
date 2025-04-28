import { ThemeToggler } from "@/components/common";
import { MagicLinkScreen } from "@/components/screens";
import { Suspense } from "react";

const MagicLinkPage = () => {
	return (
		<>
			<Suspense>
				<MagicLinkScreen />
			</Suspense>
			<ThemeToggler />
		</>
	);
};

export default MagicLinkPage;
