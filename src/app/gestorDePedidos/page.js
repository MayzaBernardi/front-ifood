'use client';
import Link from "next/link";
import TableComponent from "@/components/TableComponent";
import api from "@/utils/axios";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation"; 

export default function GerenciadorPedidos() {
    const [pedidos, setPedidos] = useState([]);
    
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const idRestaurante = localStorage.getItem('id_restaurante') || '1';
                const resposta = await api.get(`/pedidos/restaurantes/${idRestaurante}`); 
                setPedidos(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            }
        };

        fetchPedidos();
    }, []);

    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const currentItems = pedidos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pedidos.length / itensPorPagina);

    const handlePageSizeChange = (e) => {
        setItensPorPagina(Number(e.target.value));
        setPaginaAtual(1); 
    };

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('pendente')) return 'bg-yellow-100 text-yellow-800';
        if (statusLower.includes('preparando')) return 'bg-blue-100 text-blue-800';
        if (statusLower.includes('entrega')) return 'bg-purple-100 text-purple-800';
        if (statusLower.includes('concluído') || statusLower.includes('entregue')) return 'bg-green-100 text-green-800';
        if (statusLower.includes('cancelado')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const colunas = ["Nº Pedido", "Cliente", "Data", "Total", "Status", "Ações"];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Navigation />
            <main className="p-4 md:p-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Gerenciador de Pedidos</h1>
                    <button className="bg-ifood hover:bg-ifood-hover text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                        Atualizar Pedidos
                    </button>
                </div>
                
                <TableComponent
                    colunas={colunas}
                    dadosLength={pedidos.length}
                    itensPorPagina={itensPorPagina}
                    handlePageSizeChange={handlePageSizeChange}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    paginaAtual={paginaAtual}
                    setPaginaAtual={setPaginaAtual}
                    totalPages={totalPages}
                >
                    {currentItems.length > 0 ? (
                            currentItems.map((pedido) => (
                                <tr key={pedido.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">
                                        #{pedido.id}
                                    </td>
                                    <td className="px-4 py-4 font-medium text-gray-800">
                                        {pedido.nome_cliente || "Cliente"}
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">
                                        {pedido.data_pedido ? new Date(pedido.data_pedido).toLocaleDateString('pt-BR') : "--/--/----"}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        R$ {Number(pedido.valor_total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(pedido.status)}`}>
                                            {pedido.status || "Pendente"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button className="text-ifood hover:text-red-800 font-semibold text-sm transition-colors">
                                                Avançar Status
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-800 font-semibold text-sm transition-colors border-l border-gray-300 pl-3">
                                                Detalhes
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={colunas.length} className="px-4 py-8 text-center text-gray-500">
                                    Nenhum pedido encontrado para este restaurante.
                                </td>
                            </tr>
                        )}
                </TableComponent>
            </main>
        </div>
    );
}