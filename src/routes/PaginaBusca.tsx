import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Produto from "../model/Produto";
import NavBar from "../components/navbar/navbar";
import "./styles/home.css";
import Busca from "../model/Busca";
import ListarProdutos from "../components/produtos/ListaProdutos";

const PaginaBusca = () => {
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();
  const buscaSession = sessionStorage.getItem("busca");

  const buscarProdutos = async (
    termo: string | null,
    filtro: string | null,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    const busca: Busca = {
      pagina: 1,
      tipoPreco: 'MENOR_PRECO',
      precoMin: null,
      precoMax: null,
      categoria: null,
      vendedor: null,
      nome: termo !== null && termo.length !== 0 ? termo : null,
      codigo: null,
    };
    return await ListarProdutos(busca, navigate);
  };

  useEffect(() => {
    (async () =>
      setListaProdutos(await buscarProdutos(buscaSession, null, navigate)))();
  }, [listaProdutos, navigate]);

  return (
    <div className="container">
      <NavBar></NavBar>
      <h1 className="text-center my-5" style={{ paddingTop: "80px" }}>
        Os melhores produtos da feira na sua casa
      </h1>
      <div className="row produtos-container">
        <div className="col-md-8">
          <div className="d-flex align-items-center"></div>
        </div>
      </div>
      <div className="row">
        {listaProdutos.map((produto) => (
          <div className="col-md-2 mb-4" key={produto.id}>
            <div
              className="card align-items-center maximizar-width card-img-top"
              style={{ maxHeight: "500px" }}
            >
              <Link to={`/produto/${produto.codigo}`} state={{ produto }}>
                <img
                  className="card-img-top"
                  src={produto.imagem ?? undefined}
                  alt={produto.nome ?? ""}
                />
              </Link>
              <div className="card-body">
                <p className="card-title">{produto.nome}</p>
                <h4 className="card-text">
                  {produto.tipoEstoque !== "PESO"
                    ? `R$ ${produto.preco?.toFixed(2).replace(".", ",")}/Kg`
                    : `R$ ${produto.preco?.toFixed(2).replace(".", ",")}`}
                </h4>
                <p className="card-text">
                  {produto.tipoEstoque !== "PESO"
                    ? `${produto.descricao} (Peso médio unidade: ${produto.pesoMedio}Kg)`.replace(
                        ".",
                        ","
                      )
                    : `${produto.descricao} ${produto.descQuantidade}Kg`.replace(
                        ".",
                        ","
                      )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaBusca;
