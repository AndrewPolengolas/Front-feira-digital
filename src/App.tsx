import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./routes/styles/global.css"
import { AuthProvider } from "./service/auth-context";
import { CarrinhoProvider } from "./components/carrinho/CarrinhoContext";

export const KeyContext = createContext({});


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  return (
    <KeyContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <AuthProvider>
        <CarrinhoProvider>
          <Outlet></Outlet>
        </CarrinhoProvider>
      </AuthProvider>
    </KeyContext.Provider>
  );
}

export default App;
