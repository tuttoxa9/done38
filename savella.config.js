/**
 * Конфигурационный файл для деплоя на Savella
 * Предполагается, что Savella работает аналогично другим хостинг-платформам для статических сайтов
 */
module.exports = {
  // Основные настройки
  name: "unik-courier",
  type: "static", // Указываем, что это статический сайт

  // Настройки сборки (если Savella поддерживает собственную сборку)
  build: {
    command: "bun run build",
    directory: "dist",
    environment: {
      NODE_ENV: "production"
    }
  },

  // Настройки для SPA (Single Page Application)
  spa: true,

  // Настройки роутинга для SPA
  routes: [
    {
      src: "/*",
      dest: "/index.html"
    }
  ],

  // Настройки кэширования
  headers: [
    {
      source: "/assets/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/*.webp",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/*.png",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/*.jpg",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/*.js",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/*.css",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      source: "/",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate"
        }
      ]
    }
  ],

  // Настройки CORS (если требуется)
  cors: {
    allowOrigin: ["*"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Request-Id"],
    maxAge: 86400 // 24 часа в секундах
  },

  // Настройки безопасности
  security: {
    frameOptions: "DENY",
    contentTypeOptions: "nosniff",
    xssProtection: "1; mode=block"
  }
};
