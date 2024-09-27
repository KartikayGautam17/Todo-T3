import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todos.findMany({
      where: {
        id: ctx.session.user.id,
      },
    });
    console.log(
      "Prisma Todos " + todos.map(({ id, text, done }) => ({ id, text, done })),
    );
    return [
      {
        id: "fake",
        text: "fake text1",
        done: false,
      },
      {
        id: "fake",
        text: "fake text2",
        done: true,
      },
    ];
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
        },
      });
    }),
});
