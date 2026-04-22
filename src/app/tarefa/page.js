'use client';
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiMenuAddFill, RiEdit2Fill } from "react-icons/ri";
import TableComponent from "@/components/TableComponent";
import ModalComponent from "@/components/ModalComponent";

export default function TarefaPage() {
    const [tarefas, setTarefas] = useState([
        { id: 1, texto: "Comprar ingredientes para o jantar", responsavel: "João", concluida: false },
        { id: 2, texto: "Lavar a louça", responsavel: "Maria", concluida: true },
    ]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [responsavelTarefa, setResponsavelTarefa] = useState("");
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [tarefaEditando, setTarefaEditando] = useState(null);

    const mostrarId = true;
    const mostrarTarefa = true;
    const mostrarAcoes = true;

    const colunasAtivas = [];
    if (mostrarId) colunasAtivas.push("ID");
    if (mostrarTarefa) colunasAtivas.push("Tarefa");
    if (mostrarAcoes) colunasAtivas.push("Ações");

    const tarefasFiltradas = tarefas.filter(tarefa => 
        tarefa.texto.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(tarefasFiltradas.length / itensPorPagina);
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const tarefasPaginadas = tarefasFiltradas.slice(indexOfFirstItem, indexOfLastItem);

    const abrirModalNovo = () => {
        setTarefaEditando(null);
        setNovaTarefa("");
        setResponsavelTarefa("");
        setIsModalOpen(true);
    };

    const abrirModalEdicao = (tarefa) => {
        setTarefaEditando(tarefa.id);
        setNovaTarefa(tarefa.texto);
        setResponsavelTarefa(tarefa.responsavel || "");
        setIsModalOpen(true);
    };

    const fecharModal = () => {
        setIsModalOpen(false);
        setTarefaEditando(null);
        setNovaTarefa("");
        setResponsavelTarefa("");
    };

    const salvarTarefa = () => {
        if (novaTarefa.trim() === "") return;

        if (tarefaEditando !== null) {
            setTarefas(tarefas.map(t => 
                t.id === tarefaEditando 
                    ? { ...t, texto: novaTarefa, responsavel: responsavelTarefa } 
                    : t
            ));
        } else {
            const task = {
                id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
                texto: novaTarefa,
                responsavel: responsavelTarefa,
                concluida: false,
            };
            setTarefas([...tarefas, task]);
            setPaginaAtual(1);
        }

        fecharModal();
    };

    const alternarConclusao = (id) => {
        setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
    };

    const excluirTarefa = (id) => {
        setTarefas(tarefas.filter(t => t.id !== id));
        if (tarefasPaginadas.length === 1 && paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <div className="flex h-screen bg-gray-200">
            <main className="flex-1 flex flex-col items-center p-8 pt-20 relative">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex justify-between gap-4 mb-8">
                        <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 bg-white transition-all">
                            <IoSearchOutline className="text-gray-500" />
                            <input
                                type="text"
                                value={busca}
                                onChange={(e) => {
                                    setBusca(e.target.value);
                                    setPaginaAtual(1);
                                }}
                                className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Pesquise pela sua tarefa..."
                            />
                        </div>

                        <button 
                            onClick={abrirModalNovo}
                            className="bg-blue-700 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-800 shadow-sm transition-all flex items-center gap-2"
                        >
                            <RiMenuAddFill size={20} />
                            <span>Nova Tarefa</span>
                        </button>
                    </div>

                    <TableComponent 
                        colunas={colunasAtivas}
                        dadosLength={tarefasFiltradas.length}
                        itensPorPagina={itensPorPagina}
                        handlePageSizeChange={(e) => {
                            setItensPorPagina(Number(e.target.value));
                            setPaginaAtual(1);
                        }}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                        totalPages={totalPages}
                    >
                        {tarefasPaginadas.length === 0 ? (
                            <tr>
                                <td colSpan={colunasAtivas.length || 1} className="px-4 py-8 text-center text-gray-500 italic">
                                    {busca ? "Nenhuma tarefa encontrada." : "Nenhuma tarefa cadastrada."}
                                </td>
                            </tr>
                        ) : (
                            tarefasPaginadas.map((tarefa) => (
                                <tr key={tarefa.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                                    {mostrarId && (
                                        <td className="px-4 py-4 text-center text-gray-500 font-medium">
                                            {tarefa.id}
                                        </td>
                                    )}

                                    {mostrarTarefa && (
                                        <td className={`px-4 py-4 ${tarefa.concluida ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
                                            <div>{tarefa.texto}</div>
                                            {tarefa.responsavel && (
                                                <div className="text-xs text-gray-500 mt-1">Responsável: {tarefa.responsavel}</div>
                                            )}
                                        </td>
                                    )}

                                    {mostrarAcoes && (
                                        <td className="px-4 py-4 flex justify-center gap-2">
                                            <button
                                                onClick={() => alternarConclusao(tarefa.id)}
                                                className={`p-2 rounded-full transition-colors ${tarefa.concluida ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-green-500 hover:text-white'}`}
                                            >
                                                <FcCheckmark />
                                            </button>
                                            <button
                                                onClick={() => abrirModalEdicao(tarefa)}
                                                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-500 hover:text-white transition-colors"
                                            >
                                                <RiEdit2Fill />
                                            </button>
                                            <button
                                                onClick={() => excluirTarefa(tarefa.id)}
                                                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </TableComponent>
                </div>
            </main>

            <ModalComponent 
                isOpen={isModalOpen}
                onClose={fecharModal}
                novaTarefa={novaTarefa}
                setNovaTarefa={setNovaTarefa}
                responsavelTarefa={responsavelTarefa}
                setResponsavelTarefa={setResponsavelTarefa}
                salvarTarefa={salvarTarefa}
                isEditing={tarefaEditando !== null}
            />
        </div>
    );
}