"use client";

import DropdownNavigate from "@/Components/Dropdown/DropdownNavigate.jsx";
import DropdownUser from "@/Components/Dropdown/DropdownUser.jsx"
import { IconGithub } from "@/Icons/mainIcons.jsx";
import { useSession } from "next-auth/react";
import Sheet from "../Sheet.jsx";

const Navbar = () => {
  const { status } = useSession();

  const MenuSelected = [
    { name: "Extract colors", link: "/editor", disabled: false },
    { name: "Community Photo Gallery", link: "/gallery", disabled: false },
    { name: "AI Image Analysis", link: "/ai", disabled: true, badge: "Soon" },
  ];

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
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 px-4 py-1.5 relative text-center bg-[var(--Foreground-Colour)] text-[var(--Background-Colour)] hover:bg-slate-100/70"
          >
            Project
          </a>
          <div className="shrink-0 bg-white h-6 w-[1px]"></div>
          <DropdownNavigate MenuSelected={MenuSelected} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <a
            href="https://github.com/Cobp"
            target="_blank"
            className="p-0.5 w-8 h-8 rounded-md transition hover:bg-white/10"
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
            <DropdownUser/>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
