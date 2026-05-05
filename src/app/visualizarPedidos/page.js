'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { FiChevronLeft, FiShoppingBag, FiClock } from "react-icons/fi";
import api from "@/utils/axios";
import Header from "@/components/Header";

export default function TelaPedidos() {
    const router = useRouter();
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarPedidos = async () => {
            try {
                const resposta = await api.get('/pedidos/get-all');
                
                const listaPedidos = resposta.data?.data || resposta.data || [];
                setPedidos(Array.isArray(listaPedidos) ? listaPedidos : []);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            } finally {
                setCarregando(false);
            }
        };

        buscarPedidos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />

            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-ifood font-bold mb-6 hover:underline">
                    <FiChevronLeft size={20} /> Voltar
                </button>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-3">
                    <FiShoppingBag className="text-ifood" size={28} />
                    <h1 className="text-2xl font-bold text-gray-800">Meus Pedidos</h1>
                </div>

                {carregando ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ifood"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {pedidos.length > 0 ? (
                            pedidos.map((pedido) => (
                                <div key={pedido.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow">
                                    
                                    <div className="flex flex-col mb-3 sm:mb-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-lg text-gray-800">Pedido #{pedido.id}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <FiClock size={14} />
                                            <span>
                                                {pedido.created_at ? new Date(pedido.created_at).toLocaleDateString('pt-BR', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
                                                }) : 'Data indisponível'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:items-end w-full sm:w-auto">
                                        <span className="text-sm text-gray-500 mb-1">Status: ID {pedido.id_status || 'Pendente'}</span>
                                        <span className="font-bold text-ifood text-lg">
                                            R$ {pedido.valor_total ? Number(pedido.valor_total).toFixed(2).replace('.', ',') : '0,00'}
                                        </span>
                                        
                                        <button 
                                            onClick={() => console.log("Ver detalhes do pedido", pedido.id)}
                                            className="mt-3 w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Detalhes
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                                <p className="text-gray-500 text-lg">Você ainda não fez nenhum pedido.</p>
                                <p className="text-gray-400 text-sm mt-1">Que tal explorar alguns restaurantes?</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}