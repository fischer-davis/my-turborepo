import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "@repo/trpc";

export const { TRPCProvider, useTRPC } =
  createTRPCContext<AppRouter>();


