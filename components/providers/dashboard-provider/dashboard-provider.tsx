"use client";

import { CommonSidebar } from "@/components/common";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
	children: React.ReactNode;
	heading: string;
	isHeadingLoading?: boolean;
} & (
	| {
			button?: false;
	  }
	| {
			button: true;
			onClick: () => void;
			ActionButtonIcon: LucideIcon;
			buttonTitle?: string;
	  }
);

const DashboardProvider = (props: Props) => {
	const { children, heading, isHeadingLoading, button } = props;

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

						{button && (
							<Button
								size={"icon"}
								onClick={props.onClick}
								variant={"ghost"}
								className="cursor-pointer"
							>
								<props.ActionButtonIcon size={35} />
							</Button>
						)}
					</div>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
