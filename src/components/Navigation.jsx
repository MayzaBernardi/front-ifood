'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";



export default function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {sidebarOpen && (
                <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col p-6 transition-transform">
                    <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
                        <span className="text-ifood font-bold text-xl uppercase tracking-wider">
                            Portal do Parceiro
                        </span>
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                            <MdClose size={24} className="text-gray-500 hover:text-ifood" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link 
                            href="/" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-red-50 hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <RiHome4Line size={20} /> Home
                        </Link>
                        <Link 
                            href="/gestorDePedidos" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-red-50 hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <LiaClipboardListSolid size={20} /> Gestor de Pedidos
                        </Link>
                        <Link 
                            href="/visualizarMenu" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-red-50 hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <BiSolidFoodMenu size={20} /> Gerenciar Cardápio
                        </Link>
                        <Link 
                            href="/Entregadores" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-red-50 hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaMotorcycle size={20} /> Entregadores
                        </Link>
                    </nav>
                </aside>
            )}

            <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-ifood hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
                    >
                        <FiMenu size={26} />
                    </button>

                    <div className="relative w-32 h-12 hidden sm:block">
                        <Image
                            src="/FavFood.png"
                            alt="Logo FavFood"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 gap-3 focus-within:ring-1 focus-within:ring-ifood transition-shadow">
                        <FiSearch className="text-gray-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="O que você procura?" 
                            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
                        <FaLocationDot className="text-ifood" size={20} />
                    </div>

                    <button className="flex items-center justify-center p-2 text-ifood hover:bg-red-50 rounded-full transition-colors">
                        <FiUser size={24} />
                    </button>

                    <Link href="/visualizarMenu" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <BiSolidFoodMenu className="text-ifood" size={24} />
                    </Link>
                </div>
            </header>
        </>
    );
}