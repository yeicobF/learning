import { useState } from "react";

export function Form() {
  const [mensaje, setMensaje] = useState("");

  return (
    <div>
      <input onChange={(e) => setMensaje(e.target.value)} />
      <button onClick={() => alert(`El mensaje es: ${mensaje}`)}>Save</button>
    </div>
  );
}
