'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiX, FiTrash2 } from "react-icons/fi";
import Header from "@/components/Header";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function CarrinhoCompras() {
    const router = useRouter();

    // 1. Transformamos o mock em um useState para a tela reagir às mudanças
    const [carrinho, setCarrinho] = useState([
        { id: 1, nome: "Prato 1", preco: 29.90, img: "/prato1.png" },
        { id: 2, nome: "Prato 2", preco: 39.90, img: "/prato2.png" },
        { id: 3, nome: "Prato 3", preco: 19.90, img: "/prato3.png" },
    ]);

    // 2. Função para zerar a sacola
    const limparCarrinho = () => {
        setCarrinho([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            
            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                
                {/* Cabeçalho do Carrinho */}
                <div className="flex items-center justify-between mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800">Meu Carrinho</h1>
                    
                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* O botão Limpar só aparece se tiver itens no carrinho */}
                        {carrinho.length > 0 && (
                            <button 
                                onClick={limparCarrinho}
                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition-colors p-2 rounded-lg hover:bg-red-50"
                            >
                                <FiTrash2 size={18} />
                                <span className="hidden sm:inline">Limpar carrinho</span>
                            </button>
                        )}
                        
                        {/* Botão de Fechar (Voltar) */}
                        <button 
                            onClick={() => router.back()} 
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                            title="Fechar carrinho"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {/* Área dos Itens */}
                {carrinho.length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                        {/* Renderizando os itens para você ver a função limpar funcionando */}
                        {carrinho.map(item => (
                            <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center">
                                        {/* Usando img HTML para evitar erros de domínio do Next.js temporariamente */}
                                        <img src={item.img} alt={item.nome} className="object-cover w-full h-full" onError={(e) => e.target.src = '/FavFood.png'} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800">{item.nome}</h3>
                                        <p className="text-[#ea1d2c] font-bold">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="pt-4 flex justify-end">
                                <button className="bg-[#ea1d2c] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#c91825] transition-colors shadow-sm">
                                    Finalizar Pedido
                                </button>
                        </div>
                    </div>
                ) : (
                    // Mensagem de Carrinho Vazio
                    <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <HiOutlineShoppingBag size={64} className="text-gray-300 mb-4" />
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Sua sacola está vazia</h2>
                        <p className="text-gray-500 mb-6">Que tal buscar algumas delícias para matar a fome?</p>
                        <button 
                            onClick={() => router.push('/homeUsuario')}
                            className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Explorar restaurantes
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}