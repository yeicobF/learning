import React from "react";
import ReactDOM from "react-dom/client";
import { TaskCard } from "./Styles/Task";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <TaskCard ready={false} />
    <TaskCard ready />
  </>,
);
