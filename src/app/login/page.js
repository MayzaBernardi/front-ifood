'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CadastroCliente() {
const router = useRouter();
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");
    const [senha, setSenha] = useState("");

    const handleCadastro = (e) => {
        e.preventDefault(); 
        
        console.log("Dados do novo cliente:", { nome, email, idade, senha });
        
        alert("Conta criada com sucesso! Redirecionando para o login...");
        router.push("/"); 
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row font-sans text-texto-principal bg-white">
        
        <div className="hidden md:flex flex-1 bg-ifood-light flex-col justify-center items-center p-10 relative">
            <div className="relative w-full max-w-lg aspect-[1.3/1]">
                <Image
                src="/pedeAi.png" 
                alt="Pessoas pedindo comida"
                fill
                className="object-contain"
                />
            </div>
        </div>

        <div className="flex-1 flex justify-center items-center p-6 md:p-20">
            <div className="w-full max-w-md flex flex-col gap-8">
            
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-texto-principal">
                Criar nova conta
                </h1>
                <p className="text-lg text-texto-secundario">
                Preencha seus dados para começar.
                </p>
            </div>

            <form onSubmit={handleCadastro} className="flex flex-col gap-5">
                <div>
                <label htmlFor="nome" className="block mb-1.5 text-sm font-semibold text-texto-principal">Nome Completo</label>
                <input 
                    type="text" 
                    id="nome"
                    placeholder="Ex: João da Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="bg-fundo border border-gray-200 text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                    required 
                    autoFocus
                />
                </div>

                <div>
                <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-texto-principal">E-mail</label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="joao@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-fundo border border-gray-200 text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                    required 
                />
                </div>

                <div>
                <label htmlFor="idade" className="block mb-1.5 text-sm font-semibold text-texto-principal">Idade</label>
                <input 
                    type="number" 
                    id="idade"
                    placeholder="Ex: 25"
                    min="1"
                    max="120"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className="bg-fundo border border-gray-200 text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                    required 
                />
                </div>

                <div>
                <label htmlFor="senha" className="block mb-1.5 text-sm font-semibold text-texto-principal">Senha</label>
                <input 
                    type="password" 
                    id="senha"
                    placeholder="Mínimo de 6 caracteres"
                    minLength="6"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="bg-fundo border border-gray-200 text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                    required 
                />
                </div>
                
                <button 
                type="submit" 
                className="mt-2 w-full bg-ifood text-white hover:bg-ifood-hover font-semibold rounded-xl text-[15px] px-5 py-4 transition-colors shadow-sm"
                >
                Criar Conta
                </button>
            </form>

            <div className="text-center text-sm text-texto-secundario mt-2">
                Já tem uma conta?{' '}
                <button 
                onClick={() => router.push('/')} 
                className="font-semibold text-[#ea1d2c] hover:underline"
                >
                Fazer login
                </button>
            </div>

            </div>
        </div>
        </div>
    );
    }