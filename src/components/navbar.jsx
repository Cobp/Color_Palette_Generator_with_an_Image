"use client";
import { useState } from 'react';
import { IconGoat, IconCD } from "@/Icons/mainIcons.jsx";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('#home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <header className="sticky top-0 py-2 z-50 w-full flex justify-center">
      <nav className='max-w-[1150px] w-full flex items-center justify-between'>
        <div className="flex items-center gap-2">
          <IconGoat />
          <div className="w-1 h-8 bg-[var(--Foreground-Colour)] rounded-full"></div>
          <IconCD />
        </div>
        <ul className="flex items-center gap-8">
          <li>
            <a
              href="#home"
              onClick={() => handleLinkClick('#home')}
              className={`block relative text-center hover:text-white nav-link after:content-[''] after:absolute after:rounded-full after:-top-1 after:left-2/4 after:-translate-x-2/4 after:transition-all after:bg-[var(--Foreground-Colour)] after:h-0.5 before:content-[''] before:absolute before:rounded-full before:-bottom-0.5 before:left-2/4 before:-translate-x-2/4 before:transition-all before:bg-[var(--Foreground-Colour)] before:h-0.5 ${activeLink === '#home' ? 'after:w-6 before:w-11 text-white' : 'after:w-0'}`}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={() => handleLinkClick('#about')}
              className={`block relative text-center hover:text-white nav-link after:content-[''] after:absolute after:rounded-full after:-top-1 after:left-2/4 after:-translate-x-2/4 after:transition-all after:bg-[var(--Foreground-Colour)] after:h-0.5 before:content-[''] before:absolute before:rounded-full before:-bottom-0.5 before:left-2/4 before:-translate-x-2/4 before:transition-all before:bg-[var(--Foreground-Colour)] before:h-0.5 ${activeLink === '#about' ? 'after:w-6 before:w-11 text-white' : 'after:w-0'}`}
            >
              Acerca de
            </a>
          </li>
          <li>
            <a
              href="#services"
              onClick={() => handleLinkClick('#services')}
              className={`block relative text-center hover:text-white nav-link after:content-[''] after:absolute after:rounded-full after:-top-1 after:left-2/4 after:-translate-x-2/4 after:transition-all after:bg-[var(--Foreground-Colour)] after:h-0.5 before:content-[''] before:absolute before:rounded-full before:-bottom-0.5 before:left-2/4 before:-translate-x-2/4 before:transition-all before:bg-[var(--Foreground-Colour)] before:h-0.5 ${activeLink === '#services' ? 'after:w-6 before:w-11 text-white' : 'after:w-0'}`}
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => handleLinkClick('#contact')}
              className={`block relative text-center hover:text-white nav-link after:content-[''] after:absolute after:rounded-full after:-top-1 after:left-2/4 after:-translate-x-2/4 after:transition-all after:bg-[var(--Foreground-Colour)] after:h-0.5 before:content-[''] before:absolute before:rounded-full before:-bottom-0.5 before:left-2/4 before:-translate-x-2/4 before:transition-all before:bg-[var(--Foreground-Colour)] before:h-0.5 ${activeLink === '#contact' ? 'after:w-6 before:w-11 text-white' : 'after:w-0'}`}
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
