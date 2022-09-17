import { useState, useEffect } from "react";
import { tasks as data } from "./data/tasks";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  function createTask(task) {
    const { title, description } = task;

    setTasks([
      ...tasks,
      {
        title,
        description,
        id: tasks.length,
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <>
      <TaskForm createTask={createTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </>
  );
}

export default App;
