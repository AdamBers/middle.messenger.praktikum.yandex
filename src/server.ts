// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";


// Настройки для получения __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Укажите путь к папке со статическими файлами после сборки
const publicPath = path.resolve(__dirname, ".");
app.use(express.static(publicPath));

// Обслуживание всех маршрутов основным HTML-файлом
app.get("*", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Запуск сервера на указанном порту
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
