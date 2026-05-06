'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiCreditCard, FiDollarSign, FiSmartphone, FiChevronLeft, FiMessageSquare } from "react-icons/fi";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import api from "@/utils/axios";

export default function Checkout() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { carrinho, valorTotal, limparCarrinho } = useCart();
    
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [observacao, setObservacao] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
            const userStr = localStorage.getItem("@App:user");
            if (userStr) setUsuarioLogado(JSON.parse(userStr));
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (mounted && carrinho.length === 0 && !enviando) {
            router.push('/visualizarPedidos');
        }
    }, [mounted, carrinho.length, enviando, router]);

    const handleEnviarPedido = async () => {
        if (!metodoPagamento) {
            toast.warn("Selecione uma forma de pagamento!");
            return;
        }

        if (!usuarioLogado?.id) {
            toast.error("Usuário não identificado. Faça login novamente.");
            return;
        }

        setEnviando(true);

        try {
            const metodosPagamentoMap = {
                'pix': 1,
                'credito': 2,
                'dinheiro': 3
            };

            const itensParaBackend = [];
            carrinho.forEach(item => {
                for (let i = 0; i < item.quantidade; i++) {
                    itensParaBackend.push({
                        id_cardapios: item.id,
                        valor_individual: item.preco
                    });
                }
            });

            const payload = {
                id_pessoas: usuarioLogado.id,
                id_enderecos: 1, 
                id_pagamento: metodosPagamentoMap[metodoPagamento],
                observacao: observacao || "Sem observações",
                itens_sacola: itensParaBackend
            };

            const resposta = await api.post('/pedidos/checkout', payload);

            const dadosDoBackend = resposta.data;

            const numero = dadosDoBackend.data?.id || dadosDoBackend.id || "desconecido"; 

            toast.success(`Pedido #${numero || ''} enviado com sucesso! 🛵`);
            limparCarrinho();
            router.push('/homeUsuario');

        } catch (error) {
            console.error("Erro de checkout:", error);
            
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Erro retornado pelo servidor.");
            } else {
                toast.error("Falha na comunicação com o servidor.");
            }
        } finally {
            setEnviando(false);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-gray-50" />;

    if (carrinho.length === 0 && !enviando) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            
            <main className="max-w-5xl mx-auto p-4 sm:p-8">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#ea1d2c] transition-colors mb-6 font-medium"
                >
                    <FiChevronLeft size={20} />
                    Voltar para o carrinho
                </button>

                <h1 className="text-2xl font-bold text-gray-800 mb-8">Finalizar Pedido</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <FiMapPin className="text-[#ea1d2c]" size={24} />
                                    Endereço de Entrega
                                </h2>
                                <button className="text-sm text-[#ea1d2c] font-medium hover:underline">Trocar</button>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="font-medium text-gray-800">Rua das Flores, 123</p>
                                <p className="text-sm text-gray-500">Centro</p>
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <FiMessageSquare className="text-[#ea1d2c]" size={24} />
                                Observações
                            </h2>
                            <input 
                                type="text" 
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                placeholder="Ex: Sem cebola, portaria, etc." 
                                className="border border-gray-200 rounded-lg p-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#ea1d2c]"
                            />
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <FiDollarSign className="text-[#ea1d2c]" size={24} />
                                Forma de Pagamento
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button 
                                    onClick={() => setMetodoPagamento("pix")}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${metodoPagamento === "pix" ? "border-[#ea1d2c] bg-red-50 text-[#ea1d2c]" : "border-gray-100 bg-white"}`}
                                >
                                    <FiSmartphone size={28} className="mb-2" />
                                    <span className="font-bold text-sm">PIX</span>
                                </button>
                                <button 
                                    onClick={() => setMetodoPagamento("credito")}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${metodoPagamento === "credito" ? "border-[#ea1d2c] bg-red-50 text-[#ea1d2c]" : "border-gray-100 bg-white"}`}
                                >
                                    <FiCreditCard size={28} className="mb-2" />
                                    <span className="font-bold text-sm">Crédito</span>
                                </button>
                                <button 
                                    onClick={() => setMetodoPagamento("dinheiro")}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${metodoPagamento === "dinheiro" ? "border-[#ea1d2c] bg-red-50 text-[#ea1d2c]" : "border-gray-100 bg-white"}`}
                                >
                                    <FiDollarSign size={28} className="mb-2" />
                                    <span className="font-bold text-sm">Dinheiro</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold mb-4 border-b pb-4">Resumo</h2>
                            <div className="flex flex-col gap-3 mb-6 max-h-48 overflow-y-auto pr-2">
                                {carrinho.map(item => (
                                    <div key={item.id} className="flex justify-between items-start text-sm">
                                        <span>{item.quantidade}x {item.nome}</span>
                                        <span className="font-medium">{(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex flex-col gap-2">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleEnviarPedido}
                                disabled={enviando}
                                className="w-full bg-[#ea1d2c] text-white font-bold py-4 rounded-xl mt-6 hover:bg-[#c91825] transition-colors disabled:opacity-70"
                            >
                                {enviando ? "Processando..." : "Enviar pedido à cozinha"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}