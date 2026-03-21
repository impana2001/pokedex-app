import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const pokemonRouter = createTRPCRouter({
  getPokemonBatch: publicProcedure
  .input(z.array(z.string()))
  .query(async ({ input }) => {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        name: {
          in: input,
        },
      },
    });

    return pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.split(","),
      sprite: pokemon.sprite,
    }));
  }),
  getPokemonByType: publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const pokemons = await prisma.pokemon.findMany();

    return pokemons
      .filter((pokemon) =>
        pokemon.types.toLowerCase().includes(input.toLowerCase())
      )
      .map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(","),
        sprite: pokemon.sprite,
      }));
  }),
  getPokemon: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findUnique({
        where: { name: input },
      });

      if (!pokemon) return null;

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(","), // convert string → array
        sprite: pokemon.sprite,
      };
    }),
});