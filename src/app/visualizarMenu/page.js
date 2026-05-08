'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/axios";
import Navigation from "@/components/Navigation";

import {
    FiBookOpen,
    FiRefreshCcw,
    FiDollarSign,
    FiGrid,
    FiEdit
} from "react-icons/fi";

export default function VisualizarMenu() {

    const [cardapio, setCardapio] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    useEffect(() => {

        const carregarCardapio = async () => {

            try {

                setLoading(true);

                const idRestaurante =
                    localStorage.getItem("id_restaurante") || "1";

                const resposta = await api.get(
                    `/cardapios/restaurantes/${idRestaurante}`
                );

                const dados = resposta?.data || [];

                setCardapio(Array.isArray(dados) ? dados : []);

            } catch (error) {

                console.error("Erro ao buscar cardápio:", error);

                setCardapio([]);

            } finally {

                setLoading(false);

            }

        };

        carregarCardapio();

    }, []);

    const atualizarCardapio = async () => {

        try {

            setLoading(true);

            const idRestaurante =
                localStorage.getItem("id_restaurante") || "1";

            const resposta = await api.get(
                `/cardapios/restaurantes/${idRestaurante}`
            );

            const dados = resposta?.data || [];

            setCardapio(Array.isArray(dados) ? dados : []);

        } catch (error) {

            console.error("Erro ao atualizar cardápio:", error);

        } finally {

            setLoading(false);

        }

    };

    const indexOfLastItem =
        paginaAtual * itensPorPagina;

    const indexOfFirstItem =
        indexOfLastItem - itensPorPagina;

    const currentItems = cardapio.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(
        cardapio.length / itensPorPagina
    );

    const handlePageSizeChange = (e) => {

        setItensPorPagina(Number(e.target.value));

        setPaginaAtual(1);

    };

    const totalItens = cardapio.length;

    const valorMedio =
        totalItens > 0
            ? (
                cardapio.reduce(
                    (acc, item) => acc + Number(item.preco || 0),
                    0
                ) / totalItens
            ).toFixed(2)
            : 0;

    const categoriasUnicas = [
        ...new Set(cardapio.map(item => item.id_categoria))
    ].length;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <Navigation />

            <main className="max-w-7xl mx-auto p-4 md:p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-3xl font-black text-gray-800">
                            Cardápio do Restaurante
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Gerencie todos os itens cadastrados
                        </p>

                    </div>

                    <button
                        onClick={atualizarCardapio}
                        className="flex items-center justify-center gap-2 bg-[#ea1d2c] hover:bg-[#c91825] text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md"
                    >
                        <FiRefreshCcw size={18} />
                        Atualizar Cardápio
                    </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total de Itens
                                </p>

                                <h2 className="text-3xl font-black text-gray-800 mt-2">
                                    {totalItens}
                                </h2>

                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl">

                                <FiBookOpen
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
                                    Valor Médio
                                </p>

                                <h2 className="text-3xl font-black text-green-600 mt-2">
                                    R$ {Number(valorMedio).toLocaleString(
                                        'pt-BR',
                                        {
                                            minimumFractionDigits: 2
                                        }
                                    )}
                                </h2>

                            </div>

                            <div className="bg-green-50 p-4 rounded-2xl">

                                <FiDollarSign
                                    size={28}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Categorias
                                </p>

                                <h2 className="text-3xl font-black text-blue-600 mt-2">
                                    {categoriasUnicas}
                                </h2>

                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl">

                                <FiGrid
                                    size={28}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-gray-100">

                        <h2 className="text-xl font-black text-gray-800">
                            Lista de Produtos
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
                                        ID
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Foto
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Nome
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Preço
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                        Categoria
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
                                            Carregando cardápio...
                                        </td>

                                    </tr>

                                ) : currentItems.length > 0 ? (

                                    currentItems.map((item) => {

                                        const imagem =
                                            item?.arquivos_cardapios?.[0]
                                                ?.arquivo ||
                                            null;

                                        return (

                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                                            >

                                                <td className="px-6 py-5 font-black text-gray-800">
                                                    #{item.id}
                                                </td>

                                                <td className="px-6 py-5">

                                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">

                                                        {imagem ? (

                                                            <Image
                                                                src={imagem}
                                                                alt={item.nome_prato}
                                                                fill
                                                                className="object-cover"
                                                            />

                                                        ) : (

                                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                                Sem foto
                                                            </div>

                                                        )}

                                                    </div>

                                                </td>

                                                <td className="px-6 py-5 font-bold text-gray-800">
                                                    {item.nome_prato}
                                                </td>

                                                <td className="px-6 py-5 font-bold text-green-600">
                                                    R$ {Number(
                                                        item.preco || 0
                                                    ).toLocaleString('pt-BR', {
                                                        minimumFractionDigits: 2
                                                    })}
                                                </td>

                                                <td className="px-6 py-5">

                                                    <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold">
                                                        Categoria {item.id_categoria}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-5 text-center">

                                                    <button
                                                        className="inline-flex items-center gap-2 bg-[#ea1d2c] hover:bg-[#c91825] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                                    >
                                                        <FiEdit size={16} />
                                                        Editar
                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    })

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="text-center py-16 text-gray-400 font-medium"
                                        >
                                            Nenhum item encontrado no cardápio.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {cardapio.length > itensPorPagina && (

                        <div className="flex items-center justify-between p-6 border-t border-gray-100">

                            <p className="text-sm text-gray-500">
                                Mostrando {indexOfFirstItem + 1} até{" "}
                                {Math.min(indexOfLastItem, cardapio.length)} de{" "}
                                {cardapio.length} itens
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