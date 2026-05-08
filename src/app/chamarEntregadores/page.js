'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import api from '@/utils/axios';

import {
    FiTruck,
    FiRefreshCcw,
    FiMapPin,
    FiPhone,
    FiClock,
    FiCheckCircle,
    FiUser
} from 'react-icons/fi';

export default function ChamarEntregadores() {

    const [entregadores, setEntregadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscando, setBuscando] = useState(false);

    useEffect(() => {

        const carregarEntregadores = async () => {

            try {

                setLoading(true);

                const dados = await api.get('/entregadores');

                setEntregadores(Array.isArray(dados) ? dados : []);

            } catch (error) {

                console.error('Erro ao buscar entregadores:', error);

                setEntregadores([]);

            } finally {

                setLoading(false);

            }

        };

        carregarEntregadores();

    }, []);

    const atualizarEntregadores = async () => {

        try {

            setLoading(true);

            const dados = await api.get('/entregadores');

            setEntregadores(Array.isArray(dados) ? dados : []);

        } catch (error) {

            console.error('Erro ao atualizar entregadores:', error);

        } finally {

            setLoading(false);

        }

    };

    const chamarEntregador = async (id) => {

        try {

            setBuscando(true);

            await api.post(`/entregadores/chamar/${id}`);

            alert('Entregador chamado com sucesso!');

            atualizarEntregadores();

        } catch (error) {

            console.error(error);

            alert('Erro ao chamar entregador');

        } finally {

            setBuscando(false);

        }

    };

    const entregadoresDisponiveis = entregadores.filter(
        entregador => entregador.status?.toLowerCase() === 'disponível'
    ).length;

    const entregadoresEntrega = entregadores.filter(
        entregador => entregador.status?.toLowerCase() === 'em entrega'
    ).length;

    const entregadoresOffline = entregadores.filter(
        entregador => entregador.status?.toLowerCase() === 'offline'
    ).length;

    const getStatusStyle = (status) => {

        const statusLower = status?.toLowerCase() || '';

        if (statusLower.includes('disponível')) {
            return 'bg-green-100 text-green-700 border-green-200';
        }

        if (statusLower.includes('entrega')) {
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }

        if (statusLower.includes('offline')) {
            return 'bg-gray-100 text-gray-600 border-gray-200';
        }

        return 'bg-blue-100 text-blue-700 border-blue-200';

    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <Navigation />

            <main className="max-w-7xl mx-auto p-4 md:p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-3xl font-black text-gray-800">
                            Chamar Entregadores
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Gerencie e acione entregadores disponíveis
                        </p>

                    </div>

                    <button
                        onClick={atualizarEntregadores}
                        className="flex items-center justify-center gap-2 bg-[#ea1d2c] hover:bg-[#c91825] text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md"
                    >
                        <FiRefreshCcw size={18} />
                        Atualizar Lista
                    </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Disponíveis
                                </p>

                                <h2 className="text-3xl font-black text-green-600 mt-2">
                                    {entregadoresDisponiveis}
                                </h2>

                            </div>

                            <div className="bg-green-50 p-4 rounded-2xl">

                                <FiCheckCircle
                                    size={28}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Em Entrega
                                </p>

                                <h2 className="text-3xl font-black text-yellow-600 mt-2">
                                    {entregadoresEntrega}
                                </h2>

                            </div>

                            <div className="bg-yellow-50 p-4 rounded-2xl">

                                <FiTruck
                                    size={28}
                                    className="text-yellow-600"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Offline
                                </p>

                                <h2 className="text-3xl font-black text-gray-600 mt-2">
                                    {entregadoresOffline}
                                </h2>

                            </div>

                            <div className="bg-gray-100 p-4 rounded-2xl">

                                <FiUser
                                    size={28}
                                    className="text-gray-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {loading ? (

                        <div className="col-span-full bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center text-gray-400 font-medium">
                            Carregando entregadores...
                        </div>

                    ) : entregadores.length > 0 ? (

                        entregadores.map((entregador) => (

                            <div
                                key={entregador.id}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                            >

                                <div className="flex items-start justify-between mb-6">

                                    <div>

                                        <h2 className="text-xl font-black text-gray-800">
                                            {entregador.nome || 'Entregador'}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-1">
                                            ID #{entregador.id}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-xs font-black border ${getStatusStyle(entregador.status)}`}
                                    >
                                        {entregador.status || 'Disponível'}
                                    </span>

                                </div>

                                <div className="flex flex-col gap-4 mb-6">

                                    <div className="flex items-center gap-3 text-gray-600">

                                        <FiPhone className="text-[#ea1d2c]" />

                                        <span className="text-sm font-medium">
                                            {entregador.telefone || '(00) 00000-0000'}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">

                                        <FiMapPin className="text-[#ea1d2c]" />

                                        <span className="text-sm font-medium">
                                            {entregador.cidade || 'Cidade não informada'}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-3 text-gray-600">

                                        <FiClock className="text-[#ea1d2c]" />

                                        <span className="text-sm font-medium">
                                            Última atividade há {entregador.ultima_atividade || '5 min'}
                                        </span>

                                    </div>
                            </div>
                        </div>

                        ))) : (

                            <div className="col-span-full bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center text-gray-400 font-medium">
                                Nenhum entregador encontrado.
                            </div>

                        )}

                </div>

            </main>

        </div>
    );
}