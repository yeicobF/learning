import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");

// Devuelve toda la aplicación inicial, el elemento root (raíz).
const root = ReactDOM.createRoot(rootElement);

// render espera elementos hijos.
root.render(<h1>Hola, mundo!</h1>);
