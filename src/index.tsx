import React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import App from "./App.tsx";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
