import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongInfoQuery,
  useGetRelatedSongsQuery,
} from '../redux/APIs/libraryAPI';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetRelatedSongsQuery(songid);

  const {
    data: songInfo,
    isFetching: isFetchingSongInfo,
    error: songInfoError,
  } = useGetSongInfoQuery(songid);

  if (isFetchingSongInfo || isFetchingRelatedSongs) {
    return <Loader />;
  }

  if (songInfoError || relatedSongsError) {
    return <Error />;
  }

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ song, songs: relatedSongs.tracks, index }));
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songInfo} />

      <section className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songInfo?.sections[1]?.type === 'LYRICS' ? (
            songInfo.sections[1].text.map((line, index) => (
              <p
                key={`lyrics-${index}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </section>

      <RelatedSongs
        songs={relatedSongs?.tracks}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
};

export default SongDetails;
