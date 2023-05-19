import React, { useContext, useState } from "react";
import InputMask from "react-input-mask";
import CadastroCliente from "../model/CadastroCliente";
import UserRecord from "../model/UserRecord";
import { AuthContext } from "../service/auth-context";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import { MdKey, MdPerson,MdLogin,MdCached } from "react-icons/md";

export default function CadastroPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  const { signUp } = useContext(AuthContext);

  const aoSubmeterFormulario = async (
    evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      return;
    }

    const userRecord: UserRecord = {
      login,
      password,
    };

    const cadastro: CadastroCliente = {
      nome,
      documento: null,
      tipoDocumento: "CPF",
      celular: null,
      email: login,
      tipoPessoa: "FISICA",
      userRecord,
    };

    await signUp(cadastro);
  };

  function entrar(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="container-login d-flex align-items-center justify-content-center">
      <div className="container-centro">
      <div className="card-cadastro">
        <h1 className="mb-5 mb-5-login">Já tem conta?</h1>
        <div className="msgCadastrar">
          Entre para poder apreciar tudo que temos de melhor no mundo agrícola!
        </div>
        <button className="btn verde_amarelado" onClick={entrar}>
          Entrar
        </button>
      </div>
      <div className="card-p-4-login">
        <div className="card-body">
          <h1>Criar conta</h1>
          <form onSubmit={aoSubmeterFormulario}>
            <div className="mb-3">
             
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <div className="sobrepor">
              <MdPerson className="icone"/>
              <input
                type="text"
                className="personalizado form-control "
                id="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="login" className="form-label">
                Login:
              </label>
              <div className="sobrepor">
              <MdLogin className="icone"/>
              <input
                type="text"
                className="personalizado form-control"
                id="login"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                required
              />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha:
              </label>
              <div className="sobrepor">
                <MdKey className="icone"/>
              <input
                type="password"
                className="personalizado form-control"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              </div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar senha:
              </label>
              <div className="sobrepor">
                <MdCached className="icone"/>
              <input
                type="password"
                className="personalizado form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setConfirmPasswordError("");
                }}
                required
              />
              {confirmPasswordError && (
                <div className="text-danger">{confirmPasswordError}</div>
              )}
              </div>
            </div>
            <button className="btn verde_escuro" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
