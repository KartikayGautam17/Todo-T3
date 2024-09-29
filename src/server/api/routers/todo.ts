import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todos.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    console.log("SERVER SIDE TODOS LENGTH " + todos.length);
    return todos;
  }),
  create: publicProcedure.input(todoInput).mutation(async ({ ctx, input }) => {
    return await ctx.db.todos.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.db.todos.delete({
      where: {
        id: input,
      },
    });
  }),
  toggle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.db.todos.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
          updatedAt: new Date(),
        },
      });
    }),
});
