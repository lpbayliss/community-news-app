import type { ReactNode } from "react";
import { authClient } from "../../auth/client";

import "./style.css";
import "./tailwind.css";

export default function Layout({ children }: { children: ReactNode }) {
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
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo and Brand */}
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
																<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-label="Community News Logo">
								<title>Community News Logo</title>
								<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
								<path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
							</svg>
								</div>
							</div>
							<div className="flex flex-col">
								<h1 className="text-xl font-bold text-gray-900">Community News</h1>
								<p className="text-xs text-gray-500 hidden sm:block">Stay connected with your community</p>
							</div>
						</div>

						{/* User Section */}
						<div className="flex items-center space-x-4">
							{/* User Greeting */}
							<div className="hidden sm:block">
								{!data?.user && (
									<span className="text-gray-600 font-medium">Welcome, Guest!</span>
								)}
								{data?.user && (
									<div className="flex items-center space-x-2">
										<div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
											<span className="text-sm font-semibold text-white">
												{data.user.name?.[0]?.toUpperCase() || 'U'}
											</span>
										</div>
										<span className="text-gray-700 font-medium">
											Hello, {data.user.name}!
										</span>
									</div>
								)}
							</div>

							{/* Auth Buttons */}
							<div className="flex items-center space-x-2">
								{!data?.user && (
									<button
										type="button"
										onClick={handleSignIn}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
									>
																		<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-label="User Icon">
									<title>User Icon</title>
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
										Sign In
									</button>
								)}
								{data?.user && (
									<button
										type="button"
										onClick={handleSignOut}
										className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
									>
																		<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Sign Out Icon">
									<title>Sign Out Icon</title>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
										Sign Out
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
}
