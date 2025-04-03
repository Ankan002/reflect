"use client";

import { Logo } from "@/components/brand";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarNavItems } from "@/constants/sidebar-nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCommonSidebar } from "./hook";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import BoringAvatar from "boring-avatars";
import { LogOut } from "lucide-react";

const CommonSidebar = () => {
	const pathname = usePathname();
	const {
		chats,
		isChatLoading,
		isUserLoading,
		user,
		onLogout,
		isAppLoaded,
		theme,
	} = useCommonSidebar();

	return (
		<Sidebar className="border-r-1 font-body">
			<SidebarHeader>
				<Logo type="long" />
				<SidebarMenu className="mr-1">
					{SidebarNavItems.map((item) => {
						const { Icon } = item;

						return (
							<SidebarMenuItem key={item.id}>
								<SidebarMenuButton
									asChild
									isActive={pathname === item.link}
								>
									<Link href={item.link}>
										<Icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup className="group-data-[collapsible=icon]:hidden font-body">
					<SidebarGroupLabel className="text-sm">
						Your Chats
					</SidebarGroupLabel>

					{isChatLoading ? (
						<>
							{new Array(10).fill(null).map((_, index) => (
								<Skeleton
									key={index}
									className="w-full h-6 mt-1.5"
								/>
							))}
						</>
					) : (
						chats.map((chat) => (
							<SidebarMenuItem
								key={chat.id}
								className="list-none my-0.5"
							>
								<SidebarMenuButton
									asChild
									isActive={`/chat/${chat.id}` === pathname}
								>
									<Link href={`/chat/${chat.id}`}>
										<span>{chat.name}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))
					)}
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<div className="w-full p-2 flex">
					{isUserLoading || !isAppLoaded || !user ? (
						<div className="w-full flex items-center">
							<Skeleton className="rounded-full mr-1 h-10 w-10" />
							<div className="flex-1 flex flex-col">
								<Skeleton className="w-full h-4" />
								<Skeleton className="w-full h-4 mt-1" />
							</div>
						</div>
					) : (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="w-full flex items-center cursor-pointer">
									<Avatar className="mr-2">
										<BoringAvatar
											name={user.email.split("@")[0]}
											variant="marble"
										/>
									</Avatar>
									<div className="flex-1 flex flex-col">
										<p>{user.name}</p>
									</div>
								</div>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								className={`${theme} bg-background mr-1 font-geist-sans w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mb-2`}
								align="end"
							>
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
			</SidebarFooter>
		</Sidebar>
	);
};

export default CommonSidebar;
