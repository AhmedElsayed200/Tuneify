import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import {
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
} from '../redux/APIs/libraryAPI';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const { data: artistSongs } = useGetArtistSongsQuery(artistId);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  console.log(artistSongs);

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        songs={artistSongs?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
