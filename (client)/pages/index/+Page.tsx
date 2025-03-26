import { useSubscription } from "@trpc/tanstack-react-query";
import { useTRPC } from "../../../trpc/client.js";
import { Counter } from "./Counter.jsx";

export default function Page() {
	const trpc = useTRPC();
	const { data, status } = useSubscription(
		trpc.testSubscription.subscriptionOptions(undefined, {
			enabled: true,
		}),
	);
	return (
		<>
			<h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
			This page is:
			<ul>
				<li>Rendered to HTML.</li>
				<li>
					Interactive. <Counter />
				</li>
			</ul>
			<div>
				<h2>Data from server: ${status}</h2>
				<p>Magic number: {data}</p>
			</div>
		</>
	);
}
