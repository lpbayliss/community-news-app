import { protectedProcedure, publicProcedure, router } from "../../trpc/server";
import { setContextValue } from "../utils/context";
import { createLogger } from "../utils/logger";
import * as drizzleQueries from "../db/queries/todos";

const logger = createLogger("trpc");

export const appRouter = router({
	demo: publicProcedure.query(async () => {
		return { demo: true };
	}),
	allTodos: publicProcedure.query(async (opts) => {
		logger.info("Getting all todos");
		return await drizzleQueries.getAllTodos(opts.ctx.db);
	}),
	onNewTodo: protectedProcedure
		.input((value): string => {
			if (typeof value === "string") {
				return value;
			}
			throw new Error("Input is not a string");
		})
		.mutation(async (opts) => {
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
});
