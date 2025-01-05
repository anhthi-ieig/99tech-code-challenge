import { StrictMode } from "react";

import { setUsyTheme } from "@usy-ui/base";
import { createRoot } from "react-dom/client";
import "@usy-ui/base/dist/styles.css";

import App from "./App.tsx";

setUsyTheme({
  colorPrimary: "#2a2a4d",
  colorPrimaryDark: "#0e0e2a",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
