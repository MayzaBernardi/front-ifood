export default function TableComponent({
    colunas,
    dadosLength,
    itensPorPagina,
    handlePageSizeChange,
    indexOfFirstItem,
    indexOfLastItem,
    paginaAtual,
    setPaginaAtual,
    totalPages,
    children
}) {
    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-gray-300">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#8ec2c2] shadow text-white text-xs uppercase rounded-lg font-bold">
                        <tr>
                            {colunas.map((coluna, index) => (
                                <th key={index} className={`px-4 py-3 font-semibold ${coluna === 'Ações' ? 'text-center w-28' : ''} ${coluna === 'ID' ? 'w-16 text-center' : ''}`}>
                                    {coluna}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {children}
                    </tbody>
                </table>
            </div>

            {dadosLength > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-800">Itens:</label>
                        <select
                            id="pageSize"
                            value={itensPorPagina}
                            onChange={handlePageSizeChange}
                            className="border text-black border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-emerald-600"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="text-sm text-gray-800">
                        Mostrando <span className="font-semibold">{indexOfFirstItem + 1}</span> a <span className="font-semibold">{Math.min(indexOfLastItem, dadosLength)}</span> de <span className="font-semibold">{dadosLength}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                            disabled={paginaAtual === 1}
                            className="px-3 py-1 text-white bg-gray-800 border rounded shadow-sm disabled:opacity-50 hover:bg-gray-700 text-sm"
                        >
                            Anterior
                        </button>
                        <span className="text-sm font-medium text-gray-600">
                            {paginaAtual} / {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPages))}
                            disabled={paginaAtual === totalPages || totalPages === 0}
                            className="px-3 py-1 text-white bg-gray-800 border rounded shadow-sm disabled:opacity-50 hover:bg-gray-700 text-sm"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}