import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { Counter } from "./Hooks/useState/Counter";

function Form() {
  const [mensaje, setMensaje] = useState("");

  return (
    <div>
      <input onChange={(e) => setMensaje(e.target.value)} />
      <button onClick={() => alert(`El mensaje es: ${mensaje}`)}>Save</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Form />
    <Counter />
  </>,
);
