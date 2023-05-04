import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    // La validación de tipos se realiza con zod mediante Type Inference, por lo
    // que no tenemos que definir los tipos manualmente. Lo que devuelve el
    // servidor será de estos tipos de datos. Es por eso que no tenemos que
    // definir cada tipo de dato por sentencia.
    // - Podemos tener un output validator para verificar que los
    //   datos de salida sean de ciertos tipos; aunque Theo prefiere filtrar los
    //   datos por su cuenta.
    .input(
      z.object({
        username: z.string(),
      })
    )
    // No necesitamos `ctx` porque no estamos accediendo a la base de datos de
    // Prisma.
    .query(async ({ input }) => {
      // Solo tomamos el primer usuario.
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (user) {
        return filterUserForClient(user);
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found.",
      });
    }),
});
