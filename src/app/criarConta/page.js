'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { toast } from "react-toastify"; 

export default function CadastroCliente() {
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        data_nascimento: "",
        senha: "",
        email: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nome || !formData.cpf || !formData.data_nascimento || !formData.senha || !formData.email) {
            toast.warn("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);

        try {
            const resposta = await api.post('/pessoas/register', formData);
            
            toast.success("Conta criada com sucesso!");
            
            setFormData({
                nome: "",
                cpf: "",
                data_nascimento: "",
                senha: "",
                email: ""
            });
            
            router.push("/"); 

        } catch (error) {
            console.error("Erro ao criar conta:", error);
            const mensagemErro = error.response?.data?.message || "Ops! Ocorreu um erro ao conectar com o servidor.";
            toast.error(mensagemErro);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row font-sans text-texto-principal bg-white">
        
            <div className="hidden md:flex flex-1 bg-ifood-light flex-col justify-center items-center p-10 relative">
                <div className="relative w-full max-w-lg aspect-[1.3/1]">
                    <Image
                        src="/FavFood.png" 
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

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="nome" className="block mb-1.5 text-sm font-semibold text-texto-principal">Nome Completo</label>
                            <input 
                                type="text" 
                                id="nome"
                                name="nome"
                                placeholder="Ex: João da Silva"
                                value={formData.nome}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                                autoFocus
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-texto-principal">E-mail</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="joao@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="data_nascimento" className="block mb-1.5 text-sm font-semibold text-texto-principal">Data de Nascimento</label>
                            <input 
                                type="date" 
                                id="data_nascimento"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="senha" className="block mb-1.5 text-sm font-semibold text-texto-principal">Senha</label>
                            <input 
                                type="password" 
                                id="senha"
                                name="senha"
                                placeholder="Mínimo de 6 caracteres"
                                minLength="6"
                                value={formData.senha}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="cpf" className="block mb-1.5 text-sm font-semibold text-texto-principal">CPF</label>
                            <input 
                                type="text" 
                                id="cpf"
                                name="cpf"
                                placeholder="Ex: 123.456.789-00"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="mt-2 w-full bg-ifood text-white hover:bg-ifood-hover disabled:opacity-70 disabled:cursor-not-allowed font-semibold rounded-xl text-[15px] px-5 py-4 transition-colors shadow-sm"
                        >
                            {isLoading ? "Criando Conta..." : "Criar Conta"}
                        </button>
                    </form>

                    <div className="text-center text-sm text-texto-secundario mt-2">
                        Já tem uma conta?{' '}
                        <button 
                            onClick={() => router.push('/')} 
                            className="font-semibold text-ifood hover:underline"
                        >
                            Fazer login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}