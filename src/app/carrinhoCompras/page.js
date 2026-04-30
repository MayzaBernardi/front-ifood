'use client';
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { axios } from "axios";
import Head from "next/head";
import Header from "@/components/Header";

export default function CarrinhoCompras() {
    
    useEffect(() => {
        const carrinho = [
            { id: 1, nome: "Prato 1", preco: 29.90, img: "/prato1.png" },
            { id: 2, nome: "Prato 2", preco: 39.90, img: "/prato2.png" },
            { id: 3, nome: "Prato 3", preco: 19.90, img: "/prato3.png" },
        ];

        console.log("Carrinho de compras:", carrinho);
    }, []);

    return (
        
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Header />
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>
                {/* Aqui você pode renderizar os itens do carrinho */}
                <p>Seu carrinho está vazio.</p>
            </main>
        </div>
    );
}