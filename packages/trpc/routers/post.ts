import { desc } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { posts } from "@repo/db/schema";

export const postRouter = router({
  // Get all posts
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const tables = await ctx.db.select().from(posts).orderBy(desc(posts.createdAt));
    console.log('Available tables:', tables);


    return ctx.db.select().from(posts).orderBy(desc(posts.createdAt));
  }),
  
  // Get a single post by ID
  getPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.db
        .select()
        .from(posts)
        .where(posts.id === input.id)
        .limit(1);
      
      return post[0] || null;
    }),
  
  // Create a new post
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        authorId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(posts).values({
        title: input.title,
        content: input.content,
        authorId: input.authorId,
      });
      
      return { success: true };
    }),
  
  // Update an existing post
  updatePost: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateData: Record<string, unknown> = {
        updatedAt: new Date(),
      };
      
      if (input.title) updateData.title = input.title;
      if (input.content) updateData.content = input.content;
      
      await ctx.db
        .update(posts)
        .set(updateData)
        .where(posts.id === input.id);
      
      return { success: true };
    }),
  
  // Delete a post
  deletePost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(posts)
        .where(posts.id === input.id);
      
      return { success: true };
    }),
});