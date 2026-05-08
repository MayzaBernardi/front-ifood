'use client';

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import Navigation from "@/components/Navigation";
import {
    FiRefreshCcw,
    FiShoppingBag,
    FiClock,
    FiCheckCircle,
    FiTruck
} from "react-icons/fi";

export default function GerenciadorPedidos() {

    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    const buscarPedidos = async () => {

        try {

            setLoading(true);

            const idRestaurante =
                localStorage.getItem("id_restaurante") || "1";

            const dados = await api.get(
                `/pedidos/restaurante/${idRestaurante}`
            );

            setPedidos(Array.isArray(dados) ? dados : []);

        } catch (error) {

            console.error("Erro ao buscar pedidos:", error);

            setPedidos([]);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        Promise.resolve().then(() => {
            buscarPedidos();
        });

    }, []);

    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;

    const currentItems = pedidos.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(
        pedidos.length / itensPorPagina
    );

    const handlePageSizeChange = (e) => {

        setItensPorPagina(Number(e.target.value));
        setPaginaAtual(1);

    };

    const getStatusColor = (status) => {

        const statusLower = status?.toLowerCase() || '';

        if (statusLower.includes('pendente')) {
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }

        if (statusLower.includes('preparando')) {
            return 'bg-blue-100 text-blue-700 border-blue-200';
        }

        if (statusLower.includes('entrega')) {
            return 'bg-purple-100 text-purple-700 border-purple-200';
        }

        if (
            statusLower.includes('concluído') ||
            statusLower.includes('entregue')
        ) {
            return 'bg-green-100 text-green-700 border-green-200';
        }

        if (statusLower.includes('cancelado')) {
            return 'bg-red-100 text-red-700 border-red-200';
        }

        return 'bg-gray-100 text-gray-700 border-gray-200';

    };

    const totalPedidos = pedidos.length;

    const pedidosPendentes = pedidos.filter(
        pedido => pedido.status?.toLowerCase().includes('pendente')
    ).length;

    const pedidosEntrega = pedidos.filter(
        pedido => pedido.status?.toLowerCase().includes('entrega')
    ).length;

    const pedidosConcluidos = pedidos.filter(
        pedido =>
            pedido.status?.toLowerCase().includes('concluído') ||
            pedido.status?.toLowerCase().includes('entregue')
    ).length;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <Navigation />

            <main className="max-w-7xl mx-auto p-4 md:p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-black text-gray-800">
                            Gerenciador de Pedidos
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Acompanhe e gerencie os pedidos do restaurante
                        </p>
                    </div>

                    <button
                        onClick={buscarPedidos}
                        className="flex items-center justify-center gap-2 bg-[#ea1d2c] hover:bg-[#c91825] text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md"
                    >
                        <FiRefreshCcw size={18} />
                        Atualizar Pedidos
                    </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total de Pedidos
                                </p>

                                <h2 className="text-3xl font-black text-gray-800 mt-2">
                                    {totalPedidos}
                                </h2>
                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl">
                                <FiShoppingBag
                                    size={28}
                                    className="text-[#ea1d2c]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pendentes
                                </p>

                                <h2 className="text-3xl font-black text-yellow-600 mt-2">
                                    {pedidosPendentes}
                                </h2>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-2xl">
                                <FiClock
                                    size={28}
                                    className="text-yellow-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Em Entrega
                                </p>

                                <h2 className="text-3xl font-black text-purple-600 mt-2">
                                    {pedidosEntrega}
                                </h2>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-2xl">
                                <FiTruck
                                    size={28}
                                    className="text-purple-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Concluídos
                                </p>

                                <h2 className="text-3xl font-black text-green-600 mt-2">
                                    {pedidosConcluidos}
                                </h2>
                            </div>

                            <div className="bg-green-50 p-4 rounded-2xl">
                                <FiCheckCircle
                                    size={28}
                                    className="text-green-600"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-gray-100">

                        <h2 className="text-xl font-black text-gray-800">
                            Lista de Pedidos
                        </h2>

                        <div className="flex items-center gap-3">

                            <span className="text-sm text-gray-500">
                                Itens por página
                            </span>

                            <select
                                value={itensPorPagina}
                                onChange={handlePageSizeChange}
                                className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea1d2c]"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Pedido
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Cliente
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Data
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Total
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-gray-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-16 text-gray-400 font-medium"
                                        >
                                            Carregando pedidos...
                                        </td>
                                    </tr>

                                ) : currentItems.length > 0 ? (

                                    currentItems.map((pedido) => (

                                        <tr
                                            key={pedido.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                                        >

                                            <td className="px-6 py-5 font-black text-gray-800">
                                                #{pedido.id}
                                            </td>

                                            <td className="px-6 py-5 font-medium text-gray-700">
                                                {pedido.nome_cliente || "Cliente"}
                                            </td>

                                            <td className="px-6 py-5 text-gray-500">
                                                {pedido.created_at
                                                    ? new Date(
                                                        pedido.created_at
                                                    ).toLocaleDateString('pt-BR')
                                                    : "--/--/----"}
                                            </td>

                                            <td className="px-6 py-5 font-bold text-gray-800">
                                                R$ {Number(
                                                    pedido.valor_total || 0
                                                ).toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2
                                                })}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusColor(pedido.status)}`}
                                                >
                                                    {pedido.status || "Pendente"}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex items-center justify-center gap-3">

                                                    <button
                                                        className="bg-[#ea1d2c] hover:bg-[#c91825] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                                    >
                                                        Avançar
                                                    </button>

                                                    <button
                                                        className="border border-gray-200 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                                    >
                                                        Detalhes
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="text-center py-16 text-gray-400 font-medium"
                                        >
                                            Nenhum pedido encontrado.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {pedidos.length > itensPorPagina && (

                        <div className="flex items-center justify-between p-6 border-t border-gray-100">

                            <p className="text-sm text-gray-500">
                                Mostrando {indexOfFirstItem + 1} até{" "}
                                {Math.min(indexOfLastItem, pedidos.length)} de{" "}
                                {pedidos.length} pedidos
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() =>
                                        setPaginaAtual(prev => prev - 1)
                                    }
                                    disabled={paginaAtual === 1}
                                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold disabled:opacity-50"
                                >
                                    Anterior
                                </button>

                                <span className="text-sm font-bold text-gray-700">
                                    Página {paginaAtual} de {totalPages}
                                </span>

                                <button
                                    onClick={() =>
                                        setPaginaAtual(prev => prev + 1)
                                    }
                                    disabled={paginaAtual === totalPages}
                                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold disabled:opacity-50"
                                >
                                    Próxima
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}