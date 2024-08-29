import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, index, isPlaying, activeSong, songs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlay = () => {
    dispatch(setActiveSong({ song, songs, index }));
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handleSongClick = () => {
    navigate(`/songs/${song?.key}`);
  };

  const handleArtistClick = () => {
    navigate(`/artists/${song?.artists[0]?.adamid}`);
  };

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
        <img
          alt="image_song"
          src={song?.images?.coverart || song?.images?.default}
        />
      </div>
      <div className="flex flex-col mt-4">
        <button
          className="font-semibold text-lg text-white truncate"
          onClick={handleSongClick}
          type="button"
        >
          {song?.title || song?.heading?.title}
        </button>
        <button
          className="mt-1 text-sm text-gray-300 truncate"
          onClick={handleArtistClick}
          type="button"
        >
          {song?.subtitle || song?.heading?.subtitle}
        </button>
      </div>
    </div>
  );
};

export default SongCard;
