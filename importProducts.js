// importProducts.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const csv = require("csv-parser");

const envPath = fs.existsSync(path.join(process.cwd(), ".env.local"))
  ? path.join(process.cwd(), ".env.local")
  : path.join(process.cwd(), ".env");
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;
const CSV_PATH =
  process.env.CSV_PATH || path.join(process.cwd(), "sushi_all.csv");

// Якщо хочеш дозволити продукти без категорії — постав true
const ALLOW_NULL_CATEGORY = false;

const { Schema, model, models, Types } = mongoose;

const CategorySchema = new Schema(
  {
    name: { ua: { type: String, required: true, unique: true } },
  },
  { timestamps: true, collection: "categories" }
);

const ProductSchema = new Schema(
  {
    name: { ua: { type: String, required: true } },
    shortDescription: { ua: { type: String } },
    longDescription: { ua: { type: String } },
    seotitle: { ua: { type: String } },
    seodescriptions: { ua: { type: String } },
    seoText: { ua: { type: String } },
    images: [{ type: String }],
    characteristics: [{ name: { type: String }, value: { type: String } }],
    category: { type: Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
  },
  { timestamps: true, collection: "products" }
);

const Category = models.Category || model("Category", CategorySchema);
const Product = models.Product || model("Product", ProductSchema);

// ---------- HELPERS ----------
function toNumberSafe(val) {
  if (val === null || val === undefined) return undefined;
  const s = String(val).replace(/\s+/g, "").replace(",", ".");
  const num = Number(s);
  return Number.isFinite(num) ? num : undefined;
}

function itemsToCharacteristics(itemsStr) {
  if (!itemsStr) return [];
  return String(itemsStr)
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({ name, value: "" }));
}

// ТІЛЬКИ ПОШУК КАТЕГОРІЇ — БЕЗ СТВОРЕННЯ
async function findCategoryByUAName(nameUA) {
  if (!nameUA) return null;
  const trimmed = String(nameUA).trim();
  if (!trimmed) return null;
  return Category.findOne({ "name.ua": trimmed });
}

// ---------- MAIN ----------
async function run() {
  if (!MONGODB_URI) {
    console.error(`❌ Не знайдено MONGODB_URI у ${path.basename(envPath)}`);
    process.exit(1);
  }

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ CSV файл не знайдено: ${CSV_PATH}`);
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Підключено до MongoDB");

  let imported = 0,
    skipped = 0,
    errors = 0;

  const stream = fs
    .createReadStream(CSV_PATH)
    .pipe(csv({ separator: ",", mapHeaders: ({ header }) => header.trim() }));

  for await (const row of stream) {
    try {
      const title = row.title?.trim();
      const categoryName = row.category_name?.trim();
      const priceUAH = toNumberSafe(row.price_uah);
      const weight = row.weight?.toString().trim();
      const descriptionItems = row.description_items;
      const image = row.image?.trim();

      if (!title) {
        skipped++;
        console.warn("⚠️ Пропуск: порожній title");
        continue;
      }
      if (!priceUAH && priceUAH !== 0) {
        skipped++;
        console.warn(
          `⚠️ Пропуск "${title}": некоректна ціна "${row.price_uah}"`
        );
        continue;
      }

      const categoryDoc = await findCategoryByUAName(categoryName);
      if (!categoryDoc && !ALLOW_NULL_CATEGORY) {
        skipped++;
        console.warn(
          `⚠️ Пропуск "${title}": категорія "${categoryName}" не знайдена у БД`
        );
        continue;
      }

      const characteristics = itemsToCharacteristics(descriptionItems);

      const doc = {
        name: { ua: title },
        shortDescription: { ua: weight || "" },
        longDescription: { ua: "" },
        seotitle: { ua: "" },
        seodescriptions: { ua: "" },
        seoText: { ua: "" },
        images: image ? [image] : [],
        characteristics,
        category: categoryDoc?._id || null,
        price: priceUAH,
      };

      const existing = await Product.findOne({ "name.ua": title });
      if (existing) {
        // якщо хочеш оновлювати — розкоментуй:
        // await Product.updateOne({ _id: existing._id }, { $set: doc });
        // imported++; console.log(`♻️ Оновлено: ${title}`);
        skipped++;
        console.log(`↪️ Пропущено (вже існує): ${title}`);
      } else {
        await Product.create(doc);
        imported++;
        console.log(`➕ Імпортовано: ${title}`);
      }
    } catch (e) {
      errors++;
      console.error("❌ Помилка при обробці рядка:", e?.message || e);
    }
  }

  console.log("\n— РЕЗЮМЕ —");
  console.log(`Імпортовано: ${imported}`);
  console.log(`Пропущено:  ${skipped}`);
  console.log(`Помилки:     ${errors}`);

  await mongoose.disconnect();
  console.log("🔌 Від'єднано від MongoDB");
}

run().catch((e) => {
  console.error("❌ Фатальна помилка:", e);
  process.exit(1);
});
