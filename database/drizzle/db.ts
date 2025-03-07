import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function dbPostgres() {
  const connectionString = process.env.DATABASE_URL!;
  const client = postgres(connectionString);
  return drizzle(client);
}