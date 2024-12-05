"use client";

import { Logo } from "@/components/brand";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

const CommonSidebar = () => {
	return (
		<Sidebar className="border-r-1">
			<SidebarHeader>
				<Logo type="long" />
			</SidebarHeader>
		</Sidebar>
	);
};

export default CommonSidebar;
