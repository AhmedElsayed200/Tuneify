import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const artistId = track?.artists?.[0]?.adamid;
    if (artistId) {
      navigate(`/artists/${artistId}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation();
    }
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={handleNavigation}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <img
        alt={`${track?.subtitle} cover art`}
        src={track?.images?.coverart || '/default-cover-art.png'}
        className="w-full h-56 rounded-lg object-cover"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle || 'Unknown Artist'}
      </p>
    </div>
  );
};

export default ArtistCard;
