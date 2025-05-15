#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Использование публичного Netlify Drop API
async function deployToNetlify() {
  console.log('Подготовка к деплою...');

  try {
    // Упакуем dist в архив, если его еще нет
    if (!fs.existsSync(path.resolve('..', 'output.zip'))) {
      console.log('Создание архива...');
      await execPromise('cd dist && zip -rFS ../../output.zip .');
    }

    console.log('Архив создан, запускаем загрузку...');

    // Используем curl для прямой загрузки на Netlify Drop (это открытый API Netlify)
    const command = `
      curl -X POST 'https://api.netlify.com/api/v1/sites' \
      -H 'Content-Type: application/zip' \
      --data-binary '@../output.zip'
    `;

    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error('Ошибка:', stderr);
    }

    console.log('Ответ API:', stdout);
    console.log('Деплой завершен!');

    try {
      // Попробуем распарсить URL из ответа
      const response = JSON.parse(stdout);
      if (response.url) {
        console.log(`🚀 Сайт доступен по адресу: ${response.url}`);
        // Также выведем admin_url если он доступен
        if (response.admin_url) {
          console.log(`⚙️ Админка: ${response.admin_url}`);
        }
      }
    } catch (e) {
      console.log('Не удалось распарсить URL из ответа.');
    }

  } catch (error) {
    console.error('Ошибка деплоя:', error);
  }
}

// Запускаем деплой
deployToNetlify();
