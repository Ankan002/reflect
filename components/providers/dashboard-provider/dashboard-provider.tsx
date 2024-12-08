"use client";

import { CommonSidebar } from "@/components/common";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useDashboardProvider } from "./hook";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import BoringAvatar from "boring-avatars";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface Props {
	children: React.ReactNode;
	heading: string;
}

const DashboardProvider = (props: Props) => {
	const { children, heading } = props;

	const { isAppLoaded, isUserLoading, user, theme } = useDashboardProvider();

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
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className="cursor-pointer">
										<BoringAvatar
											name={user.email.split("@")[0]}
											variant="marble"
										/>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className={`${theme} bg-background mr-1 border-foreground font-geist-sans`}
								>
									<DropdownMenuLabel className="font-medium">
										Profile
									</DropdownMenuLabel>
									<DropdownMenuSeparator className="border-t border-foreground" />
									<DropdownMenuItem>
										<User />
										{user.name}
									</DropdownMenuItem>

									<DropdownMenuItem className="cursor-pointer text-destructive hover:bg-destructive/20 hover:text-destructive-foreground">
										<LogOut />
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardProvider;
