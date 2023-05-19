import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Produto from "../../model/Produto";
import NavBar from "../navbar/navbar";
import ListarProdutoUnico from "./ListarProdutoUnico";
import "./produto.css";
import Carrinho from "../../model/Carrinho";
import { CarrinhoContext } from "../carrinho/CarrinhoContext";

const ProdutoSelecionado = () => {
  const location = useLocation();
  const produtoBusca = location.state.produto as Produto;
  const [produto, setProduto] = useState<Produto | null>();
  const navigate = useNavigate();
  const carrinhoContext = useContext(CarrinhoContext);

  const [count, setCount] = useState(0);

  const increment = () => {
    if (produto?.estoque) {
      if (count < produto?.estoque) {
        setCount(count + 1);
      }
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    (async () => setProduto(await buscarProduto(produtoBusca, navigate)))();
  }, [produtoBusca, navigate]);

  const buscarProduto = async (
    prod: Produto,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    return await ListarProdutoUnico(prod.codigo, navigate);
  };

  const handleProduto = () => {
    if (count !== 0 && produto) {
      console.log("Pronto");
      const carrinhoString = sessionStorage.getItem("carrinho");

      if (carrinhoString) {
        const carrinho = JSON.parse(carrinhoString) as Carrinho[];

        const addCarrinho: Carrinho = {
          produto: produto,
          quantidade: count,
        };

        carrinhoContext?.adicionarItem(addCarrinho);
      }
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ paddingTop: "100px" }}
      >
        <div
          className="bg-secondary bg-opacity-10"
          style={{ maxWidth: "1200px", maxHeight: "700px", padding: "20px" }}
        >
          <div className="card-body row">
            <div className="col-md-7 centralizar">
              <img
                className="w-100 m-2"
                src={produto?.imagem ?? undefined}
                alt={produto?.nome ?? ""}
              />
            </div>
            <div className="col-md-5 centralizar d-flex">
              <div className="row">
                <h2 style={{ fontWeight: "400" }}>{produto?.nome}</h2>
                <h4>
                  {produto?.tipoEstoque !== "PESO"
                    ? `R$ ${produto?.preco?.toFixed(2).replace(".", ",")}/Kg`
                    : `R$ ${produto?.preco?.toFixed(2).replace(".", ",")}`}
                </h4>
                <p>
                  {produto?.tipoEstoque !== "PESO"
                    ? `${produto?.descricao} (Peso médio unidade: ${produto?.pesoMedio}Kg)`.replace(
                        ".",
                        ","
                      )
                    : `${produto.descricao} ${produto.descQuantidade}Kg`.replace(
                        ".",
                        ","
                      )}
                </p>
                <div className="d-flex centralizar justify-content-between">
                  <div>
                    <button onClick={decrement} className="btn btn-success">
                      -
                    </button>

                    <span className="margin-span">{count}</span>

                    <button onClick={increment} className="btn btn-success">
                      +
                    </button>
                  </div>
                  <div>
                    <button onClick={handleProduto} className="btn btn-success">
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoSelecionado;
