import type { Get, UniversalMiddleware } from "@universal-middleware/core";
import { dbPostgres } from "../database/drizzle/db";

declare global {
  namespace Universal {
    interface Context {
      db: ReturnType<typeof dbPostgres>;
    }
  }
}

// Add `db` to the Context
export const dbMiddleware: Get<[], UniversalMiddleware> = () => async (_request, context, _runtime) => {
  const db = dbPostgres();

  return {
    ...context,
    db: db,
  };
};
