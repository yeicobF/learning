import { useState } from "react";

export default function TaskForm({ createTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    createTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <input
        type="text"
        placeholder="Escribe tu tarea"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        autoFocus
      />
      <textarea
        placeholder="Descripción de la tarea"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>
      <button>Guardar</button>
    </form>
  );
}
