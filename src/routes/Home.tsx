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

  // const listaProdutos2 = [
  //   {id:1,codigo:1000,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:2,codigo:1001,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:3,codigo:1002,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:4,codigo:1003,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:5,codigo:1004,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:6,codigo:1005,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:7,codigo:1006,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},
  //   {id:8,codigo:1007,imagem:"https://www.minicash.com.br/image/cache/catalog/img/produtos_2021/abacaxi-un-550x550.png",nome:"abacaxi",preco:200.00,tipoEstoque:"PESO",descricao:"Abacaxi doce",pesoMedio:0.500,descQuantidade:"200"},

  // ]
  

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
      <div className="row">
        {listaProdutos.map((produto) => (
          <div className="col-md-2 mb-4" key={produto.id}>
            <div
              className="card"
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

export default Home;
