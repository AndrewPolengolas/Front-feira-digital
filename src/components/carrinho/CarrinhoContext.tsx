import React, { createContext, useState, useEffect } from "react";
import Carrinho from "../../model/Carrinho";

// Define o tipo para o contexto
type CarrinhoContextType = {
  meuCarrinho: Carrinho[];
  adicionarItem: (item: Carrinho) => void;
  removerItem: (index: number) => void;
};

// Cria o CarrinhoContext
export const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined
);

// Cria o componente CarrinhoProvider
export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [meuCarrinho, setMeuCarrinho] = useState<Carrinho[]>([]);

  useEffect(() => {
    const carrinhoString = sessionStorage.getItem("carrinho");
    if (carrinhoString) {
      const carrinho = JSON.parse(carrinhoString) as Carrinho[];
      setMeuCarrinho(carrinho);
    } else {
      const novoCarrinho: Carrinho[] = [];
      sessionStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      setMeuCarrinho(novoCarrinho);
    }
  }, []);

  const adicionarItem = (item: Carrinho) => {
    setMeuCarrinho((prevCarrinho) => {
      const novoCarrinho = [...prevCarrinho, item];
      sessionStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...meuCarrinho];
    novoCarrinho.splice(index, 1);
    setMeuCarrinho(novoCarrinho);
    sessionStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  return (
    <CarrinhoContext.Provider
      value={{ meuCarrinho, adicionarItem, removerItem }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
