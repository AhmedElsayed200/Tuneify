import { useState } from 'react';
import { genres } from '../assets/constants';

const Discover = () => {
  const [selectedGenre, setSelectedGenre] = useState(`${genres[0]?.value}`);

  return (
    <div>
      <div className="w-full flex justify-between items-center flex-col mt-4 mb-10 sm:flex-row">
        <h2 className="text-white font-bold text-3xl">
          Discover {selectedGenre}
        </h2>
        <select
          className="bg-black text-white text-xs rounded-lg w-[100px] p-2 focus:border-none focus:outline-none"
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          {genres.map((genre) => (
            <option key={genre.title} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Discover;
