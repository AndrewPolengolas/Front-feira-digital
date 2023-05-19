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
  const [valueTotal,setValueTotal]=useState(0)

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

  const adjustTotal = () =>{
    let value;
    if(produto?.preco){
      value = produto?.preco * count
    }else{
      value = 0
    }
    setValueTotal(value)
  }

  useEffect(() => {
    adjustTotal()
  }, [count]);

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
    <div className="container">
      <NavBar></NavBar>
      <div className="card-produto">
      <div>
        <img src={produto?.imagem ?? undefined}
          alt={produto?.nome ?? ""}
        />
      </div>

      <div className="color-container-details">
        <div className="container-details">
          <h2 >{produto?.nome}</h2>
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
          
            <div className="container-btns">
              <button onClick={decrement} className="btn verde_escuro">
                -
              </button>
              <div className="quantidade">{count}</div>
              <button onClick={increment} className="btn verde_escuro">
                +
              </button>
            </div>

            <div className="container-total">
              <div>Total: {valueTotal.toFixed(2).replace(".", ",")}</div>
              <button onClick={handleProduto} className="btn verde_amarelado">
                Adicionar ao carrinho
              </button>
            </div>
          
        </div>
      </div>
    </div>
    </div>
      
  );
};

export default ProdutoSelecionado;
