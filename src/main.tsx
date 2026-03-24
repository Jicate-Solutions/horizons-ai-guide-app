import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Set Google Analytics ID from env var
(window as any).GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Register service worker for PWA + offline caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
