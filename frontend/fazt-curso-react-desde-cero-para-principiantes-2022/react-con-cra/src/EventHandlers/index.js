import React from "react";
import ReactDOM from "react-dom/client";

import { Button } from "./Button";

const handleChange = (e) => {
  console.log(e.target.value);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Button text="Click me"></Button>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("enviado");
      }}
    >
      <h1>Registro de usuario</h1>
      <input
        type="text"
        id="hola"
        // onClick={() => alert("Input seleccionado")}
        // onChange={(event) =>
        //   console.log(event.target.id, event.target.value, "...")
        // }
        onChange={handleChange}
        onDoubleClick={() => console.log("double click")}
      />
      <button>Send</button>
    </form>
  </>,
);
