"use client";

import { getQueryClient } from "@/utils/client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

const ReactQueryProvider = (props: ReactQueryProviderProps) => {
	const { children } = props;
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
