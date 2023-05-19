import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/home.css";
import { CarrinhoContext } from "../components/carrinho/CarrinhoContext";
import NavBar from "../components/navbar/navbar";
import { MdArrowBack } from "react-icons/md";
import { setupApiClient } from "../service/api";
import { useLocation } from "react-router-dom";


const EnderecoPage = () => {
  const carrinhoContext = useContext(CarrinhoContext);
  const { meuCarrinho, removerItem } = carrinhoContext || {};
  const [mensagemValidacao, setMensagemValidacao] = useState("");
  const [idPedido, setIdPedido] = useState<number | null>();
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const { pedido_id } = useParams();
  const location = useLocation();
  const resp = location.state?.resp;


  const navigate = useNavigate();
  const api2 = setupApiClient(navigate);

  const transportarParaAPI2 = async (resp : any) => {
    const dadosParaAPI2 = {
      cep: cep,
      cidade: cidade,
      complemento: complemento,
      dataAlt: null,
      dataFim: null,
      dataIni: null,
      estado: estado,
      logradouro: endereco,
      numero: numero,
      pais: "BRASIL",
      status: "1",
      tipo_endereco: "RESIDENCIAL",
      pedido_id: resp,
    };

    api2
      .post("/enderecoapi/adicionar", {
        endereco: dadosParaAPI2,
      })
      .then((response) => {
        console.log(dadosParaAPI2);
        console.log(response);
      })
      .catch((error) => {
        setMensagemValidacao("Ocorreu um erro ao indicar o endereço.");
      });
  };

  const calcularValorTotal = () => {
    let total = 0;
    for (const item of meuCarrinho || []) {
      total += item.quantidade * (item.produto?.preco || 0);
    }
    return total;
  };

  return (
    <>
      <NavBar />
      <div className="px-1 card-endereco row">
        <div className="col-9">
          <div className="row">
            <div className="col-12">
              <div className="card2">
                <div className="card-header">
                  <h3 className="card-title">Digite o endereço de entrega</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="col-4">
                      <div className="form-group mb-3">
                        <label htmlFor="cep">CEP</label>
                        <input
                          type="text"
                          name="cep"
                          id="cep"
                          className="form-control borda-verde mt-1"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                          type="text"
                          name="endereco"
                          id="endereco"
                          className="form-control borda-verde mt-1"
                          value={endereco}
                          onChange={(e) => setEndereco(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-5">
                        <div className="form-group">
                          <label htmlFor="numero">Nº</label>
                          <input
                            type="text"
                            name="numero"
                            id="numero"
                            className="form-control borda-verde mt-1"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="form-group">
                          <label htmlFor="complemento">Complemento</label>
                          <input
                            type="text"
                            name="complemento"
                            id="complemento"
                            className="form-control borda-verde mt-1"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-5">
                        <div className="form-group">
                          <label htmlFor="cidade">Cidade</label>
                          <input
                            type="text"
                            name="cidade"
                            id="cidade"
                            className="form-control borda-verde mt-1"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-1">
                        <div className="form-group">
                          <label htmlFor="uf">UF</label>
                          <input
                            type="text"
                            name="uf"
                            id="uf"
                            className="form-control borda-verde mt-1"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card2 bg-white w-100 p-3">
            <div className="row w-25">
              <Link to="/" className="btn btn-secondary" type="submit">
                <MdArrowBack />
              </Link>
            </div>
            <div className="row">
              {mensagemValidacao && <p>{mensagemValidacao}</p>}
              <button
                className="btn btn-success"
                onClick={() => transportarParaAPI2(resp)}
              >
                Finalizar Compra
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnderecoPage;
