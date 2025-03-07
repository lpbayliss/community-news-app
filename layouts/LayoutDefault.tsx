import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { type ReactNode, useState } from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";

import { TRPCProvider } from "../trpc/client";
import type { AppRouter } from "../trpc/server";

import "./style.css";
import "./tailwind.css";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (typeof window === "undefined") return makeQueryClient();
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

export default function LayoutDefault({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: "/api/trpc",
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				<div className={"flex max-w-5xl m-auto"}>
					<Sidebar>
						<Logo />
						<Link href="/">Welcome</Link>
						<Link href="/todo">Todo</Link>
						<Link href="/star-wars">Data Fetching</Link>
						{""}
					</Sidebar>
					<Content>{children}</Content>
				</div>
			</TRPCProvider>
		</QueryClientProvider>
	);
}

function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div
			id="sidebar"
			className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
		>
			{children}
		</div>
	);
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div id="page-container">
			<div id="page-content" className={"p-5 pb-12 min-h-screen"}>
				{children}
			</div>
		</div>
	);
}

function Logo() {
	return (
		<div className={"p-5 mb-2"}>
			<a href="/">
				<img src={logoUrl} height={64} width={64} alt="logo" />
			</a>
		</div>
	);
}
