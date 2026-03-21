"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import PokedexTable from "./PokedexTable";
import PokemonTypeSelection from "./PokemonTypeSelection";

export default function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>();

  const { data, isLoading } =
    selectedType
      ? trpc.pokemon.getPokemonByType.useQuery(selectedType)
      : trpc.pokemon.getPokemonBatch.useQuery([
          "Bulbasaur",
          "Charmander",
          "Squirtle",
        ]);

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No Pokemon found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pokedex</h1>

      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
      />

      <PokedexTable pokemons={data} />
    </div>
  );
}