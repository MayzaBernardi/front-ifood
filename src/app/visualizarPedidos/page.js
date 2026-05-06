'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    FiChevronLeft, 
    FiShoppingBag, 
    FiCalendar, 
    FiCreditCard, 
    FiMessageSquare, 
    FiX, 
    FiClock, 
    FiMapPin
} from "react-icons/fi";
import Header from "@/components/Header";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function VisualizarPedidos() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
            const userStr = localStorage.getItem("@App:user");
            if (userStr) {
                setUsuarioLogado(JSON.parse(userStr));
            } else {
                setCarregando(false);
                toast.error("Você precisa estar logado para ver seus pedidos.");
            }
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!usuarioLogado?.id) return;

        const buscarPedidos = async () => {
            try {
                setCarregando(true);
                const resposta = await api.get(`/pedidos/pessoas/${usuarioLogado.id}`);
                
                const dados = resposta.data !== undefined ? resposta.data : resposta;
                
                const arrayDePedidos = Array.isArray(dados) ? dados : (dados?.data || []);
                
                setPedidos(arrayDePedidos);
                
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
                if (error.response?.status === 404 || error.status === 404) {
                    setPedidos([]); 
                } else {
                    toast.error("Não foi possível carregar seus pedidos no momento.");
                    setPedidos([]); 
                }
            } finally {
                setCarregando(false);
            }
        };

        buscarPedidos();
    }, [usuarioLogado]);

    if (!mounted) return <div className="min-h-screen bg-gray-50" />;

    const calcularTotal = (itens) => {
        if (!itens || !Array.isArray(itens) || itens.length === 0) return 0;
        return itens.reduce((acc, item) => acc + parseFloat(item.valor_individual || 0), 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            
            <main className="max-w-5xl mx-auto p-4 sm:p-8">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#ea1d2c] transition-colors mb-6 font-medium w-fit"
                >
                    <FiChevronLeft size={20} />
                    Voltar
                </button>

                <h1 className="text-2xl font-bold text-gray-800 mb-8">Meus Pedidos</h1>

                {carregando && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <FiClock size={40} className="animate-spin text-[#ea1d2c] mb-4" />
                        <p className="font-medium">Buscando seu histórico...</p>
                    </div>
                )}

                {!carregando && (!pedidos || pedidos.length === 0) && (
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                        <FiShoppingBag size={48} className="text-gray-300 mb-4" />
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Nenhum pedido por aqui</h2>
                        <p className="text-gray-500 mb-6">Você ainda não fez nenhum pedido no nosso restaurante.</p>
                        <button 
                            onClick={() => router.push('/homeUsuario')}
                            className="bg-[#ea1d2c] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#c91825] transition-colors"
                        >
                            Explorar Cardápio
                        </button>
                    </div>
                )}

                {!carregando && pedidos && pedidos.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {pedidos.map((pedido) => {
                            const itens = pedido.itens_sacola || [];
                            const total = calcularTotal(itens);
                            const dataFormatada = new Date(pedido.data_pedido).toLocaleDateString('pt-BR');

                            return (
                                <div 
                                    key={pedido.id}
                                    onClick={() => setPedidoSelecionado(pedido)}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-[#ea1d2c]/40 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gray-50 p-3 rounded-full border border-gray-100">
                                            <FiShoppingBag className="text-[#ea1d2c]" size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-gray-800">Pedido #{pedido.id}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <FiCalendar size={12}/> {dataFormatada}
                                                </span>
                                            </div>
                                            <h3 className="font-medium text-gray-700 text-sm">
                                                {itens[0]?.produto?.nome_produto || 'Item indisponível'}
                                                {itens.length > 1 && <span className="text-gray-500"> e mais {itens.length - 1} item(ns)</span>}
                                            </h3>
                                            <p className="text-sm font-bold text-[#ea1d2c] mt-2">
                                                {pedido.status_pedido?.nome_status || 'Processando'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 mt-2 sm:mt-0">
                                        <span className="font-bold text-gray-800">
                                            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                        <span className="text-sm text-[#ea1d2c] font-medium mt-1">
                                            Ver detalhes
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {pedidoSelecionado && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        
                        {/* Header do Modal */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Pedido #{pedidoSelecionado.id}</h2>
                                <p className="text-sm text-[#ea1d2c] font-bold mt-1">{pedidoSelecionado.status_pedido?.nome_status || 'Processando'}</p>
                            </div>
                            <button 
                                onClick={() => setPedidoSelecionado(null)}
                                className="p-2 bg-gray-50 text-gray-500 hover:text-[#ea1d2c] hover:bg-red-50 rounded-full transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            
                            <section>
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiShoppingBag className="text-[#ea1d2c]" size={20} />
                                    Resumo do Pedido
                                </h3>
                                <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    {(pedidoSelecionado.itens_sacola || []).map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                                            <span className="text-gray-700">1x {item.produto?.nome_produto || 'Produto indisponível'}</span>
                                            <span className="font-medium text-gray-800">
                                                {parseFloat(item.valor_individual || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {pedidoSelecionado.observacao && pedidoSelecionado.observacao !== "Sem observações" && (
                                <section>
                                    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <FiMessageSquare className="text-[#ea1d2c]" size={20} />
                                        Observações
                                    </h3>
                                    <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-100">
                                        {pedidoSelecionado.observacao}
                                    </div>
                                </section>
                            )}

                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-500 mb-1 flex items-center gap-2">
                                        <FiCreditCard className="text-gray-400" /> Pagamento
                                    </h3>
                                    <p className="font-medium text-gray-800">{pedidoSelecionado.pagamento_pedido?.nome || 'Não informada'}</p>
                                </div>
                                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-500 mb-1 flex items-center gap-2">
                                        <FiMapPin className="text-gray-400" /> Entrega
                                    </h3>
                                    {pedidoSelecionado.dados_entregador ? (
                                        <p className="font-medium text-gray-800">{pedidoSelecionado.dados_entregador.nome}</p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Aguardando entregador</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Total do pedido</span>
                                <span className="text-2xl font-bold text-gray-800">
                                    {calcularTotal(pedidoSelecionado.itens_sacola).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}