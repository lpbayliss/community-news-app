import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context as HonoContext } from "hono";
import { dbPostgres } from "../server/db/db";
import { auth } from "../auth/server";

export const createTRPCContext = async (
	_opts: FetchCreateContextFnOptions,
	c: HonoContext,
) => {
	const session = await auth.api.getSession(c.req.raw);

	return {
		session,
		db: dbPostgres(),
	};
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
