import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // determine the image URL based on whether it's artist or song data
  const imageUrl = artistId
    ? artistData?.attributes?.artwork?.url
        .replace('{w}', '500')
        .replace('{h}', '500')
    : songData?.images?.coverart;

  // determine the title based on whether it's artist or song data
  const title = artistId ? artistData?.attributes?.name : songData?.title;

  // determine the subtitle based on whether it's artist or song data
  const subtitle = !artistId ? songData?.subtitle : null;

  // determine the genre based on whether it's artist or song data
  const genre = artistId
    ? artistData?.attributes?.genreNames[0]
    : songData?.genres?.primary;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={imageUrl}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{title}</p>

          {subtitle && (
            <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-base text-gray-400 mt-2">{subtitle}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">{genre}</p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
