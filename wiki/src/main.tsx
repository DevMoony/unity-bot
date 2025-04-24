import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize highlight.js
// document.addEventListener('DOMContentLoaded', () => {
//   if (window.hlj) {
//     window.hljs.highlightAll();
//   }
// });

createRoot(document.getElementById("root")!).render(<App />);
