import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ onLinkClick }) => (
  <div className="mt-10">
    {links.map(({ name, to, icon: Icon }) => (
      <NavLink
        key={name}
        to={to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={onLinkClick}
      >
        <Icon className="w-6 h-6 mr-2" />
        {name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img
          src={logo}
          alt="Company Logo"
          className="w-full h-14 object-contain"
        />
        <NavLinks />
      </div>

      {/* Mobile sidebar toggle button */}
      <div className="absolute md:hidden block top-6 right-3">
        {isMobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white"
            onClick={handleMobileMenuToggle}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white"
            onClick={handleMobileMenuToggle}
          />
        )}
      </div>

      {/* Mobile sidebar menu */}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="w-full h-14 object-contain"
        />
        <NavLinks onLinkClick={handleMobileMenuToggle} />
      </div>
    </>
  );
};

export default Sidebar;
