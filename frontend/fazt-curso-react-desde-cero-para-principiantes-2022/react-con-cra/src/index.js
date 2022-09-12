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

function GreetingWithInternalFunction() {
  function add(x, y) {
    return x + y;
  }

  return (
    <div>
      <h1>{add(10, 30)}</h1>
    </div>
  );
}

function GreetingWithObject() {
  const isMarried = true;
  const user = {
    firstName: "Jake",
    lastName: "Doe",
  };

  // No puede haber un objeto hijo en React. No sabe cómo interpretarlo. Esto da error.
  // return <h1>{user}</h1>;

  // Esta no es una forma común de mostrar un objeto en la aplicación.
  // return <h1>{JSON.stringify(user)}</h1>;

  return (
    <div>
      <h1>{user.firstName}</h1>
      <h3>{user.lastName}</h3>
      {/* Mostrar booleano. Sin el toString no mostrará nada. */}
      <p>{isMarried.toString()}</p>
    </div>
  );
}

// Lo mismo que Greeting, pero más corto haciendo uso de operadores ternarios.
function GreetingTernaryOperator() {
  const isMarried = true;

  return <h1>{isMarried ? "Estoy casado 😀" : "No estoy casado 😅"}</h1>;
}

// render espera elementos hijos.
root.render(
  <div>
    <GreetingWithInternalFunction />
    <GreetingWithObject />
    {/* Self closing tags */}
    <GreetingTernaryOperator />
    {/* Una forma para llamar al componente. */}
    {Greeting()}
    {/* Otra forma de llamar al comonente. */}
    <Greeting></Greeting>
  </div>,
);
