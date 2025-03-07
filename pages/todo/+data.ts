// https://vike.dev/data
import * as drizzleQueries from "../../database/drizzle/queries/todos";
import type { PageContextServer } from "vike/types";

export type Data = {
	todos: { id: string; text: string }[];
};

export default async function data(
	_pageContext: PageContextServer,
): Promise<Data> {
	const todos = await drizzleQueries.getAllTodos(_pageContext.db);

	return { todos };
}
