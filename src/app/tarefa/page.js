'use client';
import { use, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiMenuAddFill, RiEdit2Fill } from "react-icons/ri";
import TableComponent from "@/components/TableComponent";
import ModalComponent from "@/components/ModalComponent";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function TarefaPage() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [responsavelTarefa, setResponsavelTarefa] = useState("");
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);

    useEffect(() => {
        async function getTarefas() {
            try {
                const resposta = await api.get('/tarefa/get-all');
                
                const tarefasFormatadas = resposta.data.map((itemDoBanco) => ({
                    id: itemDoBanco.id, 
                    texto: itemDoBanco.tarefa, 
                    responsavel: itemDoBanco.responsavel,
                    arquivo: itemDoBanco.arquivo,
                    criadoEm: itemDoBanco.created_at,
                    atualizadoEm: itemDoBanco.updated_at
                }));
                console.log("resposta da api:", resposta.data);

                setTarefas(tarefasFormatadas);      
            } catch (error) {
                console.log(error.message);
            }
        }
        getTarefas();
    }, []);

    const salvarTarefa = async () => {
        if (novaTarefa.trim() === "") return;

        if (tarefaEditando !== null) {
            console.log("Editando a tarefa: ", tarefaEditando);

            try {
                const pacote = {
                    tarefa: novaTarefa,
                    responsavel: responsavelTarefa
                };

                const resposta = await api.patch(`/tarefa/update/${tarefaEditando}`, pacote);

                const tarefasAtualizadas = tarefas.map(t => {
                    if (t.id === tarefaEditando) {
                        return {
                            ...t,
                            texto: novaTarefa,
                            responsavel: responsavelTarefa
                        };
                    }
                    return t;
                });
                
                setTarefas(tarefasAtualizadas);
                toast.success("Tarefa atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar tarefa:", error);
                toast.error("Ops! Ocorreu um erro ao atualizar a tarefa.");
            }
        } else {
            try {
                const pacote = {
                    tarefa: novaTarefa,
                    responsavel: responsavelTarefa
                };
                
                const resposta = await api.post('/tarefa/create', pacote);
                
                const novaTarefaCriada = {
                    id: resposta.data.id, 
                    texto: resposta.data.tarefa, 
                    responsavel: resposta.data.responsavel,
                };
                
                setTarefas([...tarefas, novaTarefaCriada]);
                setPaginaAtual(1);
                toast.success("Tarefa criada com sucesso!");

            } catch (error) {
                console.error("Erro ao criar tarefa:", error);
                toast.error("Ops! Ocorreu um erro ao salvar no banco de dados.");
            }
        }
        fecharModal();
    };

    const alternarConclusao = (id) => {
        const tarefasAtualizadas = tarefas.map(t => {
            if (t.id === id) {
                const pacote = { concluida: !t.concluida };
                return { ...t, concluida: !t.concluida };
            }
            return t;
        });
        setTarefas(tarefasAtualizadas);
    };

    const excluirTarefa = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

        try {
            await api.delete(`/tarefa/deletar/${id}`);
            const tarefasAtualizadas = tarefas.filter(t => t.id !== id);
            setTarefas(tarefasAtualizadas);

            if (tarefasPaginadas.length === 1 && paginaAtual > 1) {
                setPaginaAtual(paginaAtual - 1);
            }
            toast.success("Tarefa excluída com sucesso!");

        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            toast.error("Ops! Ocorreu um erro ao excluir a tarefa.");
            if (error.response) {
                console.log("Detalhes do erro no servidor:", error.response.data);
            }
        }
    };

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
        setIsModalOpen(true); };

    const abrirModalEdicao = (tarefa) => {
        setTarefaEditando(tarefa.id);
        setNovaTarefa(tarefa.texto);
        setResponsavelTarefa(tarefa.responsavel || "");
        setIsModalOpen(true); };

    const fecharModal = () => {
        setIsModalOpen(false);
        setTarefaEditando(null);
        setNovaTarefa("");
        setResponsavelTarefa(""); };

    return (
        <div className="flex h-screen bg-gray-300">
            <main className="flex-1 flex flex-col items-center p-8 pt-20 relative">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex justify-between gap-4 mb-8">
                        <div className="flex-1 flex items-center border border-gray-500 rounded-lg px-3 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 bg-white transition-all">
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
                            className="bg-[#61a1a1] text-white px-5 py-3 rounded-lg font-bold hover:bg-[#408181] shadow-sm transition-all flex items-center gap-2"
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
                titulo={tarefaEditando !== null ? "Editar Tarefa" : "Nova Tarefa"}
            >
                <form onSubmit={(e) => { e.preventDefault(); salvarTarefa(); }}>
                    <div className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="texto" className="block mb-1.5 text-sm font-semibold text-gray-700">Descrição</label>
                            <input 
                                type="text" 
                                id="texto"
                                placeholder="O que deseja fazer hoje?"
                                value={novaTarefa}
                                onChange={(e) => setNovaTarefa(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 block w-full px-3 py-2.5 outline-none transition-all" 
                                required 
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="responsavel" className="block mb-1.5 text-sm font-semibold text-gray-700">Responsável</label>
                            <input 
                                type="text" 
                                id="responsavel"
                                placeholder="Nome do responsável"
                                value={responsavelTarefa}
                                onChange={(e) => setResponsavelTarefa(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-blue-700 block w-full px-3 py-2.5 outline-none transition-all" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-8 pt-4 border-t border-gray-100">
                        <button 
                            type="submit" 
                            className="flex-1 bg-[#61a1a1] text-white hover:bg-[#4e9191] font-bold rounded-lg text-sm px-5 py-3 transition-colors"
                        >
                            {tarefaEditando !== null ? "Salvar Alterações" : "Adicionar Tarefa"}                                
                        </button>
                        <button 
                            onClick={fecharModal} 
                            type="button" 
                            className="flex-1 text-white bg-red-500 border border-red hover:bg-[#c71f1f] font-bold rounded-lg text-sm px-5 py-3 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </ModalComponent>
        </div>
    );
}