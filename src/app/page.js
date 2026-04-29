'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ModalComponent from "@/components/ModalComponent";
import NavigateHome from "@/components/NavigationHome";

export default function IFoodLogin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [etapaRecuperacao, setEtapaRecuperacao] = useState(1);
    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const [codigoValidacao, setCodigoValidacao] = useState("");

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEtapaRecuperacao(1); 
        setEmailRecuperacao("");
        setCodigoValidacao("");
    };

    const handleEnviarEmail = async (e) => {
        e.preventDefault();
        
        setEtapaRecuperacao(2); 
    };

    const handleValidarCodigo = async (e) => {
        e.preventDefault();
        
        console.log("Validando código:", codigoValidacao);
    };

    return (
        <div className="flex min-h-screen flex-col font-sans text-texto-principal bg-fundo">
            <NavigateHome />
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
                        className="absolute bottom-5 left-5 text-xs text-gray-400 hover:text-ifood hover:underline"
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
                                    className="flex h-12 w-2/3 items-center justify-center rounded-xl border-none bg-ifood hover:bg-ifood-hover text-white font-extrabold text-lg transition-colors shadow-md"
                                >
                                    Efetuar Login
                                </button>

                                <div className="text-sm text-black mt-2">
                                    Ainda não tem conta?{' '}
                                    <Link 
                                        href="/criarConta" 
                                        className="font-bold text-black hover:underline"
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
                onClose={handleCloseModal} 
                titulo="Recuperar Senha"
            >
                {etapaRecuperacao === 1 && (
                    <form className="flex flex-col gap-4" onSubmit={handleEnviarEmail}>
                        <p className="text-sm text-texto-principal">
                            Informe seu e-mail cadastrado para receber o código de verificação.
                        </p>
                        
                        <input 
                            type="email" 
                            placeholder="E-mail cadastrado" 
                            required
                            value={emailRecuperacao}
                            onChange={(e) => setEmailRecuperacao(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border focus:outline-none focus:border-ifood focus:ring-1 focus:ring-ifood transition-colors"
                        />
                        <button 
                            type="submit" 
                            className="mt-2 w-full p-3 rounded-lg bg-ifood text-white font-bold hover:bg-ifood-hover transition-colors"
                        >
                            Enviar código
                        </button>
                    </form>
                )}

                {etapaRecuperacao === 2 && (
                    <form className="flex flex-col gap-4" onSubmit={handleValidarCodigo}>
                        <p className="text-sm text-texto-principal">
                            Enviamos um código para o e-mail <strong>{emailRecuperacao}</strong>. Insira-o abaixo:
                        </p>
                        
                        <input 
                            type="text" 
                            placeholder="Código de 6 dígitos" 
                            required
                            maxLength={6}
                            value={codigoValidacao}
                            onChange={(e) => setCodigoValidacao(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors text-center text-lg tracking-widest"
                        />
                        
                        <div className="flex flex-col gap-2 mt-2">
                            <button 
                                type="submit" 
                                className="w-full p-3 rounded-lg bg-ifood text-white font-bold hover:bg-ifood-hover transition-colors"
                            >
                                Confirmar código
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setEtapaRecuperacao(1)}
                                className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                            >
                                Voltar
                            </button>
                        </div>
                    </form>
                )}
            </ModalComponent>
        </div>
    );
}