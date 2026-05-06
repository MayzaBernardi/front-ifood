'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const salvo = localStorage.getItem('@iFood:carrinho');
        if (salvo) setCarrinho(JSON.parse(salvo));
    }, []);

    useEffect(() => {
        localStorage.setItem('@iFood:carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarAoCarrinho = (produto) => {
    if (carrinho.length > 0 && carrinho[0].id_restaurante !== produto.id_restaurante) {
        const confirmar = window.confirm(
            "Você já tem itens de outro restaurante na sacola. Deseja esvaziar a sacola atual para adicionar este item?"
        );

        if (confirmar) {
            setCarrinho([{ ...produto, quantidade: 1 }]);
        }
        return; 
    }

        setCarrinho((prev) => {
            const itemExiste = prev.find(item => item.id === produto.id);
            if (itemExiste) {
                return prev.map(item => 
                    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            }
            return [...prev, { ...produto, quantidade: 1 }];
        });
    };

    const limparCarrinho = () => setCarrinho([]);

    const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, limparCarrinho, valorTotal, totalItens }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);