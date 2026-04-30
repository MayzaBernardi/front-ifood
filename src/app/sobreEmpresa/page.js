'use client';
import Image from "next/image";
import Link from "next/link";
import NavigateHome from "@/components/NavigationHome";
import { FiTarget, FiEye, FiHeart, FiMapPin, FiUsers, FiShoppingBag } from "react-icons/fi";

export default function SobreEmpresa() {
    return (
        <div className="flex min-h-screen flex-col font-sans text-texto-principal bg-fundo">
            <NavigateHome />
            <main className="flex w-full flex-1 flex-col md:flex-row relative">
                
                {/* Lado Esquerdo - Visual */}
                <div className="flex-1 bg-ifood-light gradient flex flex-col justify-center items-center p-10 md:p-20 relative">
                    <div className="relative w-full max-w-2xl aspect-[1.3/1] mt-16 md:mt-0 transform scale-105">
                        <Image
                            src="/FavFood.png"
                            alt="Equipe FavFood trabalhando"
                            fill
                            className="rounded-3xl object-contain"
                        />
                    </div>

                    <p className="absolute bottom-5 left-5 text-sm text-texto-principal font-medium">
                        © {new Date().getFullYear()} FavFood Tech
                    </p>
                </div>

                {/* Lado Direito - Conteúdo (Card Branco) */}
                <div className="flex-2 bg-ifood-light flex justify-center items-center p-5 md:p-20">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12 shadow-2xs flex flex-col gap-8 max-h-[85vh] overflow-y-auto scrollbar-hide">
                        
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-texto-principal">
                                Muito prazer, somos o <span className="text-ifood">FavFood!</span>
                            </h1>
                            <p className="text-lg text-texto-principal mt-2">
                                Nascemos em 2024 com um propósito simples: conectar pessoas aos seus pratos favoritos de forma rápida, justa e deliciosa.
                            </p>
                        </div>

                        <hr className="border-border" />

                        {/* Seção Missão, Visão e Valores */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-red-100 p-3 rounded-full text-ifood">
                                    <FiTarget size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-texto-principal">Nossa Missão</h3>
                                    <p className="text-texto-principal mt-1">
                                        Revolucionar o delivery local, oferecendo tecnologia de ponta para pequenos restaurantes e a melhor experiência para os usuários.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-red-100 p-3 rounded-full text-ifood">
                                    <FiEye size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-texto-principal">Nossa Visão</h3>
                                    <p className="text-texto-principal mt-1">
                                        Ser o aplicativo de delivery mais amado e utilizado em todas as cidades de médio porte do Brasil até 2027.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-red-100 p-3 rounded-full text-ifood">
                                    <FiHeart size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-texto-principal">Nossos Valores</h3>
                                    <p className="text-texto-principal mt-1">
                                        Transparência com parceiros, valorização dos entregadores, inovação constante e fome de vencer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seção de Números Fictícios */}
                        <div className="bg-fundo rounded-xl p-6 grid grid-cols-2 md:grid-cols-3 gap-4 border border-border mt-2">
                            <div className="flex flex-col items-center justify-center text-center gap-1">
                                <FiShoppingBag size={28} className="text-ifood mb-2" />
                                <span className="text-2xl font-black text-texto-principal">+500k</span>
                                <span className="text-xs font-semibold text-texto-principal uppercase tracking-wider">Pedidos Entregues</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-1">
                                <FiUsers size={28} className="text-ifood mb-2" />
                                <span className="text-2xl font-black text-texto-principal">+1.200</span>
                                <span className="text-xs font-semibold text-texto-principal uppercase tracking-wider">Restaurantes Parceiros</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-1 col-span-2 md:col-span-1">
                                <FiMapPin size={28} className="text-ifood mb-2" />
                                <span className="text-2xl font-black text-texto-principal">15</span>
                                <span className="text-xs font-semibold text-texto-principal uppercase tracking-wider">Cidades Atendidas</span>
                            </div>
                        </div>

                        {/* Botão de Ação */}
                        <div className="flex flex-col items-center gap-3 mt-4">
                            <Link 
                                href="/criarConta"
                                className="flex h-14 w-full md:w-2/3 items-center justify-center rounded-xl border-none bg-ifood hover:bg-ifood-hover text-white font-extrabold text-lg transition-colors shadow-md"
                            >
                                Faça parte dessa história
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}