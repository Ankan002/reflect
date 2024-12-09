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
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarNavItems } from "@/constants/sidebar-nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCommonSidebar } from "./hook";

const CommonSidebar = () => {
	const pathname = usePathname();
	const { chats, isChatLoading } = useCommonSidebar();

	return (
		<Sidebar className="border-r-1">
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
				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel className="text-sm">
						Your Chats
					</SidebarGroupLabel>

					{isChatLoading ? (
						<>
							{new Array(10).fill(null).map((_, index) => (
								<Skeleton
									key={index}
									className="w-full h-6 bg-primary mt-1.5"
								/>
							))}
						</>
					) : (
						chats.map((chat) => (
							<SidebarMenuItem key={chat.id}>
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
		</Sidebar>
	);
};

export default CommonSidebar;
