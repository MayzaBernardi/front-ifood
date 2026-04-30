'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import NavigateHome from "@/components/NavigationHome";

export default function CadastrarRestaurante() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nome_restaurante: "",
        cnpj: "",
        horario_atendimento: "",
        tempo_entrega: "",
        email: "",
        senha: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nome_restaurante || !formData.cnpj) {
            toast.warn("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);

        try {
            const resposta = await api.post('/restaurantes/create', formData);
            
            toast.success("Restaurante criado com sucesso!");
            
            setFormData({
                nome_restaurante: "",
                cnpj: "",
                horario_atendimento: "",
                tempo_entrega: "",
                email: "",
                senha: ""
            });

            router.push("/"); 

        } catch (error) {
            console.error("Erro ao criar restaurante:", error);
            const mensagemErro = error.response?.data?.message || "Ops! Ocorreu um erro ao conectar com o servidor.";
            toast.error(mensagemErro);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row font-sans text-texto-principal bg-white">
            <NavigateHome />
            <div className="hidden md:flex flex-1 bg-ifood-light flex-col justify-center items-center p-10 relative">
                <div className="relative w-full max-w-lg aspect-[1.3/1]">
                    <Image
                        src="/FavFood.png" 
                        alt="Restaurante parceiro"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center p-6 md:p-20">
                <div className="w-full max-w-md flex flex-col gap-8">
                
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-texto-principal">
                            Cadastrar Restaurante
                        </h1>
                        <p className="text-lg text-texto-secundario">
                            Preencha os dados abaixo para registrar um novo parceiro na plataforma.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="nome_restaurante" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                Nome do Restaurante
                            </label>
                            <input 
                                type="text" 
                                id="nome_restaurante"
                                name="nome_restaurante"
                                placeholder="Ex: Pizzaria do Zé"
                                value={formData.nome_restaurante}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                                autoFocus
                            />
                        </div>

                        <div>
                            <label htmlFor="cnpj" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                CNPJ
                            </label>
                            <input 
                                type="text" 
                                id="cnpj"
                                name="cnpj"
                                placeholder="Apenas números ou formato 00.000.000/0000-00"
                                value={formData.cnpj}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="horario_atendimento" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                    Horário de Atendimento
                                </label>
                                <input 
                                    type="text" 
                                    id="horario_atendimento"
                                    name="horario_atendimento"
                                    placeholder="Ex: 18:00 às 23:00"
                                    value={formData.horario_atendimento}
                                    onChange={handleInputChange}
                                    className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="tempo_entrega" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                    Tempo de Entrega
                                </label>
                                <input 
                                    type="text" 
                                    id="tempo_entrega"
                                    name="tempo_entrega"
                                    placeholder="Ex: 30-45 min"
                                    value={formData.tempo_entrega}
                                    onChange={handleInputChange}
                                    className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                Email
                            </label>
                            <input 
                                type="text" 
                                id="email"
                                name="email"
                                placeholder="Insira o email do restaurante"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-fundo border border-border text-texto-principal text-sm rounded-xl focus:ring-1 focus:ring-[#ea1d2c] focus:border-[#ea1d2c] block w-full px-4 py-3.5 outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="senha" className="block mb-1.5 text-sm font-semibold text-texto-principal">
                                Senha de acesso
                            </label>
                            <input 
                                type="password" 
                                id="senha"
                                name="senha"
                                placeholder="Crie uma senha segura para o restaurante acessar o sistema"
                                value={formData.senha}
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
                            {isLoading ? "Cadastrando..." : "Cadastrar Restaurante"}
                        </button>
                    </form>

                    <div className="text-center text-sm text-texto-secundario mt-2">
                        Já é um parceiro?{' '}
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