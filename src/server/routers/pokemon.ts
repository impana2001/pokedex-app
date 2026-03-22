import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

const POKEMON_DATA = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 2,
    name: "Charmander",
    types: ["fire"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 3,
    name: "Squirtle",
    types: ["water"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
];

export const pokemonRouter = createTRPCRouter({
  getPokemonBatch: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const result = POKEMON_DATA.filter((p) =>
        input.includes(p.name)
      );

      return result.length > 0 ? result : POKEMON_DATA;
    }),

  getPokemonByType: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return POKEMON_DATA.filter((p) =>
        p.types.some((type) =>
          type.toLowerCase().includes(input.toLowerCase())
        )
      );
    }),

  getPokemon: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const pokemon = POKEMON_DATA.find(
        (p) => p.name.toLowerCase() === input.toLowerCase()
      );

      return (
        pokemon || {
          id: 1,
          name: input,
          types: ["unknown"],
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }
      );
    }),
});