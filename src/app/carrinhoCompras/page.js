'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiX, FiTrash2 } from "react-icons/fi";
import Header from "@/components/Header";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "@/contexts/CartContext";

export default function CarrinhoCompras() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { carrinho, limparCarrinho, valorTotal } = useCart();

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-gray-50" />;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            
            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                
                <div className="flex items-center justify-between mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800">Meu Carrinho</h1>
                    
                    <div className="flex items-center gap-3 sm:gap-6">
                        {carrinho.length > 0 && (
                            <button 
                                onClick={limparCarrinho}
                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition-colors p-2 rounded-lg hover:bg-red-50"
                            >
                                <FiTrash2 size={18} />
                                <span className="hidden sm:inline">Limpar carrinho</span>
                            </button>
                        )}
                        
                        <button 
                            onClick={() => router.back()} 
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                            title="Fechar carrinho"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {carrinho.length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                        
                        {carrinho.map(item => (
                            <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center font-bold text-gray-400">
                                        {item.quantidade}x
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800">{item.nome}</h3>
                                        <p className="text-sm text-gray-500">{item.descricao?.substring(0, 40)}...</p>
                                        <p className="text-ifood font-bold mt-1">
                                            {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="border-t border-gray-100 pt-4 flex flex-col items-end gap-2">
                            <div className="flex justify-between w-full max-w-xs text-gray-600">
                                <span>Subtotal</span>
                                <span>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                            <div className="flex justify-between w-full max-w-xs text-gray-600">
                                <span>Taxa de Entrega</span>
                                <span className="text-green-600 font-medium">Grátis</span>
                            </div>
                            <div className="flex justify-between w-full max-w-xs text-xl font-bold text-gray-800 mt-2">
                                <span>Total</span>
                                <span>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                                <button 
                                    onClick={() => router.push('/checkoutPedido')}
                                    className="bg-ifood text-white font-bold py-4 px-10 rounded-xl hover:bg-ifood-hover transition-colors shadow-sm w-full sm:w-auto text-lg"
                                >
                                    Finalizar Pedido
                                </button>
                        </div>
                    </div>
                ) : (
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