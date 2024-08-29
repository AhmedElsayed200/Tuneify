import React from 'react';
import { ArtistCard, Error, Loader } from '../components';
import { useGetSongsByGenreQuery } from '../redux/APIs/libraryAPI';

const TopArtists = () => {
  const { data, isFetching, error } = useGetSongsByGenreQuery('56890076');

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  const artists = data?.tracks || [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <ArtistCard key={artist.key} track={artist} />
          ))
        ) : (
          <p className="text-gray-400">No top artists found.</p>
        )}
      </div>
    </div>
  );
};

export default TopArtists;
