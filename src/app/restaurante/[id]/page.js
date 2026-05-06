'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import api from "@/utils/axios";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";



export default function TelaRestaurante() {
    const params = useParams();
    const router = useRouter();
    const id_restaurante = params.id; 
    const { adicionarAoCarrinho } = useCart();

    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarCardapio = async () => {
            try {
                const resposta = await api.get(`/cardapios/restaurantes/${id_restaurante}`);
                const listaPratos = resposta.data?.data || resposta.data || [];
                setCardapio(Array.isArray(listaPratos) ? listaPratos : []);
            } catch (error) {
                console.error(error);
            } finally {
                setCarregando(false);
            }
        };

        buscarCardapio();
    }, [id_restaurante]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />

            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-ifood font-bold mb-6 hover:underline">
                    <FiChevronLeft size={20} /> Voltar
                </button>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Cardápio do Restaurante</h1>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-4">Pratos Disponíveis</h2>

                {carregando ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ifood"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cardapio.length > 0 ? (
                            cardapio.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center p-4 border-b">
                                        <div>
                                            <h4 className="font-bold">{item.nome_prato}</h4>
                                            <p className="text-sm text-gray-500">{item.descricao}</p>
                                            <span className="text-gray-800 font-medium">
                                                {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => {
                                                adicionarAoCarrinho(item);
                                                toast.success(`${item.nome_prato} adicionado!`);
                                            }}
                                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-ifood hover:bg-red-50 hover:border-red-100 transition-colors"
                                        >
                                            <FiPlus size={20} />
                                        </button>
                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-gray-500">Nenhum prato encontrado neste restaurante.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}