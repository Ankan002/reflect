"use client";

import { DashboardProvider } from "@/components/providers";

interface Props {
	id: string;
}

const ChatScreen = (props: Props) => {
	const { id } = props;
	// const {} =

	return (
		<DashboardProvider heading={id}>
			<></>
		</DashboardProvider>
	);
};

export default ChatScreen;
