'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ModalComponent from "@/components/ModalComponent";

export default function IFoodLogin() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans text-texto-principal bg-fundo">
            <header className="absolute top-0 left-0 w-full p-5 flex items-center justify-between z-10">
                <div className="relative w-28 h-10">
                    <Image
                        src="/panela.png"
                        alt="Logo do iFood"
                        fill
                        className="rounded-2xl object-contain"
                    />
                </div>
            </header>

            <main className="flex w-full flex-1 flex-col md:flex-row relative">
                <div className="flex-1 bg-ifood-light flex flex-col justify-center items-center p-10 md:p-20 relative">
                    <div className="relative w-full max-w-2xl aspect-[1.3/1] mt-16 md:mt-0 transform scale-110">
                        <Image
                            src="/FavFood.png"
                            alt="Imagem de login do iFood"
                            fill
                            className="rounded-3xl object-contain"
                        />
                    </div>

                    <a
                        href="https://github.com/MayzaBernardi/front-ifood.git"
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-5 left-5 text-xs text-gray-400 hover:text-[#ea1d2c] hover:underline"
                    >
                        https://github.com/MayzaBernardi/front-ifood.git
                    </a>
                </div>

                <div className="flex-2 bg-ifood-light flex justify-center items-center p-5 md:p-20">
                    <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl flex flex-col gap-6">
                        
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h1 className="text-3xl font-bold tracking-tight text-texto-principal">
                                Falta pouco para matar sua fome!
                            </h1>
                            <p className="text-lg text-texto-secundario">
                                Como deseja continuar?
                            </p>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                required
                                className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:border-color-ifood focus:ring-1 focus:ring-color-ifood transition-colors"
                            />
                            
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="password" 
                                    placeholder="Senha" 
                                    required
                                    className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:border-color-ifood focus:ring-1 focus:ring-color-ifood transition-colors"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(true)}
                                    className="self-end text-sm text-color-ifood font-semibold hover:underline"
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>

                            <div className="flex flex-col items-center gap-3 mt-2">
                                <button 
                                    type="submit" 
                                    className="flex h-12 w-2/3 items-center justify-center rounded-xl border-none bg-[#d41a25] hover:bg-[#d41a30] text-white font-extrabold text-lg transition-colors shadow-md"
                                >
                                    Efetuar Login
                                </button>

                                <div className="text-sm text-bg-[#ea1d2c] mt-2">
                                    Ainda não tem conta?{' '}
                                    <Link 
                                        href="/criarConta" 
                                        className="font-bold text-bg-[#ea1d2c] hover:underline"
                                    >
                                        Registre-se
                                    </Link>
                                </div>
                            </div>
                        </form>

                        <div className="flex items-center gap-3 mt-2">
                            <hr className="flex-1 border-border" />
                            <span className="text-texto-secundario text-sm font-medium">ou</span>
                            <hr className="flex-1 border-border" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className="flex items-center justify-center gap-3 bg-facebook text-white p-4 rounded-xl shadow-sm w-full font-semibold hover:opacity-90 transition-opacity">
                                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md">
                                    <FaFacebookSquare size={20} color="#3b5998" />
                                </div>
                                Continuar com Facebook
                            </button>

                            <button className="flex items-center justify-center gap-3 bg-white border border-border text-texto-principal p-4 rounded-xl shadow-sm w-full font-semibold hover:bg-gray-50 transition-colors">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <FcGoogle size={24} />
                                </div>
                                Continuar com Google
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <ModalComponent 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                titulo="Recuperar Senha"
            >
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <p className="text-sm text-texto-principal">
                        Informe seu e-mail cadastrado e o código de verificação recebido para redefinir sua senha.
                    </p>
                    
                    <input 
                        type="email" 
                        placeholder="E-mail cadastrado" 
                        required
                        className="w-full p-3 rounded-lg border border-border focus:outline-none focus:border-color-ifood focus:ring-1 focus:ring-color-ifood transition-colors"
                    />
                    <button 
                        type="submit" 
                        className="mt-2 w-full p-3 rounded-lg bg-[#ea1d2c] text-white font-bold hover:bg-[#d41a25] transition-colors"
                    >
                        Confirmar email
                    </button>

                </form>
            </ModalComponent>
        </div>
    );
}