import "dotenv/config";

import { vikeHandler } from "./server/vike-handler";
import { Hono } from "hono";
import { createHandler, createMiddleware } from "@universal-middleware/hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/server";
import { dbPostgres } from "./database/drizzle/db";
import { auth } from "./auth/server";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.use(
	"/api/trpc/*",
	trpcServer({
		endpoint: "/api/trpc",
		router: appRouter,
		createContext: (_opts, c) => {
			return {
				db: dbPostgres(),
			};
		},
	}),
);

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
