import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { Counter as StateCounter } from "./Hooks/useState/Counter";
import { Form as StateForm } from "./Hooks/useState/Form";
import { EffectCounter } from "./Hooks/useEffect/EffectCounter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <EffectCounter />
    <StateForm />
    <StateCounter />
  </>,
);
