// Diferentes formas de añadir estilos.
import "./task.css";

export function TaskCard({ ready }) {
  return (
    <div className="card">
      <h1>Mi primera tarea</h1>
      <span className={ready ? "bg-green" : "bg-red"}>
        {ready ? "Tarea realizada" : "Tarea pendiente"} con clases
      </span>
      <p style={ready ? { background: "green" } : { background: "red" }}>
        {ready ? "Tarea realizada" : "Tarea pendiente"} con estilos
      </p>
    </div>
  );
}

export function TaskInlineStyles() {
  const cardStyles = { background: "#000", color: "#fff", padding: "20px" };
  const titleStyle = { fontWeight: "lighter" };

  return (
    <div style={cardStyles}>
      <h1 style={titleStyle}>Mi primera tarea</h1>
      <p>Tarea realizada</p>
    </div>
  );
}
