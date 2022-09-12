import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");

// Devuelve toda la aplicación inicial, el elemento root (raíz).
const root = ReactDOM.createRoot(rootElement);

function Greeting() {
  return <h1>Hello, world desde componente!</h1>;
}

// render espera elementos hijos.
root.render(
  <div>
    {/* Una forma para llamar al componente. */}
    {Greeting()}
    {/* Otra forma de llamar al comonente. */}
    <Greeting></Greeting>
    {/* Self closing tags */}
    <Greeting />
  </div>,
);
