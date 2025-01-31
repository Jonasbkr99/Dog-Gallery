import React, { useEffect, useState } from 'react';
import BreedSelector from './components/BreedSelector';
import ShuffleButton from './components/ShuffleButton';
import ImageWithFrame from './components/ImageWithFrame';

type DogApiResponse = {
  message: {
    [breed: string]: string[];
  };
  status: string;
};

export const App: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [shuffleDisabled, setShuffleDisabled] = useState(false);

  // Fetch breed list
  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data: DogApiResponse = await response.json();

      const flatBreeds = Object.entries(data.message).flatMap(([breed, subBreeds]) =>
        subBreeds.length > 0
          ? subBreeds.map((subBreed) => `${breed}/${subBreed}`)
          : breed
      );
      setBreeds(flatBreeds);
      setSelectedBreed(flatBreeds[0]);
    };

    fetchBreeds();
  }, []);

  // Fetch image when selected breed changes
  useEffect(() => {
    if (!selectedBreed) return;

    const fetchImage = async () => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random`
      );
      const data = await response.json();
      setImageUrl(data.message);
      document.title = `${selectedBreed} Bilder`;
    };

    fetchImage();
  }, [selectedBreed]);

  // Handle shuffle button click
  const handleShuffle = async () => {
    setShuffleDisabled(true);

    const response = await fetch(
      `https://dog.ceo/api/breed/${selectedBreed}/images/random`
    );
    const data = await response.json();
    setImageUrl(data.message);

    setTimeout(() => setShuffleDisabled(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Hunde Suchmaschine ale Becker</h1>
      <BreedSelector
        breeds={breeds}
        selectedBreed={selectedBreed}
        onSelect={setSelectedBreed}
      />
      <div className="my-6">
        <ImageWithFrame src={imageUrl} />
      </div>
      <ShuffleButton onClick={handleShuffle} disabled={shuffleDisabled} />
    </div>
  );
};

export default App;