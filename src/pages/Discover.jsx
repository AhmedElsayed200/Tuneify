import { useState } from 'react';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/APIs/libraryAPI';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Discover = () => {
  const [selectedGenre, setSelectedGenre] = useState(`${genres[0]?.value}`);
  const {
    data: songs,
    isFetching,
    error,
  } = useGetSongsByGenreQuery(selectedGenre);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  console.log(songs);

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

      <div className="flex flex-wrap justify-center gap-10 sm:justify-start">
        {songs?.data?.map((song, i) => (
          <SongCard key={song.id} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
