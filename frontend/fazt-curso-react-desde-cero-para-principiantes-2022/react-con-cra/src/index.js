import React from "react";
import ReactDOM from "react-dom/client";
import { Saludar } from "./ClassComponentes/Saludar";
import { TaskCard } from "./Styles/Task";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Saludar />
    <TaskCard ready={false} />
    <TaskCard ready />
  </>,
);
