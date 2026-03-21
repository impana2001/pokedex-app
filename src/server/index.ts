import { createTRPCRouter } from "./trpc";
import { pokemonRouter } from "./routers/pokemon";

export const appRouter = createTRPCRouter({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;