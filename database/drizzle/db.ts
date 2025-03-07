import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as todos from "./schema/todos";

const schema = {
	...todos,
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
