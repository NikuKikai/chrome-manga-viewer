import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";

const body = document.querySelector("body");

const div = document.createElement("div");
div.id = "manga-viewer-root";


if (body) {
  body.append(div);
}

const root = createRoot(div);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
