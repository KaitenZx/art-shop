const fs = require('fs');
const path = require('path');

// Получаем путь к папке из аргументов командной строки
const folderPath = process.argv[2];

if (!folderPath) {
  console.error('Пожалуйста, укажите путь к папке.');
  process.exit(1);
}

// Функция для преобразования имени файла
function makeUrlFriendly(filename) {
  const extension = path.extname(filename);
  const nameWithoutExtension = path.basename(filename, extension);

	const newName = nameWithoutExtension
		.replace(/\s+/g, ' ')          // Убираем лишние пробелы
		 .replace(/\b(full|good|best|better|correct|done)\b/gi, '') // Убираем слова "full", "good", "best", "better", "correct", "done"
    .replace(/[0-9]/g, '')         // Убираем остальные цифры
    .trim()                        // Убираем пробелы в начале и конце строки
		.replace(/ /g, '-')            // Заменяем оставшиеся пробелы на подчеркивания
		.replace(/-+/g, '-')  
		.replace(/-$/, '')               // Убираем знак "-" в конце строки перед расширением
    .toLowerCase();                // Приводим к нижнему регистру

  return `${newName}${extension}`;
}

// Читаем содержимое папки
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении папки:', err);
    return;
  }

  files.forEach(file => {
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, makeUrlFriendly(file));

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Ошибка при переименовании файла ${file}:`, err);
      } else {
        console.log(`Файл ${file} успешно переименован в ${path.basename(newPath)}`);
      }
    });
  });
});
