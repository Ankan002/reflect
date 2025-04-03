"use client";

import { CommonSidebar } from "@/components/common";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	children: React.ReactNode;
	heading: string;
	isHeadingLoading?: boolean;
}

const DashboardProvider = (props: Props) => {
	const { children, heading, isHeadingLoading } = props;

	return (
		<SidebarProvider>
			<CommonSidebar />
			<SidebarInset>
				<div className="w-full min-h-screen flex flex-col font-body">
					<div className="w-full flex justify-between items-center my-2 px-2">
						<div className="flex items-center">
							<SidebarTrigger className="text-primary" />
							{isHeadingLoading ? (
								<Skeleton className="h-5 w-24 bg-primary" />
							) : (
								<p className="text-primary text-lg ml-1">
									{heading}
								</p>
							)}
						</div>
					</div>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
