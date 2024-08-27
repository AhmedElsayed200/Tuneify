import { useSelector } from 'react-redux';
import { useGetSongsByGenreQuery } from '../redux/APIs/libraryAPI';

import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  console.log(activeSong);

  const {
    data: songs,
    isFetching,
    error,
  } = useGetSongsByGenreQuery('293401556');

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  console.log(songs);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center flex-col mt-4 mb-10 sm:flex-row">
        <h2 className="text-white font-bold text-3xl">Discover</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-10 sm:justify-start">
        {songs?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            index={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            songs={songs?.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
