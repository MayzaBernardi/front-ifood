'use client';
import Image from "next/image";
import Link from "next/link"; 
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="relative w-40 h-20">
                    <Image
                        src="/FavFood.png"
                        alt="Logo FavFood"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 gap-3 focus-within:ring-1 focus-within:ring-[#ea1d2c] transition-shadow">
                    <FiSearch className="text-btn-edit" size={20} />
                    <input 
                        type="text" 
                        placeholder="Busque por item ou loja" 
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

                <Link href="/carrinhoCompras" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="relative">
                        <HiOutlineShoppingBag className="text-ifood" size={28} />
                        <span className="absolute -top-1 -right-1 bg-ifood text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
                    </div>
                    <div className="flex flex-col items-start sm:flex">
                        <span className="text-sm font-semibold">R$ 0,00</span>
                        <span className="text-xs text-btn-edit">0 itens</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}