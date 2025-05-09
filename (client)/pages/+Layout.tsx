import type { ReactNode } from "react";
// import { authClient } from "../../auth/client";

import "./style.css";
import "./tailwind.css";

export default function Layout({ children }: { children: ReactNode }) {
	// const { data } = authClient.useSession();

	// const handleSignIn = async () => {
	// 	await authClient.signIn.social({
	// 		provider: "github",
	// 		callbackURL: window.location.href,
	// 	});
	// };

	// const handleSignOut = async () => {
	// 	await authClient.signOut({
	// 		fetchOptions: {
	// 			onSuccess: async () => {
	// 				alert("You have been signed out");
	// 			},
	// 		},
	// 	});
	// };

	return <div>{children}</div>;
}
