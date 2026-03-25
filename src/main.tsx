import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Set Google Analytics ID from env var
(window as any).GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Start push notification checker for exam reminders
import { startNotificationChecker, scheduleExamReminders, isNotificationSupported } from './lib/notifications';
if (isNotificationSupported() && Notification.permission === 'granted') {
  scheduleExamReminders();
  startNotificationChecker();
}

// Unregister service worker and clear all caches to fix stale content issues
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => reg.unregister());
    });
    if ('caches' in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  });
}
