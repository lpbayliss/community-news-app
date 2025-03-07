import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as todos from "./schema/todos";
import * as auth from "./schema/auth";

const schema = {
	...todos,
	...auth,
};

let drizzleInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function dbPostgres() {
	if (!drizzleInstance) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const connectionString = process.env.DATABASE_URL!;
		const client = postgres(connectionString);
		drizzleInstance = drizzle(client, { schema });
	}

	return drizzleInstance;
}
