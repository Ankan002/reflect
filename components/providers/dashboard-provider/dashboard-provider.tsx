"use client";

import { CommonSidebar } from "@/components/common";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

interface Props {
	children: React.ReactNode;
	heading: string;
}

const DashboardProvider = (props: Props) => {
	const { children, heading } = props;

	return (
		<SidebarProvider>
			<CommonSidebar />
			<SidebarInset>
				<div className="w-full flex items-center m-2">
					<SidebarTrigger className="text-primary" />
					<p className="text-primary text-lg ml-1">{heading}</p>
				</div>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
