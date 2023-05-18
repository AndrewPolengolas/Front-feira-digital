import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Busca from "../model/Busca";
import Produto from "../model/Produto";
import ListarProdutos from "../components/produtos/ListaProdutos";
import "./styles/home.css";
import NavBar from "../components/navbar/navbar";

const Home = () => {
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState<string | null>(null);
  const navigate = useNavigate();

  const buscarProdutos = async (
    termo: string | null,
    filtro: string | null,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    const busca: Busca = {
      pagina: 1,
      tipoPreco: filtro !== null ? filtro : "MENOR_PRECO",
      precoMin: null,
      precoMax: null,
      categoria: null,
      vendedor: null,
      nome: null,
      codigo: null
    };
    return await ListarProdutos(busca, navigate);
  };

  

  useEffect(() => {
    (async () =>
      setListaProdutos(await buscarProdutos(null, filtro, navigate)))();
  }, [filtro, navigate]);

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
        <div className="col-md-2 ms-auto">
          <select
            className="form-control form-select-sm"
            id="filtro"
            value={filtro ?? ""}
            onChange={(event) => setFiltro(event.target.value || null)}
          >
            <option value="">Ordenar por:</option>
            <option value="MENOR_PRECO">Menor preço</option>
            <option value="MAIOR_PRECO">Maior preço</option>
          </select>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {listaProdutos.map((produto) => (
          <div className="card mb-4" key={produto.id}>

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
        ))}
      </div>
    </div>
  );
};

export default Home;
