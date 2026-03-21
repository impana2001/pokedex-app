type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

export default function PokemonRow({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <p><strong>ID:</strong> {pokemon.id}</p>
      <p><strong>Name:</strong> {pokemon.name}</p>
      <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
}