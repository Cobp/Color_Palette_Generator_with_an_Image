"use client";
import { useState, useRef, useEffect } from "react";
import { IconChevron, IconLinkUp } from "@/Icons/mainIcons.jsx";
import { useSession } from "next-auth/react";

const DropdownNavigate = ({ MenuSelected }) => {
  const [showSelected, setShowSelected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const { data: session, status } = useSession();

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
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center text-sm pl-4 pr-2 py-1.5 select-none cursor-pointer rounded-md transition duration-300 hover:bg-white/10 gap-1 border-2 border-transparent ${
          showSelected ? "border-white/10" : "transparent"
        }`}
      >
        Browser
        <i
          className={`w-5 h-5  transition-transform origin-center ${
            showSelected ? "rotate-180" : "rotate-0"
          }`}
        >
          <IconChevron />
        </i>
      </button>
      {showSelected && (
        <div className="absolute top-full">
          <div className="flex flex-col mt-1.5 text-sm bg-[#323737] shadow-2xl rounded-md w-60 h-fit border border-[#4c5454] p-1">
            {MenuSelected.map((item, index) => {
              return (
                <>
                  {item.disabled ? (
                    <div
                      key={index}
                      className={`group flex items-center justify-between pl-4 pr-2 py-2 select-none cursor-pointer rounded hover:bg-white/10 ${
                        item.disabled ? "opacity-50" : ""
                      }`}
                    >
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 text-xs text-white bg-red-500 rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                      {item.disabled ? (
                        ""
                      ) : (
                        <i className="size-5 opacity-0 group-hover:opacity-100">
                          <IconLinkUp />
                        </i>
                      )}
                    </div>
                  ) : (
                    <a
                      key={index}
                      href={item.link}
                      className={`group flex items-center justify-between pl-4 pr-2 py-2 select-none cursor-pointer rounded hover:bg-white/10 ${
                        item.disabled ? "opacity-50" : ""
                      }`}
                    >
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 text-xs text-white bg-red-500 rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                      {item.disabled ? (
                        ""
                      ) : (
                        <i className="size-5 opacity-0 group-hover:opacity-100">
                          <IconLinkUp />
                        </i>
                      )}
                    </a>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNavigate;
