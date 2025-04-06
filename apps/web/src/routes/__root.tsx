import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
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
  const { data, isPending } = useQuery(trpc.file.hello.queryOptions());

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet />
      <>{data}</>
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
