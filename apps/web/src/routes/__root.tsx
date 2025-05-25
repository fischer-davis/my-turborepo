import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTRPC } from "../utils/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  // const { data: session, isPending } = authClient.useSession();
  // const router = useRouter();
  //
  // useEffect(() => {
  //   if (isPending) return;
  //
  //   if (!session) {
  //     router.navigate({ to: "/signin" });
  //   } else {
  //     router.navigate({ to: "/" });
  //   }
  // }, [isPending]);

  const trpc = useTRPC();
  const { isPending } = useQuery(trpc.file.hello.queryOptions());

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">My App</div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/posts" className="hover:text-gray-300">Posts</Link>
            <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto">
        <Outlet />
      </main>
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
