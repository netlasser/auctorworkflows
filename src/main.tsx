import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (typeof document !== "undefined") {
  document.documentElement.classList.add("js");
}

createRoot(document.getElementById("root")!).render(<App />);
