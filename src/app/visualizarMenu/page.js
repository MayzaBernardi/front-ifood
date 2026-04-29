'use client';
import Image from "next/image";
import Link from "next/link";
import TableComponent from "@/components/TableComponent";
import api from "@/utils/axios";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation"; 

export default function VisualizarMenu() {
    const [cardapio, setCardapio] = useState([]);
    
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    useEffect(() => {
        const fetchCardapio = async () => {
            try {
                const resposta = await api.get('/cardapios/restaurantes/1'); 
                setCardapio(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar cardápio:", error);
            }
        };

        fetchCardapio();
    }, []);

    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const currentItems = cardapio.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cardapio.length / itensPorPagina);

    const handlePageSizeChange = (e) => {
        setItensPorPagina(Number(e.target.value));
        setPaginaAtual(1); 
    };

    const colunas = ["ID", "Foto", "Nome", "Preço", "Categoria", "Ações"];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Navigation />
            <main className="p-4 md:p-8 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Cardápio do Restaurante</h1>
                
                <TableComponent
                    colunas={colunas}
                    dadosLength={cardapio.length}
                    itensPorPagina={itensPorPagina}
                    handlePageSizeChange={handlePageSizeChange}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    paginaAtual={paginaAtual}
                    setPaginaAtual={setPaginaAtual}
                    totalPages={totalPages}
                >
                    {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 text-center text-gray-600">{item.id}</td>
                                    <td className="px-4 py-4">
                                        <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                                            {item.arquivo_cardapio ? (
                                                <Image 
                                                    src={item.arquivo_cardapio} 
                                                    alt={item.nome_prato} 
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover" 
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400">Sem foto</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-medium text-gray-800">{item.nome_prato}</td>
                                    <td className="px-4 py-4 text-gray-600">
                                        R$ {Number(item.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{item.id_categoria}</td>
                                    <td className="px-4 py-4 text-center">
                                        <button className="text-[#ea1d2c] hover:text-red-800 font-semibold text-sm transition-colors">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={colunas.length} className="px-4 py-8 text-center text-gray-500">
                                    Nenhum item encontrado no cardápio.
                                </td>
                            </tr>
                        )}
                </TableComponent>
            </main>
        </div>
    );
}