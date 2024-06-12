"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ImagenColorExtractor from "@/Components/ImagenColorExtractor/ImagenColorExtractor.jsx";
import { IconFavorite, IconExpand, IconLogIn } from "@/Icons/mainIcons";
import DropdownUser from "@/Components/Dropdown/DropdownUser";


const EditorPage = () => {
    const { status } = useSession();
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);
    return (
        <div className="w-full h-screen flex flex-col">
            <nav className="w-full h-fit py-3 px-4 flex items-center justify-between bg-[#232626] shadow-sm shadow-black/50 z-30">
                Inicio
                {status !== "authenticated" ? (
                    <a
                        href="/login"
                        className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1.5 relative text-center bg-[var(--Foreground-Colour)] text-[var(--Background-Colour)] hover:bg-slate-100/70"
                    >
                        Login
                    </a>
                ) : (
                    <DropdownUser />
                )}
            </nav >
            <div className="flex w-full h-full">
                <aside className={`group w-full bg-[#292b2b] border-r border-[#323737] transition-all ease ${isOpen ? "max-w-[250px] " : "max-w-14"}`}>
                    <div className="w-full h-fit flex items-center justify-between p-3 border-b border-[#323737] ">
                        {/* <i className={isOpen ? "h-5" : "h-0 w-0"}>
                            <IconFavorite />
                        </i> */}
                        <p className={`overflow-hidden text-nowrap transition-all ease-in-out ${isOpen ? 'w-fit': 'w-0'}`}>Image Editor</p>
                        <button type="button" className={`size-8 p-2 rounded-md origin-center ${isOpen ? 'rotate-0 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition ease-in-out' : 'rotate-180 bg-white/10 hover:bg-white/20'}`} onClick={() => setIsOpen(!isOpen)}><IconExpand /></button>
                    </div>
                    <div>
                        <p>
                            edit
                        </p>
                    </div>
                </aside>
                <main className="w-full">
                    <ImagenColorExtractor />
                </main>
            </div>
        </div >
    )
}

export default EditorPage
