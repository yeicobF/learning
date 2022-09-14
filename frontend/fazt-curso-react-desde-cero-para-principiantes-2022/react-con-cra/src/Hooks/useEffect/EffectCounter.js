import { useEffect, useState } from "react";

export function EffectCounter() {
  const [mensaje, setMensaje] = useState("");
  const [counter, setCounter] = useState(0);

  /**
   * useEffect se utiliza cuando se renderiza de nuevo el componente. Si el
   * contenido de un elemento cambió, se ejecuta useEffect.
   *
   * A veces solo lo queremos ejecutar cuando el componente ya se haya creado.
   * Esto lo logramos mandando un array vacío.
   *
   * Me parece que es como un watch en Vue.
   *
   * Esto es de ayuda para cuando obtenemos datos de un backend y asignamos los
   * datos a una variable.
   */
  useEffect(() => {
    console.log("Render");
    /**
     * En el arreglo indicamos las variables que queremos que se observen. Si
     * los elementos del arreglo cambian, se ejecutará el useEffect.
     *
     * Estos elementos se conocen como dependencias porque la función depende
     * del valor de la variable.
     */
  }, [counter]);

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setMensaje(e.target.value)} />
        <button onClick={() => alert("El mensaje es" + mensaje)}>Save</button>
      </div>
      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>Incrementar</button>
      </div>
    </>
  );
}
