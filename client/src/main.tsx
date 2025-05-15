import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

// Функция для гидратации приложения с контролем производительности
function hydrateApp() {
  const root = document.getElementById("root");

  if (!root) {
    console.error("Root element not found!");
    return;
  }

  try {
    // Рендерим приложение
    const reactRoot = createRoot(root);
    reactRoot.render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <App />
      </ThemeProvider>
    );

    // Отчёт о производительности
    if ('performance' in window && 'mark' in performance && 'measure' in performance) {
      performance.mark('app-rendered');
      performance.measure('app-start-to-render', 'app-init', 'app-rendered');
    }
  } catch (error) {
    console.error("Error rendering app:", error);
  }
}

// Инициализация приложения
function initApp() {
  if ('performance' in window && 'mark' in performance) {
    performance.mark('app-init');
  }

  // Проверяем, загружен ли документ
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateApp);
  } else {
    // Используем requestIdleCallback или setTimeout для ненадолго откладывания гидратации,
    // чтобы дать браузеру время отрендерить статический HTML
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(hydrateApp, { timeout: 1000 });
    } else {
      setTimeout(hydrateApp, 50);
    }
  }
}

// Запускаем инициализацию приложения
initApp();
