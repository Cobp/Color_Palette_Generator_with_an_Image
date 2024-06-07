"use client";

import Avvvatars from "avvvatars-react";
import { useState, useRef, useEffect } from "react";
import {
  IconGoat,
  IconCD,
  IconGithub,
  IconChevron,
} from "@/Icons/mainIcons.jsx";
import Sheet from "../Sheet.jsx";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [showSelected, setShowSelected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const { data: session, status } = useSession();

  // Verifica si session está definido antes de intentar acceder a sus propiedades
  const firstname = session?.user?.firstname || "Guest";

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isClicked) {
      setShowSelected(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setShowSelected(false);
    }
  };

  const handleClick = () => {
    setShowSelected(!showSelected);
    setIsClicked(!isClicked);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSelected(false);
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header
      id="header-nav"
      className="fixed top-0 py-3 md:py-6 px-3 md:px-8 z-50 w-full flex justify-center"
    >
      <nav className="w-full max-w-[85rem] flex items-center justify-between">
        <Sheet>
          <a
            href="#Hero"
            className="px-4 py-2 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10"
          >
            Home
          </a>
          <a
            href="#Services"
            className="px-4 py-2 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10"
          >
            Services
          </a>
        </Sheet>
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/"
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1.5 relative  text-center bg-[var(--Foreground-Colour)] text-[var(--Background-Colour)] hover:bg-slate-100/70"
          >
            Project
          </a>
          <div className="shrink-0 bg-white h-6 w-[1px]"></div>
          <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={handleClick}
              className={`flex items-center text-sm pl-4 py-1.5 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10 gap-1 border-2 border-transparent ${
                showSelected ? "border-white/10" : "transparent"
              }`}
            >
              About
              <i
                className={`p-0.5 w-5 h-5 transition-transform ${
                  showSelected ? "rotate-0" : "rotate-180"
                }`}
              >
                <IconChevron />
              </i>
            </button>
            {showSelected && (
              <div className="absolute top-full">
                <div className="flex flex-col mt-1.5 text-sm left-0 bg-[#323737] shadow-2xl rounded-md p-2 w-40">
                  <a
                    href="#Hero"
                    className="px-4 py-2 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10"
                  >
                    Home
                  </a>
                  <a
                    href="#Services"
                    className="px-4 py-2 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10"
                  >
                    Services
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <a
            href="https://github.com/Cobp"
            target="_blank"
            className="p-1 w-8 h-8 rounded-md transition hover:bg-white/10"
          >
            <IconGithub />
          </a>
          <div className="shrink-0 bg-white h-6 w-[1px]"></div>
          {status !== "authenticated" ? (
            <a
              href="/login"
              className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1.5 relative  text-center bg-[var(--Foreground-Colour)] text-[var(--Background-Colour)] hover:bg-slate-100/70"
            >
              Login
            </a>
          ) : (
            <>
              <Avvvatars value={firstname} size={30} shadow/>
              <button 
                type="button"
                className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1.5 relative  text-center bg-[var(--Foreground-Colour)] text-[var(--Background-Colour)] hover:bg-slate-100/70"
                onClick={() => signOut()} >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
