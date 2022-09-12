import React from "react";
import ReactDOM from "react-dom/client";
import {
  Greeting,
  GreetingTernaryOperator,
  GreetingWithInternalFunction,
  GreetingWithObject,
} from "./Greeting";
// Importación de componente con export default.
import Product, { Navbar } from "./Product";
import { UserCard } from "./UserCard";

const rootElement = document.getElementById("root");

// Devuelve toda la aplicación inicial, el elemento root (raíz).
const root = ReactDOM.createRoot(rootElement);

// render espera elementos hijos.
root.render(
  // Fragment - Es un contenedor vacío. Nos ayuda a evitar utilizar etiquetas
  // que no queremos.
  <>
    <Navbar />
    <UserCard />
    <GreetingWithInternalFunction />
    <GreetingWithObject />
    {/* Self closing tags */}
    <GreetingTernaryOperator />
    {/* Una forma para llamar al componente. */}
    {Greeting()}
    {/* Otra forma de llamar al comonente. */}
    <Greeting></Greeting>
  </>,
);
