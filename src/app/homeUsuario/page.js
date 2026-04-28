'use client';
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";


export default function Home() {
    const categorias = [
        { id: 1, nome: "Brasileira", img: "/cat-brasileira.png" },
        { id: 2, nome: "Marmita", img: "/cat-marmita.png" },
        { id: 3, nome: "Lanches", img: "/cat-lanches.png" },
        { id: 4, nome: "Promoções", img: "/cat-promocoes.png" },
        { id: 5, nome: "Doces & Bolos", img: "/cat-doces.png" },
        { id: 6, nome: "Açaí", img: "/cat-acai.png" },
        { id: 7, nome: "Saudável", img: "/cat-saudavel.png" },
        { id: 8, nome: "Japonesa", img: "/cat-japonesa.png" },
        { id: 9, nome: "Italiana", img: "/cat-italiana.png" },
    ];

    const pratos = [
        { id: 1, nome: "Prato 1", img: "/prato1.png" },
        { id: 2, nome: "Prato 2", img: "/prato2.png" },
        { id: 3, nome: "Prato 3", img: "/prato3.png" },
        { id: 4, nome: "Prato 4", img: "/prato4.png" },
        { id: 5, nome: "Prato 5", img: "/prato5.png" },
        { id: 6, nome: "Prato 6", img: "/prato6.png" },
        { id: 7, nome: "Prato 7", img: "/prato7.png" },
        { id: 8, nome: "Prato 8", img: "/prato8.png" },
    ];

    const banners = [
        { id: 1, alt: "colocar alguma promoção", bg: "bg-red-600" },
        { id: 2, alt: "colocar outra promoção", bg: "bg-red-500" }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="relative w-24 h-10">
                        <Image
                            src="/FavFood.png"
                            alt="Logo FavFood"
                            fill
                            className="object-contain"
                        />
                    </div>
                    
                    <nav className="hidden md:flex">
                        <Link href="/" className="text-[#ea1d2c] font-semibold text-sm hover:underline">
                            Restaurantes
                        </Link>
                    </nav>
                </div>

                <div className="flex-1 max-w-2xl mx-8">
                    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 gap-3 focus-within:ring-1 focus-within:ring-[#ea1d2c] transition-shadow">
                        <FiSearch className="text-gray-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="Busque por item ou loja" 
                            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
                        <FaLocationDot className="text-[#ea1d2c]" size={20} />
                    </div>

                    <button className="flex items-center justify-center p-2 text-[#ea1d2c] hover:bg-red-50 rounded-full transition-colors">
                        <FiUser size={24} />
                    </button>

                    <button className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="relative">
                            <HiOutlineShoppingBag className="text-[#ea1d2c]" size={28} />
                        </div>
                        <div className="flex flex-col items-start hidden sm:flex">
                            <span className="text-sm font-semibold">R$ 0,00</span>
                            <span className="text-xs text-gray-500">0 itens</span>
                        </div>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="mb-12">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Pedir seu delivery é rápido e prático! Conheça as categorias
                    </h1>
                    
                    <div className="relative group">
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-[#ea1d2c] transition-colors hidden md:block">
                            <FiChevronLeft size={24} />
                        </button>

                        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory">
                            {categorias.map((categoria) => (
                                <Link href={`/categoria/${categoria.nome.toLowerCase()}`} key={categoria.id} className="flex flex-col items-center gap-3 min-w-[100px] sm:min-w-[120px] snap-start group/item">
                                    <div className="w-24 h-20 sm:w-28 sm:h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover/item:shadow-md transition-shadow relative overflow-hidden">
                                        <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
                                            IMG
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 group-hover/item:text-gray-900 transition-colors text-center">
                                        {categoria.nome}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-[#ea1d2c] transition-colors hidden md:block">
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 snap-x snap-mandatory">
                        {banners.map((banner) => (
                            <div key={banner.id} className={`min-w-[300px] md:min-w-[420px] h-48 md:h-56 ${banner.bg} rounded-3xl snap-start relative overflow-hidden flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:opacity-95 transition-opacity`}>
                                <span> {banner.alt}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Desconto até 35% OFF</h2>
                            <p className="text-sm text-gray-500 mt-1">Pratos incríveis com até 35% de desconto</p>
                        </div>
                        <Link href="/descontos" className="text-[#ea1d2c] font-semibold text-sm hover:underline">
                            Ver mais
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pratos.map((item) => (
                            <div key={item.id} className="h-40 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                Restaurante Placeholder
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}