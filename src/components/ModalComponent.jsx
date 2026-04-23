export default function ModalComponent({ isOpen, onClose, titulo, children }) {
    if (!isOpen) return null;

    return (
        <div tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
                        <h3 className="text-lg font-bold text-gray-800">
                            {titulo}
                        </h3>
                        <button 
                            onClick={onClose} 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center transition-colors"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="px-6 py-6 bg-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}