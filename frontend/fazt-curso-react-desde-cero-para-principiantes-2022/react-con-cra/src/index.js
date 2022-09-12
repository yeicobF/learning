import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");

// Devuelve toda la aplicación inicial, el elemento root (raíz).
const root = ReactDOM.createRoot(rootElement);

function Greeting() {
  const name = "Jake";
  const isMarried = true;

  // JSX nos permite retornar HTML sin que sean strings. También podemos tener
  // JavaScript.
  // return <h1>Hello, {name}!</h1>;

  if (isMarried) {
    return <h1>Estoy casado</h1>;
  }

  return <h1>No estoy casado</h1>;
}

// Lo mismo que Greeting, pero más corto haciendo uso de operadores ternarios.
function GreetingTernaryOperator() {
  const isMarried = true;

  return <h1>{isMarried ? "Estoy casado 😀" : "No estoy casado 😅"}</h1>;
}

// render espera elementos hijos.
root.render(
  <div>
    {/* Self closing tags */}
    <GreetingTernaryOperator />
    {/* Una forma para llamar al componente. */}
    {Greeting()}
    {/* Otra forma de llamar al comonente. */}
    <Greeting></Greeting>
  </div>,
);
