import { FcCheckmark } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

export default function TableComponent({
    tarefasPaginadas,
    busca,
    alternarConclusao,
    excluirTarefa,
    tarefasFiltradasLength,
    itensPorPagina,
    handlePageSizeChange,
    indexOfFirstItem,
    indexOfLastItem,
    paginaAtual,
    setPaginaAtual,
    totalPages,
    mostrarId,
    mostrarTarefa,
    mostrarAcoes
}) {

    const colunasAtivas = [mostrarId, mostrarTarefa, mostrarAcoes].filter(Boolean).length;

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-gray-300">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#45858C] text-gray-200 text-xs uppercase">
                        <tr>
                            {mostrarId && <th className="px-4 py-3 font-semibold w-16 text-center">ID</th>}
                            {mostrarTarefa && <th className="px-4 py-3 font-semibold">Tarefa</th>}
                            {mostrarAcoes && <th className="px-4 py-3 font-semibold text-center w-28">Ações</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tarefasPaginadas.length === 0 ? (
                            <tr>
                                <td colSpan={colunasAtivas || 1} className="px-4 py-8 text-center text-gray-400 italic">
                                    {busca ? "Nenhuma tarefa encontrada." : "Nenhuma tarefa cadastrada."}
                                </td>
                            </tr>
                        ) : (
                            tarefasPaginadas.map((tarefa) => (
                                <tr key={tarefa.id} className="hover:bg-gray-50">
                                    {mostrarId && (
                                        <td className="px-4 py-4 text-center text-gray-500 font-medium">
                                            {tarefa.id}
                                        </td>
                                    )}

                                    {mostrarTarefa && (
                                        <td className={`px-4 py-4 ${tarefa.concluida ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                            {tarefa.texto}
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
                    </tbody>
                </table>
            </div>

            {tarefasFiltradasLength > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-600">Itens:</label>
                        <select
                            id="pageSize"
                            value={itensPorPagina}
                            onChange={handlePageSizeChange}
                            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-emerald-600"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="text-sm text-gray-500">
                        Mostrando <span className="font-semibold">{indexOfFirstItem + 1}</span> a <span className="font-semibold">{Math.min(indexOfLastItem, tarefasFiltradasLength)}</span> de <span className="font-semibold">{tarefasFiltradasLength}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                            disabled={paginaAtual === 1}
                            className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-30 hover:bg-gray-50 text-sm font-bold"
                        >
                            Anterior
                        </button>
                        <span className="text-sm font-medium text-gray-600">
                            {paginaAtual} / {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPages))}
                            disabled={paginaAtual === totalPages || totalPages === 0}
                            className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-30 hover:bg-gray-50 text-sm font-bold"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}