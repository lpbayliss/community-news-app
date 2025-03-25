import { initTRPC, TRPCError } from "@trpc/server";

import type { appRouter } from "../server/routers/app";
import type { TRPCContext } from "./context";

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use((opts) => {
	const user = opts.ctx.session?.user;
	if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
	return opts.next();
});

export type AppRouter = typeof appRouter;
