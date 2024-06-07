"use client";
import { useState, useEffect, useRef } from "react";
import { IconHamburguer, IconX, IconGoat } from "@/Icons/mainIcons";

function Sheet({ children }) {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const sheetRef = useRef(null);

  const toggleSheet = () => {
    setIsSheetVisible(!isSheetVisible);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsSheetVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (sheetRef.current && !sheetRef.current.contains(event.target)) {
      setIsSheetVisible(false);
    }
  };

  useEffect(() => {
    if (isSheetVisible) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSheetVisible]);

  return (
    <div className="flex items-center gap-2 md:hidden">
      <button
        onClick={toggleSheet}
        className="p-1.5 rounded-md cursor-pointer outline-none hover:bg-zinc-800/20 dark:hover:bg-zinc-800 dark:focus:outline-white focus:outline-zinc-800 focus:outline-2 transition-all"
      >
        <IconHamburguer/>
      </button>
      <div
        className={`fixed inset-0 h-[100vh] z-[999] transform transition-transform duration-300 ${
          isSheetVisible ? "bg-black/60" : "-translate-x-full"
        }`}
      >
        <div
          ref={sheetRef}
          className={`relative flex flex-col z-50 px-6 py-6 ease-in-out inset-y-0 left-0 h-full w-3/4 sm:max-w-sm bg-zinc-800 transform transition-transform duration-300 ${
            isSheetVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={toggleSheet}
            className="absolute right-6 top-6 size-8 p-1.5 ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary text-white hover:bg-zinc-700 rounded-md hover:text-gray-300"
          >
            <IconX/>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sheet;
