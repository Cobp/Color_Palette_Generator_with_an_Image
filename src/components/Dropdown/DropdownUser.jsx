"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { IconLinkUp, IconLogOut } from "@/Icons/mainIcons.jsx";
import Avvvatars from "avvvatars-react";

const DropdownUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { data: session, status } = useSession();

  const Name = session?.user?.name || "CG";

  const MenuSelected = [
    { name: "Profile", link: `/profile/${Name}` },
    { name: "Favorites", link: "/favorites" },
    { name: "Settings", link: "/settings" },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        type="button"
        onClick={handleClick}
        className="focus-visible:ring-1 rounded-md"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            onError={(e) => (e.target.src = "/images/designer.webp")}
            alt="avatar"
            className="rounded-full w-[30px] h-[30px] "
          />
        ) : (
          <Avvvatars value={Name} style={Name} size={30} shadow />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full right-0">
          <div className="flex flex-col mt-1.5 text-sm bg-[#323737] shadow-2xl rounded-md w-48 h-fit border border-[#4c5454]">
            <div className="flex items-center gap-3 mx-1 mt-1 p-2 select-none border-b border-[#4c5454] whitespace-nowrap text-ellipsis overflow-hidden">
              <a href="/settings">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    onError={(e) => (e.target.src = "/images/designer.webp")}
                    alt="avatar"
                    className="rounded-full size-10"
                  />
                ) : (
                  <Avvvatars value={Name} style={Name} size={40} shadow />
                )}
              </a>
              <p className="font-medium">{Name}</p>
            </div>
            <div className="m-1 flex flex-col">
              {MenuSelected.map((items, index) => {
                return (
                  <a
                    key={index}
                    href={items.link}
                    className="group flex items-center justify-between pl-4 pr-2 py-2 select-none cursor-pointer rounded hover:bg-white/10"
                  >
                    {items.name}
                    <i className="size-5 opacity-0 group-hover:opacity-100">
                      <IconLinkUp />
                    </i>
                  </a>
                );
              })}
            </div>
            <div
              role="separate"
              className="mx-1 border-t border-[#4c5454]"
            ></div>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="m-1 flex items-center justify-between pl-4 pr-2 py-2 select-none cursor-pointer rounded hover:bg-white/10"
            >
              Log out
              <i className="size-5">
                <IconLogOut />
              </i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
