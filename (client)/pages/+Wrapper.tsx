import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { type ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { TRPCProvider } from "../../trpc/client";
import type { AppRouter } from "../../trpc/server";

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

export default function Wrapper({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				loggerLink({
					enabled: (opts) =>
						(process.env.NODE_ENV === "development" &&
							typeof window !== "undefined") ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: "http://localhost:3000/api/trpc",
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</TRPCProvider>
		</QueryClientProvider>
	);
}
