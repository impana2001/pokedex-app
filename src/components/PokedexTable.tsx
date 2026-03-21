type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

export default function PokedexTable({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} style={{ marginBottom: "20px" }}>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Name:</strong> {pokemon.name}</p>
          <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
          <img src={pokemon.sprite} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
}