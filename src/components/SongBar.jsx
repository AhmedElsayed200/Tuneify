import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

const SongBar = ({
  song,
  index,
  artistId,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => {
  const isActive = activeSong?.title === song?.title;
  const artworkUrl = artistId
    ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')
    : song?.images?.coverart;

  const albumNameOrSubtitle = artistId
    ? song?.attributes?.albumName
    : song?.subtitle;

  return (
    <div
      className={`w-full flex items-center py-2 p-4 mb-2 rounded-lg cursor-pointer ${
        isActive ? 'bg-[#4c426e]' : 'hover:bg-[#4c426e] bg-transparent'
      }`}
    >
      <h3 className="text-white font-bold text-base mr-3">{index + 1}.</h3>
      <div className="flex-1 flex items-center justify-between">
        <img
          className="w-20 h-20 rounded-lg"
          src={artworkUrl}
          alt={song?.title || 'Song artwork'}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {artistId ? (
            <p className="text-white text-xl font-bold">
              {song?.attributes?.name}
            </p>
          ) : (
            <Link to={`/songs/${song.key}`}>
              <p className="text-white text-xl font-bold">{song?.title}</p>
            </Link>
          )}
          <p className="text-gray-300 text-base mt-1">{albumNameOrSubtitle}</p>
        </div>
      </div>
      {!artistId && (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePause}
          handlePlay={() => handlePlay(song, index)}
        />
      )}
    </div>
  );
};

export default SongBar;
