import { todoTable } from "../schema/todos";
import { type dbPostgres } from "../db";

export function insertTodo(db: ReturnType<typeof dbPostgres>, text: string) {
  return db.insert(todoTable).values({ text });
}

export function getAllTodos(db: ReturnType<typeof dbPostgres>) {
  return db.select().from(todoTable);
}
