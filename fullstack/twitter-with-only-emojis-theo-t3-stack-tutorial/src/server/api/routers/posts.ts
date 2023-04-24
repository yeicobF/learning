import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  // Un procedure es un método para generar una función que se llama desde el
  // cliente. Al ser público, indicamos que cualquier usuario puede acceder a
  // los posts.
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
