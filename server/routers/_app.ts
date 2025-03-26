import { protectedProcedure, publicProcedure, router } from "../../trpc/server";
import { setContextValue } from "../utils/context";
import { createLogger } from "../utils/logger";
import * as drizzleQueries from "../db/queries/todos";
import EventEmitter, { on } from "node:events";
import { z } from "zod";

const logger = createLogger("trpc");

const ee = new EventEmitter();

export const appRouter = router({
	demo: publicProcedure.query(async () => {
		return { demo: true };
	}),
	allTodos: publicProcedure.query(async (opts) => {
		logger.info("Getting all todos");
		return await drizzleQueries.getAllTodos(opts.ctx.db);
	}),
	onNewTodo: protectedProcedure.input(z.string()).mutation(async (opts) => {
		setContextValue("procedureName", "onNewTodo");
		setContextValue("procedureType", "mutation");
		setContextValue("todo", opts.input);
		logger.info("Informative");
		logger.debug("Debugging?");
		logger.warn("Warning! Warning!");
		logger.error("Error!?!?");
		logger.error("Error!?!?", new Error("Error!"));
		await drizzleQueries.insertTodo(opts.ctx.db, opts.input);
	}),
	testSubscription: protectedProcedure.subscription(async function* (opts) {
		while (true) {
			yield Math.random();
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}
	}),
});
