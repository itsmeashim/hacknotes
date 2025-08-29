"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "../components/header";
interface AppLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<NuqsAdapter>
			<Header />
			{children}
		</NuqsAdapter>
	);
}
