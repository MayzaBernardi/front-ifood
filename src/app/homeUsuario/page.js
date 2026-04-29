'use client';
import { useRef } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import Header from "@/components/Header";

export default function Home() {
    const carrosselRef = useRef(null);

    const categorias = [
        { id: 1, nome: "Brasileira", img: "/comidaBrasileira.png" },
        { id: 2, nome: "Marmita", img: "/marmita.png" },
        { id: 3, nome: "Hambúrguer", img: "/hamburguer.png" },
        { id: 4, nome: "Frutos do Mar", img: "/frutosDoMar.png" },
        { id: 5, nome: "Doces & Bolos", img: "/bolosEdoces.png" },
        { id: 6, nome: "Sorvetes", img: "/sorvete.png" },
        { id: 7, nome: "Saudável", img: "/saudavel.png" },
        { id: 8, nome: "Japonesa", img: "/sushi.png" },
        { id: 9, nome: "Francesa", img: "/italiano.png" },
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
        { id: 1, img: "/banner1.png", bg: "bg-gradient-to-r from-[#ea1d2c] to-[#ff5f5f]" },
        { id: 2, img: "/banner2.png", bg: "bg-gradient-to-r from-[#ff5f5f] to-[#ea1d2c]" }
    ];

    const scrollLeft = () => {
        if (carrosselRef.current) {
            carrosselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carrosselRef.current) {
            carrosselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="mb-12">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Pedir seu delivery é rápido e prático! Conheça as categorias
                    </h1>
                    
                    <div className="relative group">
                        <button 
                            onClick={scrollLeft} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-[#ea1d2c] transition-colors hidden md:block"
                        >
                            <FiChevronLeft size={24} />
                        </button>

                        <div 
                            ref={carrosselRef} 
                            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
                        >
                            {categorias.map((categoria) => (
                                <Link href={`/categoria/${categoria.nome.toLowerCase()}`} key={categoria.id} className="flex flex-col items-center gap-3 min-w-25 sm:min-w-30 snap-start group/item">
                                    <div className="w-24 h-20 sm:w-28 sm:h-24 bg-white rounded-2xl flex items-center justify-center p-2 group-hover/item:shadow-md transition-shadow relative overflow-hidden">
                                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-xs text-btn-delete">
                                            <Image
                                                src={categoria.img}
                                                alt={categoria.nome}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-btn-edit group-hover/item:text-gray-900 transition-colors text-center">
                                        {categoria.nome}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <button 
                            onClick={scrollRight} 
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white shadow-md rounded-full p-2 text-btn-delete hover:text-ifood transition-colors hidden md:block"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 snap-x snap-mandatory">
                        {banners.map((banner) => (
                            <div key={banner.id} className={`min-w-75 md:min-w-105 h-48 md:h-56 ${banner.bg} rounded-3xl snap-start relative overflow-hidden flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:opacity-95 transition-opacity`}>
                                
                                <Image
                                    src={banner.img}
                                    alt={`Promoção ${banner.id}`}
                                    fill
                                    className="object-cover" 
                                />
                                
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
                        <Link href="/descontos" className="text-ifood font-semibold text-sm hover:underline">
                            Ver mais
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pratos.map((item) => (
                            <div key={item.id} className="h-40 border border-border rounded-xl bg-gray-50 flex items-center justify-center text-btn-edit">
                                <Image
                                    src={item.img}
                                    alt={item.nome}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}