import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetSongsByGenreQuery } from '../redux/APIs/libraryAPI';

import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const CountryTracks = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { data } = await axios.get(
          'https://geo.ipify.org/api/v2/country?apiKey=at_9Z2QEXyAwYbOAwRw08Ruc4juqK3zf'
        );
        setCountry(data?.location?.country || 'Unknown');
      } catch (error) {
        console.error('Failed to fetch country data:', error);
        setCountry('Unknown');
      }
    };

    fetchCountry();
  }, []);

  const {
    data: songsData,
    isFetching,
    error,
  } = useGetSongsByGenreQuery('48976670');

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  const tracks = songsData?.tracks || [];

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="text-white font-bold text-3xl">
          Around You - {country}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {tracks.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            index={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
            songs={tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
