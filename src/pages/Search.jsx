import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/APIs/libraryAPI';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  const songs = data?.data?.tracks?.hits || [];

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 font-bold text-3xl text-white">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              index={index}
            />
          ))
        ) : (
          <p className="text-gray-400">
            No results found for &quot;{searchTerm}&quot;
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
