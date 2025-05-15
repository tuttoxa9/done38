import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Улучшаем сжатие кода и оптимизации
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Реализуем code splitting и оптимизацию чанков
    rollupOptions: {
      output: {
        manualChunks: {
          // Вендорные библиотеки - выносим в отдельный чанк
          vendor: [
            'react',
            'react-dom',
            'framer-motion',
            'react-hook-form',
            '@tanstack/react-query',
            'lucide-react',
            'wouter'
          ],
          // UI компоненты - выносим в отдельный чанк
          ui: [
            '@/components/ui/button',
            '@/components/ui/toast',
            '@/components/ui/form',
            '@/components/ui/input',
            '@/components/ui/label'
          ],
          // Анимации и эффекты
          animations: ['@/lib/motion'],
        },
        // Оптимизируем имена файлов и структуру директорий
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Увеличиваем лимит для предупреждений о размере чанка,
    // но мы всё равно стараемся держать их маленькими
    chunkSizeWarningLimit: 600,
    // Улучшаем производительность и совместимость
    target: 'es2015',
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - маленькие ассеты инлайним
    sourcemap: false, // в production не нужны source maps
  },
  // Оптимизируем разработку
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  // Улучшаем производительность
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-hook-form',
      '@tanstack/react-query',
      'lucide-react',
      'wouter'
    ]
  },
});
