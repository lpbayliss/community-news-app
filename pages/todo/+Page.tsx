import { TodoList } from "./(components)/TodoList.jsx";
import { useTRPC } from "../../trpc/client";

export default function Page() {
	const trpc = useTRPC();
	return (
		<>
			<h1>To-do List</h1>
			<TodoList />
		</>
	);
}
