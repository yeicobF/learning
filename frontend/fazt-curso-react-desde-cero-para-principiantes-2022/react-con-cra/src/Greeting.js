function Greeting(props) {
  console.log(props);

  return <h1>{props.title}</h1>;
}

function GreetingDestructure({ title, name = "User" }) {
  return (
    <h1>
      {title}, dice {name}
    </h1>
  );
}
function GreetingConditional(props) {
  const name = "Jake";
  const isMarried = true;
  console.log(props);

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
    <>
      <h1>{add(10, 30)}</h1>
    </>
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
    <>
      <h1>{user.firstName}</h1>
      <h3>{user.lastName}</h3>
      {/* Mostrar booleano. Sin el toString no mostrará nada. */}
      <p>{isMarried.toString()}</p>
    </>
  );
}

// Lo mismo que Greeting, pero más corto haciendo uso de operadores ternarios.
function GreetingTernaryOperator() {
  const isMarried = true;

  return <h1>{isMarried ? "Estoy casado 😀" : "No estoy casado 😅"}</h1>;
}

export {
  Greeting,
  GreetingDestructure,
  GreetingWithInternalFunction,
  GreetingWithObject,
  GreetingTernaryOperator,
};
