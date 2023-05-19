import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyContext } from "../../App";
import logo from "../../assets/logo.png";
import { MyContextType } from "../../model/MyContextType";
import Produto from "../../model/Produto";
import Carrinho from "../carrinho/Carrinho";
import { CarrinhoContext } from "../carrinho/CarrinhoContext";
import "./navbar.css";

const NavBar = () => {
  const { isLoggedIn } = useContext(KeyContext) as MyContextType;
  const [searchTerm, setSearchTerm] = useState("");
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState<string | null>(null);
  const carrinhoContext = useContext(CarrinhoContext);
  const [contadorItens, setContadorItens] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setContadorItens(carrinhoContext?.meuCarrinho.length || 0);
  }, [carrinhoContext?.meuCarrinho]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    if(searchTerm ===""){
      navigate("/");
      return
    }
    sessionStorage.setItem("busca", searchTerm);
    navigate("/busca");

  };

  return (
    <>
      <nav
        className="navbar fixed-top"        
      >
        <div className="container-fluid">
          <div className="nav-link active col-md-1 text-light">
            <Link
              to="/"
              className="nav-link active mx-2 text-light"
              aria-current="page"
            >
              <img
                src={logo}
                alt="Logo"
                height="100"
                width="100"
                className="mr-3"
              />
            </Link>
          </div>

          <div className="nav-link active col-md-8">
            <div className="d-flex align-items-center">
              <div className="input-group w-100">
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Buscar por nome"
                  onChange={handleChange}
                />
                <button
                  className="btn verde_escuro"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="nav-link active col-md-3 text-light d-flex justify-content-around">
            <div className="position-relative">
              <Carrinho></Carrinho>
              {contadorItens > 0 && (
                <div className="cart-notification">
                  <span>{contadorItens}</span>
                </div>
              )}
            </div>
            <Link
              to="/cadastro"
              hidden={isLoggedIn}
              className="btn verde_escuro"
              aria-current="page"
              type="button"
            >
              Cadastro
            </Link>
            <Link
              to="/login"
              hidden={isLoggedIn}
              className="btn verde_escuro"
              aria-current="page"
              type="button"
            >
              Entrar
            </Link>
            <Link
              to="/logout"
              hidden={!isLoggedIn}
              className="btn verde_escuro"
              aria-current="page"
              type="button"
            >
              Sair
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
