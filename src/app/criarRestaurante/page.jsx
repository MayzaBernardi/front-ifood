'use client';
import { useState } from "react";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import Navigation from "@/components/Navigation";

export default function CadastrarRestaurante() {
    const [formData, setFormData] = useState({
        nome_restaurante: "",
        cnpj: "",
        horario_atendimento: "",
        tempo_entrega: "",
        id_cupons: ""
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
                id_cupons: ""
            });

        } catch (error) {
            console.error("Erro ao criar restaurante:", error);
            
            const mensagemErro = error.response?.data?.message || "Ops! Ocorreu um erro ao conectar com o servidor.";
            toast.error(mensagemErro);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ifood-light font-sans text-gray-800">
            <Navigation />
        <div className="min-h-screen bg-ifood-light font-sans text-gray-800">
        <main className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Cadastrar Novo Restaurante
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Preencha os dados abaixo para registrar um novo parceiro na plataforma.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Restaurante
                        </label>
                        <input
                            type="text"
                            name="nome_restaurante"
                            value={formData.nome_restaurante}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Pizzaria do Zé"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CNPJ
                        </label>
                        <input
                            type="text"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            required
                            placeholder="Apenas números ou formato 00.000.000/0000-00"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Horário de Atendimento
                            </label>
                            <input
                                type="text"
                                name="horario_atendimento"
                                value={formData.horario_atendimento}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: 18:00 às 23:00"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tempo de Entrega
                            </label>
                            <input
                                type="text"
                                name="tempo_entrega"
                                value={formData.tempo_entrega}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: 30-45 min"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID dos Cupons
                        </label>
                        <input
                            type="text"
                            name="id_cupons"
                            value={formData.id_cupons}
                            onChange={handleInputChange}
                            required
                            placeholder="Insira o ID de cupons associado"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-8 bg-[#ea1d2c] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center"
                    >
                        {isLoading ? 'Cadastrando...' : 'Cadastrar Restaurante'}
                    </button>
                </form>
            </div>
            </main>
        </div>
    </div>
    );
}