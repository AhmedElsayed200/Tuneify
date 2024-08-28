/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/APIs/libraryAPI';

import 'swiper/css';
import 'swiper/css/free-mode';

// Component to display individual song in top charts
const TopChartCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  onPauseClick,
  onPlayClick,
}) => (
  <div
    className={`w-full flex items-center py-2 p-4 rounded-lg cursor-pointer mb-2 ${
      activeSong?.title === song?.title
        ? 'bg-[#4c426e]'
        : 'hover:bg-[#4c426e] bg-transparent'
    }`}
  >
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    <div className="flex-1 flex items-center justify-between">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-sm font-bold text-white">
            {song?.title?.slice(0, 60)}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={onPauseClick}
      handlePlay={onPlayClick}
    />
  </div>
);

// Component to display top charts and top artists
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetSongsByGenreQuery('109582281');
  const containerRef = useRef(null);

  const songs = data?.tracks;
  const topSongs = songs?.slice(0, 5);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [containerRef]);

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ song, songs, index }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 xl:max-w-[400px] max-w-full xl:ml-6 ml-0 xl:mb-0 mb-6 flex flex-col"
    >
      <section className="w-full flex flex-col">
        <header className="flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </header>

        <div className="mt-4 flex flex-col gap-1">
          {topSongs?.map((song, index) => (
            <TopChartCard
              key={song.key}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              onPauseClick={handlePause}
              onPlayClick={() => handlePlay(song, index)}
            />
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col mt-8">
        <header className="flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </header>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4 mb-10"
        >
          {topSongs?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <img
                  src={artist?.images?.background}
                  alt={artist?.artists[0].name}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default TopPlay;
