// Index con el contenido de los ejercicios que he ido haciendo. Ayuda a no
// tener todo en el main aunque ya no lo utilice.

import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "./Button";
import {
  Greeting,
  GreetingDestructure,
  GreetingTernaryOperator,
  GreetingWithInternalFunction,
  GreetingWithObject,
} from "./Greeting";
// Importación de componente con export default.
import Product, { Navbar } from "./Product";
import { TaskCard } from "./Styles/Task";
import { UserCard } from "./UserCard";
import { Saludar } from "./ClassComponentes/Saludar";

const rootElement = document.getElementById("root");

// Devuelve toda la aplicación inicial, el elemento root (raíz).
const root = ReactDOM.createRoot(rootElement);

// render espera elementos hijos.
root.render(
  // Fragment - Es un contenedor vacío. Nos ayuda a evitar utilizar etiquetas
  // que no queremos.
  <>
    <Saludar />
    <TaskCard ready={false} />
    <TaskCard ready />
    <TaskCard />

    <Button text="Click me"></Button>
    <Button text="Hello, world" name="Joe"></Button>
    <UserCard
      name="Ryan Ryan"
      amount={3000}
      married={true}
      points={[99, 33.3, 22.2]}
      address={{ street: "123 Main Street", city: "New York" }}
      greet={function () {
        alert("Hello!");
      }}
    />
    <UserCard
      name="Joe McMillan"
      amount={1000}
      married={false}
      points={[100, 20]}
      address={{ street: "Av Some 123", city: "New Jersey" }}
    />

    {/* Otra forma de llamar al comonente. */}
    <GreetingDestructure title="hola" name="Joe" />
    <Greeting title="hola JSX" name="Jake" />
    <Greeting title="Otro title" />
    <Greeting title="texto" />

    <Navbar />
    <GreetingWithInternalFunction />
    <GreetingWithObject />
    {/* Self closing tags */}
    <GreetingTernaryOperator />
    {/* Una forma para llamar al componente. */}
    {/* {Greeting()} */}

    {/* <Greeting x="bye" />
    <Greeting y={30} />
    <Greeting y={true} />
    <Greeting y={[1, 2, 3]} /> */}
  </>,
);
