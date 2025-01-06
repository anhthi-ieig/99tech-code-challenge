import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "@usy-ui/base/dist/styles.css";

import App from "./Messy.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
