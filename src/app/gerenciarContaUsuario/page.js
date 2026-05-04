'use client';
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { FiUser, FiMail, FiCalendar, FiLock, FiCreditCard, FiMapPin, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "@/utils/axios";

export default function PerfilUsuario() {
    const [isLoading, setIsLoading] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("dados");
    
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        data_nascimento: "",
        senhaAtual: "",
        novaSenha: ""
    });

    useEffect(() => {
        const carregarDadosUsuario = () => {
            try {
                const userStr = localStorage.getItem("@App:user");
                if (userStr) {
                    const usuario = JSON.parse(userStr);
                    setFormData((prev) => ({
                        ...prev,
                        nome: usuario.nome || "",
                        email: usuario.email || "",
                        cpf: usuario.cpf || "",
                        data_nascimento: usuario.data_nascimento ? usuario.data_nascimento.split('T')[0] : ""
                    }));
                }
            } catch (error) {
                console.error("Erro ao carregar dados locais:", error);
            }
        };

        carregarDadosUsuario();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvarDados = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userStr = localStorage.getItem("@App:user");
            const usuario = JSON.parse(userStr);

            const resposta = await api.put(`/pessoas/${usuario.id}`, {
                nome: formData.nome,
                data_nascimento: formData.data_nascimento,
                ...(formData.novaSenha && { senha: formData.novaSenha }) 
            });

            const usuarioAtualizado = { ...usuario, nome: formData.nome, data_nascimento: formData.data_nascimento };
            localStorage.setItem("@App:user", JSON.stringify(usuarioAtualizado));

            setFormData(prev => ({ ...prev, senhaAtual: "", novaSenha: "" }));
            toast.success("Perfil atualizado com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar:", error);
            toast.error(error.response?.data?.message || "Erro ao atualizar o perfil.");
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
                                                type="text" 
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors bg-white text-gray-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">E-mail (Não editável)</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                disabled
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">CPF (Não editável)</label>
                                        <div className="relative">
                                            <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="text" 
                                                value={formData.cpf}
                                                disabled
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">Data de Nascimento</label>
                                        <div className="relative">
                                            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="date" 
                                                name="data_nascimento"
                                                value={formData.data_nascimento}
                                                onChange={handleInputChange}
                                                required
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
                                                    type="password" 
                                                    name="novaSenha"
                                                    value={formData.novaSenha}
                                                    onChange={handleInputChange}
                                                    placeholder="Deixe em branco para não alterar"
                                                    minLength="6"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#ea1d2c] focus:ring-1 focus:ring-[#ea1d2c] transition-colors bg-white text-gray-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="bg-ifood text-white font-bold py-3 px-8 rounded-xl hover:bg-ifood transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? "Salvando..." : "Salvar Alterações"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {abaAtiva === "enderecos" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center h-96">
                            <FiMapPin size={48} className="text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum endereço cadastrado</h3>
                            <p className="text-gray-500 max-w-sm mb-6">Adicione um endereço para facilitar a entrega dos seus próximos pedidos.</p>
                            <button className="border-2 border-ifood text-ifood-hover font-bold py-2 px-6 rounded-xl hover:bg-ifood transition-colors">
                                Adicionar Endereço
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}