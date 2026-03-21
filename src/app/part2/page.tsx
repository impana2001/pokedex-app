"use client";

import { trpc } from "@/utils/trpc";
import PokedexTable from "@/components/PokedexTable";

export default function Part2() {
  const { data, isLoading } = trpc.pokemon.getPokemonBatch.useQuery([
    "Bulbasaur",
    "Charmander",
    "Squirtle",
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Pokemon found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Part 2 - Multiple Pokemon</h1>
      <PokedexTable pokemons={data} />
    </div>
  );
}