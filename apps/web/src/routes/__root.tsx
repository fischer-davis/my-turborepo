import { authClient } from "@repo/auth/auth-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Link,
	Outlet,
	createRootRoute,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (isPending) return;

		console.log(session);
		if (!session) {
			router.navigate({ to: "/signin" });
		} else {
			router.navigate({ to: "/" });
		}
	}, [isPending]);

	return (
		<>
			{session && (
				<nav className="bg-gray-800 p-4 text-white">
					<div className="container mx-auto flex items-center justify-between">
						<div className="font-bold text-xl">My App</div>
						<div className="flex space-x-4">
							<Link to="/" className="hover:text-gray-300">
								Home
							</Link>
							<Link to="/posts" className="hover:text-gray-300">
								Posts
							</Link>
							<Link to="/settings" className="hover:text-gray-300">
								Settings
							</Link>
						</div>
					</div>
				</nav>
			)}
			<main className="container mx-auto">
				<Outlet />
			</main>
			<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
			<TanStackRouterDevtools position="bottom-left" />
		</>
	);
}
