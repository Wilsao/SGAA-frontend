import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./Componentes/NavBar";
import Animais from "./Paginas/Animais/Animais";
import AnimaisCadastro from "./Paginas/Animais/AnimaisCadastro";
import AnimaisVisualizacao from "./Paginas/Animais/AnimaisVisualizacao";
import EventosCastracao from "./Paginas/Castracao/EventosCastracao";
import CastracaoCadastro from "./Paginas/Castracao/CastracaoCadastro";
import EventosArrecadacao from "./Paginas/Arrecadacao/EventosArrecadacao";
import ArrecadacaoCadastro from "./Paginas/Arrecadacao/ArrecadacaoCadastro";
import Adocao from "./Paginas/Adocao/Adocao.jsx";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Animais />,
      },
      {
        path: "/animal/novo",
        element: <AnimaisCadastro />,
      },
      {
        path: "/animal/editar/:idAnimal",
        element: <AnimaisCadastro />,
      },
      {
        path: "/animal/:idAnimal",
        element: <AnimaisVisualizacao />,
      },
      {
        path: "/adocao",
        element: <Adocao />,
      },
      {
        path: "/eventos-castracao",
        element: <EventosCastracao />,
      },
      {
        path: "/eventos-castracao/novo",
        element: <CastracaoCadastro />,
      },
      {
        path: "/eventos-castracao/editar/:id",
        element: <CastracaoCadastro />,
      },
      {
        path: "/eventos-arrecadacao",
        element: <EventosArrecadacao />,
      },
      {
        path: "/eventos-arrecadacao/novo",
        element: <ArrecadacaoCadastro />,
      },
      {
        path: "/eventos-arrecadacao/editar/:idEvento",
        element: <ArrecadacaoCadastro />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
