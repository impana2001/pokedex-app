type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

export default function PokemonTypeSelection({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>Select Type: </label>

      <select
        value={selectedType || ""}
        onChange={(e) =>
          selectType(e.target.value || undefined)
        }
      >
        <option value="">All</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
      </select>
    </div>
  );
}