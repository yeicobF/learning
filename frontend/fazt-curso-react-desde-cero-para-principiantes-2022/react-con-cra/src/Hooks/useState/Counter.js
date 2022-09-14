import { useState } from "react";

export function Counter() {
  let [counter, setCounter] = useState(0);

  console.log(counter);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>sumar</button>
      <button onClick={() => setCounter(counter - 1)}>Restar</button>
      <button onClick={() => setCounter(0)}>Reiniciar</button>
    </div>
  );
}
