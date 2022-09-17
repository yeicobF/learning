function TaskCard({ task, deleteTask }) {
  function mostrarAlerta() {
    alert(`Eliminando ${task.id}...`);
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <button onClick={() => deleteTask(task.id)}>Eliminar tarea</button>
    </div>
  );
}

export default TaskCard;
