import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";

export const Route = createFileRoute("/_authenticated/posts")({
	component: Posts,
});

function Posts() {
	const trpc = useTRPC();
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery(trpc.post.getAllPosts.queryOptions());

	if (isLoading) {
		return (
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-4xl">
					<h1 className="mb-4 font-bold text-2xl">Posts</h1>
					<p>Loading posts...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-4xl">
					<h1 className="mb-4 font-bold text-2xl">Posts</h1>
					<p className="text-red-500">Error loading posts: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-4xl">
				<h1 className="mb-4 font-bold text-2xl">Posts</h1>

				{posts && posts.length > 0 ? (
					<div className="space-y-4">
						{posts.map((post) => (
							<div key={post.id} className="rounded-lg border p-4">
								<h2 className="font-semibold text-xl">{post.title}</h2>
								<p className="mt-2">{post.content}</p>
								<div className="mt-2 text-gray-500 text-sm">
									Posted on {new Date(post.createdAt).toLocaleDateString()}
								</div>
							</div>
						))}
					</div>
				) : (
					<p>No posts found.</p>
				)}
			</div>
		</div>
	);
}
