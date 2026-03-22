import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedIfEmpty() {
  const count = await prisma.pokemon.count();

  if (count === 0) {
    await prisma.pokemon.createMany({
      data: [
        {
          name: "Bulbasaur",
          types: "grass,poison",
          sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
          name: "Charmander",
          types: "fire",
          sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        },
        {
          name: "Squirtle",
          types: "water",
          sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        },
      ],
    });
  }
}

export const pokemonRouter = createTRPCRouter({
  getPokemonBatch: publicProcedure
  .input(z.array(z.string()))
  .query(async ({ input }) => {
    await seedIfEmpty();
    const pokemons = await prisma.pokemon.findMany({
      where: {
        name: {
          in: input,
        },
      },
    });
if (pokemons.length === 0) {
  return [
    {
      id: 1,
      name: "Bulbasaur",
      types: ["grass"],
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
}
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
    await seedIfEmpty();
    const pokemons = await prisma.pokemon.findMany();
    if (pokemons.length === 0) {
    return [];
}
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
      await seedIfEmpty();
      const pokemon = await prisma.pokemon.findUnique({
        where: { name: input },
      });

      if (!pokemon) {
  return {
    id: 1,
    name: input,
    types: ["unknown"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  };
}

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(","), // convert string → array
        sprite: pokemon.sprite,
      };
    }),
});