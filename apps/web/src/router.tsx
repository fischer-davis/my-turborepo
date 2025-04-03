import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
// Import the generated route tree
import { AppRouter } from "@repo/trpc/root";
import { TRPCProvider } from "./utils/trpc";
import { routeTree } from "./routeTree.gen";

const serverPort = import.meta.env.VITE_SERVER_PORT || 3000;

export const queryClient = new QueryClient();

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      queryClient,
    },
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>Loading...</div>
    ),
    Wrap: function WrapComponent({ children }) {
      const queryClient = getQueryClient();
      const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
          links: [
            httpBatchLink({
              url: `http://localhost:${serverPort}/api/trpc`,
              transformer: superjson,
              maxURLLength: 14000,
            }),
          ],
        }),
      );
      return (
        <QueryClientProvider client={queryClient}>
          <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            {children}
          </TRPCProvider>
        </QueryClientProvider>
      );
    },
  });
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
