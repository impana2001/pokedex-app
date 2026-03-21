"use client";

import { trpc } from "@/utils/trpc";
import PokemonRow from "@/components/PokemonRow";

export default function Part1() {
  const { data, isLoading } = trpc.pokemon.getPokemon.useQuery("Bulbasaur");

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Pokemon found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Part 1 - Single Pokemon</h1>
      <PokemonRow pokemon={data} />
    </div>
  );
}