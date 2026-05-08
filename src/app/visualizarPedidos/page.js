'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    FiChevronLeft,
    FiShoppingBag,
    FiCalendar,
    FiCreditCard,
    FiX,
    FiClock,
    FiMapPin
} from "react-icons/fi";

import Header from "@/components/Header";
import api from "@/utils/axios";
import Link from "next/link";

export default function VisualizarPedidos() {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    useEffect(() => {
        const carregarUsuario = () => {
            try {
                const userStr = localStorage.getItem("@App:user");

                if (userStr) {
                    setUsuarioLogado(JSON.parse(userStr));
                }
            } catch (err) {
                console.error("Erro ao carregar usuário:", err);
            } finally {
                setMounted(true);
            }
        };

        carregarUsuario();
    }, []);

        useEffect(() => {
        if (!usuarioLogado?.id) return;

        async function buscarPedidos() {
            try {
                setCarregando(true);

                const resposta = await api.get(
                    `/pedidos/pessoas/${usuarioLogado.id}`
                );

                console.log("RESPOSTA:", resposta);

                const lista = Array.isArray(resposta)
                    ? resposta
                    : resposta?.data || [];

                console.log("LISTA FINAL:", lista);

                setPedidos(lista);

            } catch (error) {
                console.error(error);
                setPedidos([]);
            } finally {
                setCarregando(false);
            }
        }

        buscarPedidos();

    }, [usuarioLogado]);

    const calcularTotal = (itens) => {
        if (!Array.isArray(itens)) return 0;

        return itens.reduce((acc, item) => {
            return acc + Number(item?.valor_individual || 0);
        }, 0);
    };

    if (!mounted) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    console.log("STATE PEDIDOS:", pedidos);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />

            <main className="max-w-5xl mx-auto p-4 sm:p-8">

                    <Link href="/homeUsuario" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
                        <FiChevronLeft size={20} />
                        Voltar
                    </Link>

                <h1 className="text-2xl font-bold mb-8">
                    Meus Pedidos
                </h1>

                {carregando && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FiClock
                            size={40}
                            className="animate-spin text-[#ea1d2c] mb-4"
                        />

                        <p className="text-gray-500">
                            Buscando seus pedidos...
                        </p>
                    </div>
                )}

                {!carregando && pedidos.length === 0 && (
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">

                        <FiShoppingBag
                            size={48}
                            className="text-gray-200 mb-4"
                        />

                        <h2 className="text-xl font-bold mb-2 text-gray-800">
                            Você ainda não pediu nada
                        </h2>

                        <button
                            onClick={() => router.push('/homeUsuario')}
                            className="bg-[#ea1d2c] text-white font-bold py-3 px-8 rounded-xl mt-4 hover:bg-[#c91825]"
                        >
                            Ver cardápio agora
                        </button>
                    </div>
                )}

                {!carregando && pedidos.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {pedidos.map((pedido) => {
                            const itens = pedido?.itens_sacola || [];
                            const primeiroItem = itens[0];

                            return (
                                <div
                                    key={pedido.id}
                                    onClick={() => setPedidoSelecionado(pedido)}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-[#ea1d2c]/40 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-center gap-4"
                                >
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="bg-gray-50 p-3 rounded-full border border-gray-100">
                                            <FiShoppingBag
                                                className="text-[#ea1d2c]"
                                                size={24}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-gray-800">
                                                    Pedido #{pedido.id}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    •
                                                </span>

                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <FiCalendar size={12} />

                                                    {pedido.data_pedido
                                                        ? new Date(
                                                            pedido.data_pedido
                                                        ).toLocaleDateString("pt-BR")
                                                        : "Sem data"}
                                                </span>
                                            </div>

                                            <h3 className="font-medium text-gray-700 text-sm">
                                                {primeiroItem?.produto?.nome_prato ||
                                                    "Pedido iFood"}

                                                {itens.length > 1 && (
                                                    <span className="text-gray-400 font-normal">
                                                        {" "}
                                                        + {itens.length - 1} itens
                                                    </span>
                                                )}
                                            </h3>

                                            <p className="text-sm font-bold text-[#ea1d2c] mt-2">
                                                {pedido?.status_pedido?.situacao ||
                                                    "Em processamento"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex sm:flex-col items-end w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0">
                                        <span className="font-bold text-lg text-gray-800">
                                            {calcularTotal(itens).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </span>

                                        <span className="text-xs text-[#ea1d2c] font-bold uppercase mt-1">
                                            Ver Detalhes
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {pedidoSelecionado && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">

                            <div>
                                <h2 className="text-xl font-bold">
                                    Pedido #{pedidoSelecionado?.id}
                                </h2>

                                <p className="text-sm text-[#ea1d2c] font-bold">
                                    {pedidoSelecionado?.status_pedido?.situacao}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setPedidoSelecionado(null)
                                }
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">

                            <section>
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiShoppingBag className="text-[#ea1d2c]" />
                                    Itens do Pedido
                                </h3>

                                <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">

                                    {pedidoSelecionado?.itens_sacola?.map(
                                        (item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between text-sm"
                                            >
                                                <span className="text-gray-700">
                                                    1x {item?.produto?.nome_prato}
                                                </span>

                                                <span className="font-bold">
                                                    {Number(
                                                        item?.valor_individual || 0
                                                    ).toLocaleString(
                                                        'pt-BR',
                                                        {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">

                                    <h3 className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-2">
                                        <FiCreditCard />
                                        PAGAMENTO
                                    </h3>

                                    <p className="text-sm font-bold">
                                        {pedidoSelecionado?.pagamento_pedido?.tipoPagamento?.tipo ||
                                            'Não informado'}
                                    </p>
                                </div>

                                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">

                                    <h3 className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-2">
                                        <FiMapPin />
                                        ENTREGA
                                    </h3>

                                    <p className="text-xs text-gray-500 italic">
                                        Ver no seu perfil
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-white">

                            <div className="flex justify-between items-center">

                                <span className="text-gray-500 font-medium">
                                    Total Pago
                                </span>

                                <span className="text-2xl font-bold text-gray-800">
                                    {Number(
                                        calcularTotal(
                                            pedidoSelecionado?.itens_sacola
                                        )
                                    ).toLocaleString(
                                        'pt-BR',
                                        {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}