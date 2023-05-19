import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ProdutoSelecionado from "./components/produtos/Produto.tsx";
import CadastroPage from "./routes/CadastroPage.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Home from "./routes/Home.tsx";
import LoginPage from "./routes/LoginPage.tsx";
import LogoutPage from "./routes/LogoutPage.tsx";
import PaginaBusca from "./routes/PaginaBusca.tsx";
import EnderecoPage from "./routes/EnderecoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "produto/:codigo",
        element: <ProdutoSelecionado></ProdutoSelecionado>,
      },
      {
        path: "logout",
        element: <LogoutPage></LogoutPage>,
      },
      {
        path: "cadastro",
        element: <CadastroPage></CadastroPage>,
      },
      {
        path: "busca",
        element: <PaginaBusca></PaginaBusca>,
       },
       {
         path: "endereco",
         element: <EnderecoPage></EnderecoPage>,
       },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
