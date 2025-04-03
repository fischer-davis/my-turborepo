import { db } from "@repo/db";
import {
  CreateFastifyContextOptions,
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { AppRouter, appRouter } from "./root";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, db };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

// Register tRPC router with Fastify
const registerTrpc = (app: any) => {
  app.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });
};

export default registerTrpc;
