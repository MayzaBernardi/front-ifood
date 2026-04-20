'use client';
import { useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md"; 
import { RiMenuAddFill, RiHome4Line } from "react-icons/ri"; 
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaHamburger } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import "../globals.css";
import TableComponent from "@/components/TableComponent";

export default function TarefaPage() {
    const [tarefas, setTarefas] = useState([
        { id: 1, texto: "Comprar ingredientes para o jantar", concluida: false },
        { id: 2, texto: "Lavar a louça", concluida: true },
        { id: 3, texto: "Organizar a despensa", concluida: false },
    ]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [busca, setBusca] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    const tarefasFiltradas = tarefas.filter(tarefa => 
        tarefa.texto.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(tarefasFiltradas.length / itensPorPagina);
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const tarefasPaginadas = tarefasFiltradas.slice(indexOfFirstItem, indexOfLastItem);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === "") return;
        const task = {
            id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
            texto: novaTarefa,
            concluida: false,
        };
        setTarefas([...tarefas, task]);
        setNovaTarefa("");
        setPaginaAtual(1);
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

    const handlePageSizeChange = (e) => {
        setItensPorPagina(Number(e.target.value));
        setPaginaAtual(1);
    };

    return (
        <div className="flex min-h-screen bg-[#A0D9D9] font-sans text-[#3e3e3e] relative">
            <button 
                onClick={() => setSidebarOpen(true)}
                className="absolute top-6 left-6 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 z-10"
            >
                <FaHamburger className="text-[#000000]" />
            </button>

            {sidebarOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col p-6">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-2 text-[#0c0304]">
                                <LiaClipboardListSolid size={32} />
                                <span className="font-bold text-xl uppercase italic">Menu</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)}>
                                <MdClose size={24} className="text-gray-500 hover:text-black" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-4">
                            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 font-medium">
                                <RiHome4Line size={20} /> Home
                            </Link>
                            <Link href="/tarefas" className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-[#140f0f] font-bold">
                                <LiaClipboardListSolid size={20} /> Minhas Tarefas
                            </Link>
                        </nav>
                    </aside>
                </>
            )}

            <main className="flex-1 flex flex-col items-center p-8 pt-20">
                <h1 className="text-center text-4xl font-bold text-[#202709] mb-4"> 
                    Minhas Tarefas
                </h1>
                
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex gap-2 mb-4 items-center border border-gray-200 rounded-lg px-3 focus-within:border-emerald-600 bg-gray-50">
                        <IoSearchOutline className="text-gray-400" />
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.target.value);
                                setPaginaAtual(1);
                            }}
                            className="flex-1 py-3 bg-transparent focus:outline-none"
                            placeholder="Pesquise pela sua tarefa..."
                        />
                    </div>
                    
                    <div className="flex gap-2 mb-8">
                        <input
                            value={novaTarefa}
                            onChange={(e) => setNovaTarefa(e.target.value)}
                            type="text"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
                            placeholder="Adicione uma nova tarefa..."
                        />
                        <button 
                            onClick={adicionarTarefa}
                            className="bg-[#D9C589] text-white px-5 py-4 rounded-lg font-bold hover:opacity-90 transition-all"
                        >
                            <RiMenuAddFill />
                        </button>
                    </div>

                    <TableComponent 
                        tarefasPaginadas={tarefasPaginadas}
                        busca={busca}
                        alternarConclusao={alternarConclusao}
                        excluirTarefa={excluirTarefa}
                        tarefasFiltradasLength={tarefasFiltradas.length}
                        itensPorPagina={itensPorPagina}
                        handlePageSizeChange={handlePageSizeChange}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        paginaAtual={paginaAtual}
                        setPaginaAtual={setPaginaAtual}
                        totalPages={totalPages}
                        mostrarId={true}
                        mostrarTarefa={true}
                        mostrarAcoes={true}
                    />
                </div>
            </main>
        </div>
    );
}