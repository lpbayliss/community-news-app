import { useState } from "react";
import useFetchTodos from "../../hooks/useFetchTodos";
import useAddTodo from "../../hooks/useAddTodo";

interface Todo {
	id: string;
	text: string;
}

export default function Page() {
	const [inputValue, setInputValue] = useState<string>("");
	const todos = useFetchTodos();
	const addTodo = useAddTodo({
		onSettled: () => {
			setInputValue("");
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (inputValue.trim()) {
			addTodo(inputValue.trim());
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				Todo List
			</h1>
			
			<form onSubmit={handleSubmit} className="mb-6">
				<div className="flex gap-2">
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						placeholder="Add a new todo..."
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<button
						type="submit"
						disabled={!inputValue.trim()}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
					>
						Add
					</button>
				</div>
			</form>

			<div className="space-y-2">
				{todos.length === 0 ? (
					<p className="text-gray-500 text-center py-4">
						No todos yet. Add one above!
					</p>
				) : (
					todos.map((todo: Todo) => (
						<div
							key={todo.id}
							className="p-3 bg-gray-50 rounded-md border border-gray-200"
						>
							<span className="text-gray-800">{todo.text}</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}
