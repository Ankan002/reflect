import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { LoadManager } from "@/components/common";
import { Space_Grotesk } from "next/font/google";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Reflect",
	description: "The open source freedom tool for image based AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
			>
				<ReactQueryProvider>
					<ThemeProvider>
						<LoadManager />
						{children}
						<Toaster />
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
