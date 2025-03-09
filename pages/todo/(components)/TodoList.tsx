import { useState } from "react";
import useFetchTodos from "../(data)/useFetchTodos";
import useAddTodo from "../(data)/useAddTodo";
import { type SubmitHandler, useForm } from "react-hook-form";

const AddTodoForm = () => {
	type Inputs = { text: string };
	const { register, handleSubmit, reset } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await addTodo(data.text);
	};

	const addTodo = useAddTodo({ onSettled: () => reset() });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				{...register("text")}
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
	);
};

export function TodoList() {
	const todoItems = useFetchTodos();

	return (
		<>
			<ul>
				{todoItems?.map((todoItem, index) => (
					// biome-ignore lint:
					<li key={index}>{todoItem.text}</li>
				))}
			</ul>
			<div>
				<AddTodoForm onSubmitted={() => setNewTodo("")} />
			</div>
		</>
	);
}
