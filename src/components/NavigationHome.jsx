'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose, MdStorefront, MdOutlineBusiness } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi"; 
import { FaMotorcycle } from "react-icons/fa";

export default function NavigateHome() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setSidebarOpen(true)}
                className="absolute top-6 left-6 z-20 p-2 bg-ifood-light rounded-full text-black hover:text-ifood transition-colors"
            >
                <FiMenu size={28} />
            </button>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {sidebarOpen && (
                <aside className="fixed left-0 top-0 h-full w-75 bg-white shadow-2xl z-50 flex flex-col p-6 transition-transform">
                    <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
                        <span className="text-ifood font-bold text-xl uppercase tracking-wider">
                            <Image
                                src="/FavFood.png"
                                alt="Logo do app"
                                width={180}
                                height={40}
                                className="object-contain"
                            />
                        </span>
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-full hover:bg-ifood-light transition-colors"
                        >
                            <MdClose size={24} className="text-gray-500 hover:text-ifood" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link 
                            href="/" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-ifood-light hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <RiHome4Line size={20} /> Início
                        </Link>
                        
                        <Link 
                            href="/pedir" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-ifood-light hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <HiOutlineShoppingBag size={20} /> Pedir Delivery
                        </Link>

                        <Link 
                            href="/criarRestaurante" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-ifood-light hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <MdStorefront size={20} /> Seja Nosso Parceiro
                        </Link>

                        <Link 
                            href="/criarRestaurante" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-ifood-light hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaMotorcycle size={20} /> Seja Entregador FavFood
                        </Link>

                        <Link 
                            href="/sobre" 
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-ifood-light hover:text-ifood transition-colors" 
                            onClick={() => setSidebarOpen(false)}
                        >
                            <MdOutlineBusiness size={20} /> Conheça Nossa Empresa
                        </Link>
                    </nav>
                </aside>
            )}
        </>
    );
}