'use client';
import { useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaHamburger } from "react-icons/fa";

export default function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setSidebarOpen(true)}
                className="absolute top-4 left-6 p-2 bg-[#000000] rounded-lg shadow-md hover:bg-[#eaeeee] z-30"
            >
                <FaHamburger className="text-[#b7d0df] flex divide-x divide-white" />
            </button>

            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed left-0 top-0 h-full w-64 bg-[#c2e2e2] shadow-2xl z-50 flex flex-col p-6">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-2 text-[#0c0304]">
                                <span className="text-[#070707] font-bold text-xl uppercase">Menu</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)}>
                                <MdClose size={24} className="text-gray-500 hover:text-black" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-4">
                            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg text-[#070707] font-bold" onClick={() => setSidebarOpen(false)}>
                                <RiHome4Line size={20} /> Home
                            </Link>
                            <Link href="/tarefas" className="flex items-center gap-3 p-3 rounded-lg text-[#070707] font-bold" onClick={() => setSidebarOpen(false)}>
                                <LiaClipboardListSolid size={20} /> Minhas Tarefas
                            </Link>
                        </nav>
                    </aside>
                </>
            )}

            <header className="w-full bg-[#070c0c] shadow-sm p-4 flex items-center justify-between pl-20 pr-8 z-20 relative">
                <div className="font-bold text-xl text-[#e9eff3] uppercase tracking-wider">
                    Minhas Tarefas
                </div>
            </header>
            <hr className="border-t-8 bg-[#f8f8f8]"></hr>
        </>
    );
}