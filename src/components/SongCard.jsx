import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, index, isPlaying, activeSong, songs }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setActiveSong({ song, songs, index }));
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  console.log(song);

  return (
    <div className="w-[250px] flex flex-col p-4 bg-white/5 bg-opacity-80 rounded-lg cursor-pointer backdrop-blur-sm animate-slideup">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song?.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img alt="image_song" src={song?.images?.coverart} />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          <Link to={`artists/${song?.artists[0]?.adamid}`}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
