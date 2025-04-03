import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "@repo/trpc/root";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
