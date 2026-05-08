'use client';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import { 
    FiUser, FiMail, FiCalendar, FiLock, FiCreditCard, 
    FiMapPin, FiChevronRight, FiTrash2, FiPlus 
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "@/utils/axios";

const Mapa = dynamic(() => import('@/components/MapaLocalizacao'), { 
    ssr: false,
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-2xl mt-4" />
});

export default function PerfilUsuario() {
    const [isLoading, setIsLoading] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("dados");
    const [coordenadas, setCoordenadas] = useState(null);
    const [enderecosSalvos, setEnderecosSalvos] = useState([]);
    
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        data_nascimento: "",
        senhaAtual: "",
        novaSenha: ""
    });

    const [enderecoData, setEnderecoData] = useState({
        logradouro: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: ""
    });

    const buscarEnderecos = async (userId) => {
        try {
            const res = await api.get(`/enderecos`); 
            const listaBruta = res.data.data || res.data || [];
            const meusEnderecos = listaBruta.filter(e => String(e.id_pessoas) === String(userId));
            setEnderecosSalvos(meusEnderecos);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const carregarDadosIniciais = () => {
            try {
                const userStr = localStorage.getItem("@App:user");
                if (userStr) {
                    const usuario = JSON.parse(userStr);
                    setFormData((prev) => ({
                        ...prev,
                        nome: usuario.nome || "",
                        email: usuario.email || "",
                        cpf: usuario.cpf || "",
                        data_nascimento: usuario.data_nascimento ? usuario.data_nascimento.split('T') : ""
                    }));
                    buscarEnderecos(usuario.id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const timer = setTimeout(carregarDadosIniciais, 50);
        return () => clearTimeout(timer);
    }, []);

    const handleSalvarDados = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userStr = localStorage.getItem("@App:user");
            const usuario = JSON.parse(userStr);

            await api.patch(`/pessoas/update/${usuario.id}`, {
                nome: formData.nome,
                data_nascimento: formData.data_nascimento,
                ...(formData.novaSenha && { senha: formData.novaSenha }) 
            });

            const usuarioAtualizado = { ...usuario, nome: formData.nome, data_nascimento: formData.data_nascimento };
            localStorage.setItem("@App:user", JSON.stringify(usuarioAtualizado));

            setFormData(prev => ({ ...prev, senhaAtual: "", novaSenha: "" }));
            toast.success("Perfil atualizado com sucesso!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Erro ao atualizar o perfil.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMapaClick = async (coord) => {
        setCoordenadas(coord);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coord.lat}&lon=${coord.lng}`);
            const data = await res.json();
            const a = data.address;
            setEnderecoData({
                logradouro: a.road || a.suburb || a.pedestrian || "",
                cidade: a.city || a.town || "",
                estado: a.state || "",
                cep: a.postcode || "",
                numero: "" 
            });
        } catch (error) {
            toast.error("Erro ao identificar endereço.");
        }
    };

    const handleSalvarEndereco = async () => {
        if (!enderecoData.numero) {
            toast.warning("O número é obrigatório!");
            return;
        }
        setIsLoading(true);
        try {
            const userStr = localStorage.getItem("@App:user");
            const usuario = JSON.parse(userStr);
            await api.post('/enderecos/pessoa', { 
                ...enderecoData, 
                id_pessoas: usuario.id 
            });
            toast.success("Endereço salvo!");
            setCoordenadas(null);
            buscarEnderecos(usuario.id);
        } catch (error) {
            toast.error("Erro ao salvar endereço.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExcluirEndereco = async (enderecoId) => {
        if (!confirm("Tem certeza que deseja excluir este endereço?")) return;
        setIsLoading(true);
        try {
            await api.delete(`/enderecos/${enderecoId}`);
            toast.success("Endereço excluído!");
            const userStr = localStorage.getItem("@App:user");
            const usuario = JSON.parse(userStr);
            buscarEnderecos(usuario.id);
        } catch (error) {
            toast.error("Erro ao excluir endereço.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Minha Conta</h2>
                    <button 
                        onClick={() => setAbaAtiva("dados")}
                        className={`flex items-center justify-between w-full p-4 rounded-xl font-medium transition-colors ${abaAtiva === "dados" ? "bg-white text-[#ea1d2c] shadow-sm border border-gray-100" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="flex items-center gap-3">
                            <FiUser size={20} />
                            Meus Dados
                        </div>
                        <FiChevronRight size={18} className={abaAtiva === "dados" ? "opacity-100" : "opacity-0"} />
                    </button>
                    <button 
                        onClick={() => setAbaAtiva("enderecos")}
                        className={`flex items-center justify-between w-full p-4 rounded-xl font-medium transition-colors ${abaAtiva === "enderecos" ? "bg-white text-[#ea1d2c] shadow-sm border border-gray-100" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="flex items-center gap-3">
                            <FiMapPin size={20} />
                            Endereços
                        </div>
                        <FiChevronRight size={18} className={abaAtiva === "enderecos" ? "opacity-100" : "opacity-0"} />
                    </button>
                </aside>

                <section className="flex-1">
                    {abaAtiva === "dados" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-800">Meus Dados</h3>
                                <p className="text-sm text-gray-500 mt-1">Gerencie suas informações pessoais e senha de acesso.</p>
                            </div>
                            <form onSubmit={handleSalvarDados} className="p-6 md:p-8 flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="text" name="nome" value={formData.nome} onChange={handleInputChange} required
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors bg-white text-gray-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">E-mail (Não editável)</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="email" value={formData.email} disabled className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">CPF (Não editável)</label>
                                        <div className="relative">
                                            <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" value={formData.cpf} disabled className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">Data de Nascimento</label>
                                        <div className="relative">
                                            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleInputChange} required
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors bg-white text-gray-800"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-gray-100 my-4" />
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Alterar Senha</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-gray-700">Nova Senha</label>
                                            <div className="relative">
                                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="password" name="novaSenha" value={formData.novaSenha} onChange={handleInputChange}
                                                    placeholder="Deixe em branco para não alterar" minLength="6"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors bg-white text-gray-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button 
                                        type="submit" disabled={isLoading}
                                        className="bg-[#ea1d2c] text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-70"
                                    >
                                        {isLoading ? "Salvando..." : "Salvar Alterações"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {abaAtiva === "enderecos" && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-xl font-bold mb-4">Meus Endereços</h3>
                                <Mapa aoSelecionar={handleMapaClick} />
                                {coordenadas && (
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <input className="w-full p-3 rounded-xl border bg-gray-50" value={enderecoData.logradouro} readOnly />
                                        </div>
                                        <input 
                                            className="w-full p-3 rounded-xl border border-[#ea1d2c]" placeholder="Número *"
                                            value={enderecoData.numero} onChange={(e) => setEnderecoData({...enderecoData, numero: e.target.value})}
                                        />
                                        <button onClick={handleSalvarEndereco} disabled={isLoading} className="md:col-span-3 bg-[#ea1d2c] text-white font-bold py-3 rounded-xl disabled:opacity-50">
                                            {isLoading ? "Salvando..." : "Salvar Endereço"}
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold mb-4">Salvos</h3>
                                <div className="space-y-3">
                                    {enderecosSalvos.length > 0 ? (
                                        enderecosSalvos.map(end => (
                                            <div key={end.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <FiMapPin className="text-[#ea1d2c]" />
                                                    <div>
                                                        <p className="text-sm font-bold">{end.logradouro}, {end.numero}</p>
                                                        <p className="text-xs text-gray-500">{end.cidade} - {end.estado}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleExcluirEndereco(end.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={18}/></button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-400 py-4 text-sm">Nenhum endereço encontrado.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}