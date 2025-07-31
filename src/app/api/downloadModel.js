// import fs from "fs";
// import path from "path";
// import axios from "axios";

// // Функція для перетворення закодованого URL в читабельну назву файлу
// function sanitizeFileName(fileName) {
//   return decodeURIComponent(fileName)
//     .replace(/[^a-zA-Z0-9.\-_]/g, "_") // Заміна всіх некоректних символів на підкреслення
//     .replace(/\s+/g, "_"); // Заміна пробілів на підкреслення
// }

// export default async function handler(req, res) {
//   const { modelUrl, fileName } = req.query;
//   console.log("fileName", req.query);

//   try {
//     // Використовуємо оригінальний URL без декодування
//     const originalUrl = modelUrl;

//     // Очищаємо ім'я файлу від зайвих параметрів та коригуємо назву файлу
//     const cleanFileName = sanitizeFileName(fileName.split("?")[0]);
//     const filePath = path.join(
//       process.cwd(),
//       "public",
//       "static",
//       cleanFileName
//     );

//     console.log("Original URL:", originalUrl);
//     console.log("Saving to:", filePath);

//     // Завантажуємо файл
//     const response = await axios({
//       url: originalUrl,
//       method: "GET",
//       responseType: "arraybuffer",
//     });

//     // Перевіряємо статус відповіді
//     if (response.status !== 200) {
//       throw new Error(`Failed to fetch model: ${response.statusText}`);
//     }

//     // Зберігаємо файл у зазначену папку
//     fs.writeFileSync(filePath, Buffer.from(response.data));

//     res.status(200).json({
//       message: "Model downloaded successfully",
//       path: `/static/${cleanFileName}`,
//     });
//   } catch (error) {
//     console.error("Error downloading the model:", error.message);
//     res
//       .status(500)
//       .json({ message: "Error downloading the model", error: error.message });
//   }
// }
import fs from "fs";
import path from "path";
import formidable from "formidable";

// Забороняємо автоматичний парсинг Next.js для забезпечення використання formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Функція для перетворення закодованого URL в читабельну назву файлу
function sanitizeFileName(fileName) {
  return decodeURIComponent(fileName)
    .replace(/[^a-zA-Z0-9.\-_]/g, "_")
    .replace(/\s+/g, "_");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не дозволений" });
  }

  try {
    const form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Помилка під час розбору файлу:", err);
        return res
          .status(500)
          .json({ message: "Помилка під час розбору файлу" });
      }

      console.log("Отримані поля:", fields);
      console.log("Отримані файли:", files);

      // Отримуємо перший файл з масиву
      const file = files.file[0];

      if (!file) {
        console.log("Файл не надіслано");
        return res.status(400).json({ message: "Файл не надіслано" });
      }

      const cleanFileName = sanitizeFileName(
        file.originalFilename || file.newFilename
      );
      const filePath = path.join(
        process.cwd(),
        "public",
        "static",
        "3dmodels",
        cleanFileName
      );

      try {
        fs.renameSync(file.filepath, filePath);

        res.status(200).json({
          message: "Файл успішно завантажено",
          path: `/static/3dmodels/${cleanFileName}`,
        });
      } catch (error) {
        console.error("Помилка при збереженні файлу:", error);
        res
          .status(500)
          .json({ message: "Помилка при збереженні файлу", error });
      }
    });
  } catch (error) {
    console.error("Помилка під час створення форми:", error);
    res.status(500).json({ message: "Помилка під час створення форми", error });
  }
}
