'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

import {
    FiShoppingBag,
    FiBookOpen,
    FiTruck,
    FiUsers,
    FiTrendingUp,
    FiDollarSign,
    FiClock,
    FiCheckCircle,
    FiArrowRight
} from 'react-icons/fi';

export default function HomeRestaurante() {

    const cards = [
        {
            titulo: 'Gerenciar Pedidos',
            descricao: 'Acompanhe pedidos em tempo real e atualize status.',
            icone: <FiShoppingBag size={32} />,
            rota: '/gerenciadorPedidos',
            cor: 'bg-[#ea1d2c]'
        },
        {
            titulo: 'Visualizar Cardápio',
            descricao: 'Edite pratos, preços e fotos do restaurante.',
            icone: <FiBookOpen size={32} />,
            rota: '/visualizarMenu',
            cor: 'bg-orange-500'
        },
        {
            titulo: 'Chamar Entregadores',
            descricao: 'Acione entregadores disponíveis para entregas.',
            icone: <FiTruck size={32} />,
            rota: '/chamarEntregadores',
            cor: 'bg-purple-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <Navigation />

            <main className="max-w-7xl mx-auto p-4 md:p-8">

                <div className="bg-linear-to-r from-[#ea1d2c] to-[#ff4d5a] rounded-3xl p-8 md:p-10 text-white shadow-lg mb-8 overflow-hidden relative">

                    <div className="relative z-10">

                        <p className="uppercase tracking-[4px] text-sm font-bold opacity-80 mb-3">
                            Painel do Restaurante
                        </p>

                        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl">
                            Gerencie seu restaurante de forma rápida e inteligente
                        </h1>

                        <p className="mt-5 text-white/90 text-lg max-w-2xl leading-relaxed">
                            Controle pedidos, cardápio, entregadores e acompanhe o desempenho do restaurante em tempo real.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">

                            <Link
                                href="/gerenciadorPedidos"
                                className="bg-white text-[#ea1d2c] px-6 py-4 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-md"
                            >
                                Ver Pedidos
                            </Link>

                            <Link
                                href="/visualizarMenu"
                                className="bg-black/20 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl font-black hover:bg-black/30 transition-all"
                            >
                                Gerenciar Cardápio
                            </Link>

                        </div>

                    </div>

                    <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-white/10 rounded-full" />
                    <div className="absolute right-20 top-10 w-28 h-28 bg-white/10 rounded-full" />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 font-medium">
                                    Pedidos Hoje
                                </p>

                                <h2 className="text-4xl font-black text-gray-800 mt-3">
                                    24
                                </h2>

                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl">

                                <FiShoppingBag
                                    size={30}
                                    className="text-[#ea1d2c]"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 font-medium">
                                    Faturamento
                                </p>

                                <h2 className="text-4xl font-black text-green-600 mt-3">
                                    R$ 2.450
                                </h2>

                            </div>

                            <div className="bg-green-50 p-4 rounded-2xl">

                                <FiDollarSign
                                    size={30}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 font-medium">
                                    Tempo Médio
                                </p>

                                <h2 className="text-4xl font-black text-yellow-500 mt-3">
                                    28m
                                </h2>

                            </div>

                            <div className="bg-yellow-50 p-4 rounded-2xl">

                                <FiClock
                                    size={30}
                                    className="text-yellow-500"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 font-medium">
                                    Concluídos
                                </p>

                                <h2 className="text-4xl font-black text-blue-600 mt-3">
                                    18
                                </h2>

                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl">

                                <FiCheckCircle
                                    size={30}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mb-8">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-black text-gray-800">
                                Funcionalidades
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Acesse rapidamente as áreas do restaurante
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {cards.map((card, index) => (

                            <Link
                                key={index}
                                href={card.rota}
                                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                            >

                                <div className={`w-16 h-16 rounded-2xl ${card.cor} text-white flex items-center justify-center mb-6`}>
                                    {card.icone}
                                </div>

                                <h3 className="text-xl font-black text-gray-800 mb-3">
                                    {card.titulo}
                                </h3>

                                <p className="text-gray-500 leading-relaxed text-sm mb-6">
                                    {card.descricao}
                                </p>

                                <div className="flex items-center gap-2 text-[#ea1d2c] font-black group-hover:gap-4 transition-all">
                                    Acessar
                                    <FiArrowRight size={18} />
                                </div>

                            </Link>

                        ))}

                    </div>

                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>

                            <p className="uppercase text-sm tracking-[3px] font-black text-[#ea1d2c] mb-3">
                                Desempenho
                            </p>

                            <h2 className="text-3xl font-black text-gray-800 max-w-2xl leading-tight">
                                Seu restaurante teve um crescimento de 18% esta semana
                            </h2>

                            <p className="text-gray-500 mt-4 max-w-2xl leading-relaxed">
                                Continue acompanhando pedidos, entregas e satisfação dos clientes para aumentar ainda mais suas vendas.
                            </p>

                        </div>

                        <div className="bg-red-50 rounded-3xl p-6 flex items-center gap-5 min-w-70">

                            <div className="bg-[#ea1d2c] w-16 h-16 rounded-2xl flex items-center justify-center text-white">

                                <FiTrendingUp size={32} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500 font-medium">
                                    Crescimento Semanal
                                </p>

                                <h3 className="text-4xl font-black text-[#ea1d2c] mt-2">
                                    +18%
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}
