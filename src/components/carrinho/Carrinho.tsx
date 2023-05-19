import React, { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { CarrinhoContext } from "./CarrinhoContext";
import "./carrinho.css";
import { useNavigate } from "react-router-dom";
import Produto from "../../model/Produto";
import Carrinho from "../../model/Carrinho";
import { setupApiClient } from "../../service/api";

const CarrinhoComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const carrinhoContext = useContext(CarrinhoContext);
  const { meuCarrinho, removerItem } = carrinhoContext || {};
  const navigate = useNavigate();

  const api = setupApiClient(navigate);

  useEffect(() => {
    // Adicione o código desejado aqui para lidar com as alterações no meuCarrinho
  }, [meuCarrinho]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const calcularValorTotal = () => {
    let total = 0;
    for (const item of meuCarrinho || []) {
      total += item.quantidade * (item.produto?.preco || 0);
    }
    return total;
  };

  const endereco = async () => {
    try {
      const dadosParaAPI = meuCarrinho?.map((item) => ({
        id: item.produto?.id,
        status: item.produto?.status,
        codigo: item.produto?.codigo,
        dataIni: item.produto?.dataIni,
        dataAlt: item.produto?.dataAlt,
        dataFim: item.produto?.dataFim,
        vendedor: item.produto?.vendedor,
        nome: item.produto?.nome,
        estoque: item.produto?.estoque,
        tipoEstoque: item.produto?.tipoEstoque,
        imagem: item.produto?.imagem,
        preco: item.produto?.preco,
        descQuantidade: item.produto?.descQuantidade,
        pesoMedio: item.produto?.pesoMedio,
        descricao: item.produto?.descricao,
        categoria: item.produto?.categoria,
        pedidoList: [],
        valorTotal: calcularValorTotal(),
      }));

      const response = await api.post("/pedido/adicionar", {
        produtos: dadosParaAPI,
      });
      const resp = response.data;

      setMensagemValidacao("Compra finalizada com sucesso!");
      navigate(`/endereco`);
    } catch (error) {
      setMensagemValidacao("Ocorreu um erro ao finalizar a compra.");
    }
  };

  const [mensagemValidacao, setMensagemValidacao] = useState("");

  return (
    <div>
      <button onClick={toggleModal} className="btn verde_escuro">
        {modalIsOpen ? "Fechar Carrinho" : "Carrinho"}
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        overlayClassName="carrinho-overlay"
        className="carrinho-modal"
        contentLabel="Carrinho"
        ariaHideApp={false}
      >
        {!meuCarrinho || meuCarrinho.length === 0 ? (
          <div>
            <p>O carrinho está vazio.</p>
          </div>
        ) : (
          <div>
            <h2>Meu Carrinho</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {meuCarrinho.map((item, index) => (
                  <tr key={index}>
                    <td>{item.produto?.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>
                      R$ {(item.produto?.preco * item.quantidade).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removerItem(index)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Valor Total: R$ {calcularValorTotal().toFixed(2)}</p>
            {mensagemValidacao && <p>{mensagemValidacao}</p>}
            <button className="btn btn-success" onClick={endereco}>
              Finalizar Compra
            </button>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default CarrinhoComponent;
