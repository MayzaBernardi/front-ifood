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
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#ea1d2c] shadow-sm text-white text-xs uppercase font-bold">
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
                        <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">Itens:</label>
                        <select
                            id="pageSize"
                            value={itensPorPagina}
                            onChange={handlePageSizeChange}
                            className="border text-gray-800 border-gray-300 rounded-lg px-2 py-1 text-sm outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-shadow bg-white"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="text-sm text-gray-600">
                        Mostrando <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span> a <span className="font-bold text-gray-800">{Math.min(indexOfLastItem, dadosLength)}</span> de <span className="font-bold text-gray-800">{dadosLength}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                            disabled={paginaAtual === 1}
                            className="px-4 py-1.5 text-[#ea1d2c] bg-transparent border border-[#ea1d2c] rounded-lg shadow-sm disabled:opacity-40 disabled:border-gray-300 disabled:text-gray-500 hover:bg-red-50 transition-colors text-sm font-semibold"
                        >
                            Anterior
                        </button>
                        <span className="text-sm font-medium text-gray-600 px-2">
                            {paginaAtual} / {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPages))}
                            disabled={paginaAtual === totalPages || totalPages === 0}
                            className="px-4 py-1.5 text-[#ea1d2c] bg-transparent border border-[#ea1d2c] rounded-lg shadow-sm disabled:opacity-40 disabled:border-gray-300 disabled:text-gray-500 hover:bg-red-50 transition-colors text-sm font-semibold"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}