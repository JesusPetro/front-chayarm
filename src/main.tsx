import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./ui/global.css";

import App from "./App.tsx";
// import { ThemeToogle } from "./components/ThemeToogle";
// import Pepe from "./components/TeamInfo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
