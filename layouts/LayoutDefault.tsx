import type { ReactNode } from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link";
import { authClient } from "../auth/client";

import "./style.css";
import "./tailwind.css";

export default function LayoutDefault({ children }: { children: ReactNode }) {
	const { data } = authClient.useSession();

	const handleSignIn = async () => {
		await authClient.signIn.social({
			provider: "github",
			callbackURL: window.location.href,
		});
	};

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					alert("You have been signed out");
				},
			},
		});
	};

	return (
		<div className={"flex max-w-5xl m-auto"}>
			<Sidebar>
				<Logo />
				{!data?.session && (
					<button type="button" onClick={handleSignIn}>
						Sign in
					</button>
				)}
				{data?.session && (
					<button type="button" onClick={handleSignOut}>
						Sign out
					</button>
				)}
				{data?.user.name ? (
					<Link href="/">{`Welcome, ${data.user.name}`}</Link>
				) : (
					<Link href="/">Welcome</Link>
				)}
				<Link href="/todo">Todo</Link>
				<Link href="/star-wars">Data Fetching</Link>
				{""}
			</Sidebar>
			<Content>{children}</Content>
		</div>
	);
}

function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div
			id="sidebar"
			className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
		>
			{children}
		</div>
	);
}

function Content({ children }: { children: React.ReactNode }) {
	return (
		<div id="page-container">
			<div id="page-content" className={"p-5 pb-12 min-h-screen"}>
				{children}
			</div>
		</div>
	);
}

function Logo() {
	return (
		<div className={"p-5 mb-2"}>
			<a href="/">
				<img src={logoUrl} height={64} width={64} alt="logo" />
			</a>
		</div>
	);
}
