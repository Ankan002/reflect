"use client";

import { CommonSidebar } from "@/components/common";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useDashboardProvider } from "./hook";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	children: React.ReactNode;
	heading: string;
}

const DashboardProvider = (props: Props) => {
	const { children, heading } = props;

	const { isAppLoaded, isUserLoading, user } = useDashboardProvider();

	return (
		<SidebarProvider>
			<CommonSidebar />
			<SidebarInset>
				<div className="w-full flex justify-between items-center my-2 px-2">
					<div className="flex items-center">
						<SidebarTrigger className="text-primary" />
						<p className="text-primary text-lg ml-1">{heading}</p>
					</div>
					<div>
						{isUserLoading || !isAppLoaded || !user ? (
							<Skeleton className="h-10 w-10 rounded-full bg-secondary border border-foreground" />
						) : (
							<></>
						)}
					</div>
				</div>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
