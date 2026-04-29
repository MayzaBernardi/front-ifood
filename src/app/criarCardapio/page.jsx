'use client';
import { useState, useRef } from "react";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import Navigation from "@/components/Navigation";

export default function CadastrarRestaurante() {
    const [formData, setFormData] = useState({
        nome_prato: "",
        preco: "",
        id_categoria: "",
        id_restaurante: "",
    });

    const [imagem, setImagem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files) {
            setImagem(e.target.files);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nome_prato || !formData.preco) {
            toast.warn("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);

        const payload = new FormData();
        payload.append("nome_prato", formData.nome_prato);
        payload.append("preco", formData.preco);
        payload.append("id_categoria", formData.id_categoria);
        payload.append("id_restaurante", formData.id_restaurante);
        
        if (imagem) {
            payload.append("arquivo_cardapio", imagem); 
        }

        try {
            const resposta = await api.post('/cardapios/create', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success("Cardápio criado com sucesso!");
            
            setFormData({
                nome_prato: "",
                preco: "",
                id_categoria: "",
                id_restaurante: ""
            });
            setImagem(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

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
            <main className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Cadastrar Novo Prato
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">
                        Preencha os dados abaixo para registrar um novo item no cardápio.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Foto do Prato
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea1d2c] transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#ea1d2c] hover:file:bg-red-100"
                            />
                        </div>

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
                                step="0.01"
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
    );
}