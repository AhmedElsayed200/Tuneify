import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({
  songs = [],
  artistId = '',
  isPlaying = false,
  activeSong = null,
  handlePause = () => {},
  handlePlay = () => {},
}) => (
  <div className="flex flex-col">
    <h1 className="text-3xl font-bold text-white">Related Songs</h1>

    <div className="mt-6 w-full flex flex-col">
      {songs.length > 0 ? (
        songs.map((song, index) => (
          <SongBar
            key={`${artistId}-${song.key}-${index}`}
            song={song}
            index={index}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        ))
      ) : (
        <p className="text-gray-400 text-base">No related songs available.</p>
      )}
    </div>
  </div>
);

export default RelatedSongs;
