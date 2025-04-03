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
	isHeadingLoading?: boolean;
}

const DashboardProvider = (props: Props) => {
	const { children, heading, isHeadingLoading } = props;

	const { isAppLoaded, isUserLoading, user, theme, onLogout } =
		useDashboardProvider();

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
										className={`${theme} bg-background mr-1 border-foreground font-body`}
									>
										<DropdownMenuLabel className="font-medium">
											Profile
										</DropdownMenuLabel>
										<DropdownMenuSeparator className="border-t border-foreground" />
										<DropdownMenuItem>
											<User />
											{user.name}
										</DropdownMenuItem>

										<DropdownMenuItem
											className="cursor-pointer text-destructive hover:bg-destructive/20 hover:text-destructive-foreground"
											onClick={onLogout}
										>
											<LogOut />
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
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
