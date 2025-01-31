import React from "react";

type BreedSelectorProps = {
  breeds: string[];
  selectedBreed: string;
  onSelect: (breed: string) => void;
};

const BreedSelector: React.FC<BreedSelectorProps> = ({
  breeds,
  selectedBreed,
  onSelect,
}) => {
  return (
    <select
      className="rounded border p-2"
      value={selectedBreed}
      onChange={(e) => onSelect(e.target.value)}
    >
      {breeds.map((breed) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};

export default BreedSelector;
