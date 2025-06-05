import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useTRPC } from "../utils/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const trpc = useTRPC();
	const { data, isPending: isPendingHello } = useQuery(
		trpc.file.hello.queryOptions(),
	);

	if (isPendingHello) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-4xl text-center">
				<h1 className="mb-6 font-bold text-4xl">Welcome to My App</h1>
				<div>{data}</div>
				<p className="mb-8 text-xl">
					A simple application with tRPC and TanStack Router
				</p>

				<div className="flex justify-center space-x-4">
					<Link
						to="/posts"
						className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600"
					>
						View Posts
					</Link>
					<Link
						to="/settings"
						className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 hover:bg-gray-300"
					>
						Settings
					</Link>
				</div>
			</div>
		</div>
	);
}
