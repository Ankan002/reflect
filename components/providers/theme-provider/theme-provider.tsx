"use client";

import { useThemeProvider } from "./hook";

interface Props {
	children: React.ReactNode;
}

const ThemeProvider = (props: Props) => {
	const { children } = props;
	const { theme } = useThemeProvider();

	return <div className={`${theme}`}>{children}</div>;
};

export default ThemeProvider;
