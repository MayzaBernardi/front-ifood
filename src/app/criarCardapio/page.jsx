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
            const resposta = await api.post('/cardapios/create', formData);
            
            toast.success("Cardápio criado com sucesso!");
            
            setFormData({
                nome_prato: "",
                preco: "",
                id_categoria: "",
                id_restaurante: "",
                arquivo_cardapio: ""
            });

        } catch (error) {
            console.error("Erro ao criar cardápio:", error);
            
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
                    Cadastrar Novo Cardápio
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Preencha os dados abaixo para registrar um novo cardápio na plataforma.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Prato
                        </label>
                        <input
                            type="text"
                            name="nome_prato"
                            value={formData.nome_prato}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Pizza Margherita"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preço
                        </label>
                        <input
                            type="number"
                            name="preco"
                            value={formData.preco}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: 29.90"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoria
                        </label>
                        <input
                            type="text"
                            name="id_categoria"
                            value={formData.id_categoria}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Pizzas"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Restaurante
                        </label>
                        <input
                            type="text"
                            name="id_restaurante"
                            value={formData.id_restaurante}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Pizzaria do Zé"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-8 bg-[#ea1d2c] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center"
                    >
                        {isLoading ? 'Cadastrando...' : 'Cadastrar Cardápio'}
                    </button>
                </form>
            </div>
            </main>
        </div>
    </div>
    );
}