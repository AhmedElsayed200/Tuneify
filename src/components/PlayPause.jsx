import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
  song,
  handlePause,
  handlePlay,
  isPlaying,
  activeSong,
}) => {
  if (isPlaying && activeSong?.title === song?.title) {
    return (
      <FaPauseCircle
        size={35}
        className="text-gray-300"
        onClick={handlePause}
      />
    );
  }

  return (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
