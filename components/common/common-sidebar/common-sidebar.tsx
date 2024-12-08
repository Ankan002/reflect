"use client";

import { Logo } from "@/components/brand";
import {
	Sidebar,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarNavItems } from "@/constants/sidebar-nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CommonSidebar = () => {
	const pathname = usePathname();

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
		</Sidebar>
	);
};

export default CommonSidebar;
