export function Button({ text, name = "Some user" }) {
  return (
    <button onClick={() => console.log("Hola, mundo!")}>
      {text} - {name}
    </button>
  );
}
