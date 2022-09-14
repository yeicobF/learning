import React from "react";
import ReactDOM from "react-dom/client";

import { Posts } from "../FetchAPI/Posts";
import { users } from "./Arrays";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Posts />
    {users.map(({ id, name, image }, index) => {
      return (
        <div key={id}>
          <h1>{name}</h1>
          <img src={image} alt={name} />
        </div>
      );
    })}
  </>,
);
