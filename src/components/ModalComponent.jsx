export default function ModalComponent({ 
    isOpen, 
    onClose, 
    novaTarefa, 
    setNovaTarefa, 
    responsavelTarefa,
    setResponsavelTarefa,
    salvarTarefa,
    isEditing
}) {
    if (!isOpen) return null;

    return (
        <div tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
                        <h3 className="text-lg font-bold text-gray-900">
                            {isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa"}
                        </h3>
                        <button 
                            onClick={onClose} 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); salvarTarefa(); }}>
                        <div className="py-4 md:py-6 flex flex-col gap-4">
                            <div>
                                <label htmlFor="texto" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                                <input 
                                    type="text" 
                                    id="texto"
                                    value={novaTarefa}
                                    onChange={(e) => setNovaTarefa(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full px-3 py-2.5 outline-none" 
                                    required 
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label htmlFor="responsavel" className="block mb-2 text-sm font-medium text-gray-900">Responsável</label>
                                <input 
                                    type="text" 
                                    id="responsavel"
                                    value={responsavelTarefa}
                                    onChange={(e) => setResponsavelTarefa(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full px-3 py-2.5 outline-none" 
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 border-t border-gray-200 pt-4 md:pt-6">
                            <button 
                                type="submit" 
                                className="inline-flex items-center text-white bg-[#D9C589] hover:opacity-90 font-bold rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                            >
                                {isEditing ? "Salvar Alterações" : "Adicionar"}
                            </button>
                            <button 
                                onClick={onClose} 
                                type="button" 
                                className="text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}