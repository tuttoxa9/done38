import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

// Директории с изображениями
const IMAGE_DIRS = [
  'client/public',
  'client/public/assets',
  'client/public/images',
];

// Расширения изображений для конвертации
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Качество WebP-изображений
const WEBP_QUALITY = 80;

/**
 * Конвертирует изображение в формат WebP
 * @param {string} filePath Путь к файлу
 * @returns {Promise<void>}
 */
async function convertToWebP(filePath) {
  try {
    const outputPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');

    // Проверяем, существует ли уже WebP версия
    if (fs.existsSync(outputPath)) {
      console.log(`WebP версия уже существует: ${outputPath}`);
      return;
    }

    // Конвертируем изображение в WebP
    await sharp(filePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    console.log(`Создан: ${outputPath}`);

    // Определяем размеры исходного и конвертированного файлов
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = (1 - webpSize / originalSize) * 100;

    console.log(`Сжатие: ${savings.toFixed(2)}% (${originalSize} -> ${webpSize} байт)`);
  } catch (error) {
    console.error(`Ошибка конвертации ${filePath}: ${error.message}`);
  }
}

/**
 * Рекурсивно обходит директорию и конвертирует изображения
 * @param {string} directory Директория для обхода
 * @returns {Promise<void>}
 */
async function processDirectory(directory) {
  try {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Рекурсивно обрабатываем поддиректории
        await processDirectory(filePath);
      } else if (
        stat.isFile() &&
        IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
      ) {
        // Конвертируем изображение в WebP
        await convertToWebP(filePath);
      }
    }
  } catch (error) {
    console.error(`Ошибка обработки директории ${directory}: ${error.message}`);
  }
}

/**
 * Основная функция
 */
async function main() {
  console.log('Начинаем конвертацию изображений в WebP...');

  let totalConverted = 0;

  for (const dir of IMAGE_DIRS) {
    if (fs.existsSync(dir)) {
      console.log(`Обрабатываем директорию: ${dir}`);
      await processDirectory(dir);
      totalConverted++;
    } else {
      console.warn(`Директория не существует: ${dir}`);
    }
  }

  console.log(`Конвертация завершена! Обработано ${totalConverted} директорий.`);
}

// Запускаем скрипт
main().catch(error => {
  console.error('Ошибка выполнения скрипта:', error);
  process.exit(1);
});
