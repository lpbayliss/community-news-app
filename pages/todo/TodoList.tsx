import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../trpc/client";
import { useState } from "react";

export function TodoList({
	initialTodoItems,
}: { initialTodoItems: { id: string; text: string }[] }) {
	const [newTodo, setNewTodo] = useState("");
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { data: todoItems, refetch } = useQuery(trpc.allTodos.queryOptions());
	const newTodoCreator = useMutation(
		trpc.onNewTodo.mutationOptions({
			onSuccess() {
				queryClient.invalidateQueries(trpc.allTodos.queryOptions());
			},
		}),
	);

	return (
		<>
			<ul>
				{todoItems?.map((todoItem, index) => (
					// biome-ignore lint:
					<li key={index}>{todoItem.text}</li>
				))}
			</ul>
			<div>
				<form
					onSubmit={async (ev) => {
						ev.preventDefault();
						await newTodoCreator.mutate(newTodo);
						await refetch();
						setNewTodo("");
					}}
				>
					<input
						type="text"
						onChange={(ev) => setNewTodo(ev.target.value)}
						value={newTodo}
						className={
							"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto p-2 mr-1 mb-1"
						}
					/>
					<button
						type="submit"
						className={
							"text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2"
						}
					>
						Add to-do
					</button>
				</form>
			</div>
		</>
	);
}
