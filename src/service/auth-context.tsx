import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { KeyContext } from "../App";
import CadastroCliente from "../model/CadastroCliente";
import { MyContextType } from "../model/MyContextType";
import LoginDto from "../model/loginDto";
import LoginRetornoDto from "../model/loginRetornoDto";
import { setupApiClient } from "./api";
import { signOut } from "./signOut";
import InfosUser from "../model/InfosUser";

interface AuthContextData {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: LoginDto) => Promise<void>;
  signUp: (credentials: CadastroCliente) => Promise<void>;
  signOut: (navigate: ReturnType<typeof useNavigate>) => void;
}

interface UserProps {
  id: number;
  token: string;
  email: string;
  firstName: string | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!sessionStorage.getItem("token");
  const navigate = useNavigate();
  const api = setupApiClient(navigate);
  const { setIsLoggedIn } = useContext(KeyContext) as MyContextType;

  const signIn = async ({ login, password }: LoginDto) => {
    try {

      const response = await api.post("/auth/login", {
        login: login,
        password,
      });

      const retorno: LoginRetornoDto = response.data;

      sessionStorage.setItem("token", retorno.token);
      sessionStorage.setItem("id", retorno.id.toString());

      setUser({
        id: retorno.id,
        token: retorno.token,
        email: retorno.login,
        firstName: undefined,
      });

      // passar para as proximas requisições o token
      api.defaults.headers.Authorization = `Bearer ${retorno.token}`;
      api.defaults.headers.common["id"] = retorno.id.toString();

      toast("Login efetuado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsLoggedIn(true);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  async function signUp(CadastroCliente: CadastroCliente) {
    try {
      const {
        nome,
        documento,
        tipoDocumento,
        celular,
        email,
        tipoPessoa,
        userRecord,
      } = CadastroCliente;

      const api = setupApiClient(navigate);

      await api.post("/cliente/cadastro", {
        nome,
        documento,
        tipoDocumento,
        celular,
        email,
        tipoPessoa,
        userRecord,
      });

      toast.success("Conta criada com sucesso");
      navigate("/login");
    } catch (err) {
      toast.error("Algo deu errado, tente novamente mais tarde.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
