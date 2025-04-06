import { desc } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { files } from "@repo/db/schema";

export const fileRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello World";
  }),
  saveFileMetadata: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("Received input:", input);
      const newFile = await ctx.db.insert(files).values({
        id: input.id,
        name: input.name,
        size: input.size,
      });

      return { success: true, file: newFile };
    }),
  deleteFiles: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      //TODO: Delete files from db.
      return { success: true };
    }),
  getUploadedFiles: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(files).orderBy(desc(files.createdAt));
  }),
});
