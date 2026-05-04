'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiUser, FiSettings, FiList, FiCreditCard, FiLogOut } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Image from "next/image";

export default function Header({ aoBuscar }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function lidarComCliqueFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }
        
        document.addEventListener("mousedown", lidarComCliqueFora);
        
        return () => {
            document.removeEventListener("mousedown", lidarComCliqueFora);
        };
    }, []);

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
                        onChange={(e) => aoBuscar && aoBuscar(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
                    <FaLocationDot className="text-ifood" size={20} />
                </div>

                <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setMenuAberto(!menuAberto)}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors ${menuAberto ? 'bg-red-50 text-ifood' : 'text-ifood hover:bg-red-50'}`}
                    >
                        <FiUser size={24} />
                    </button>

                    {menuAberto && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col py-2 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-gray-100 mb-1">
                                <p className="text-sm font-bold text-gray-800">Olá, Cliente!</p>
                                <p className="text-xs text-gray-500 truncate">Seja bem-vindo</p>
                            </div>

                            <Link 
                                href="/gerenciarContaUsuario" 
                                onClick={() => setMenuAberto(false)}
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-ifood flex items-center gap-3 transition-colors"
                            >
                                <FiSettings size={18} />
                                Gerenciar Perfil
                            </Link>
                            
                            <Link 
                                href="/pedidos" 
                                onClick={() => setMenuAberto(false)}
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-ifood flex items-center gap-3 transition-colors"
                            >
                                <FiList size={18} />
                                Visualizar Pedidos
                            </Link>

                            <Link 
                                href="/pagamentos" 
                                onClick={() => setMenuAberto(false)}
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-ifood flex items-center gap-3 transition-colors"
                            >
                                <FiCreditCard size={18} />
                                Gerenciar Pagamentos
                            </Link>

                            <hr className="my-1 border-gray-100" />

                            <button 
                                onClick={() => {
                                    setMenuAberto(false);
                                    console.log("Saindo da conta..."); 
                                }}
                                className="px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left w-full"
                            >
                                <FiLogOut size={18} />
                                Sair da conta
                            </button>
                        </div>
                    )}
                </div>

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