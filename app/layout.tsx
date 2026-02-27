import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "./theme-provider";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s . Invook",
		default: "Invook",
	},
	description:
		"Invook is an AI Drive and Canvas for Creative people and teams.",
	verification: {
		google: "vJ-6dPaGIkwacm6PDDYNLnbZAJVqClg6jDOa57rA424",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ConditionalLayout>{children}</ConditionalLayout>
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}