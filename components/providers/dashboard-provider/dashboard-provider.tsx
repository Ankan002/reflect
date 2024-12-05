"use client";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

interface Props {
	children: React.ReactNode;
}

const DashboardProvider = (props: Props) => {
	const { children } = props;

	return (
		<SidebarProvider>
			<SidebarInset>
				<SidebarTrigger />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
