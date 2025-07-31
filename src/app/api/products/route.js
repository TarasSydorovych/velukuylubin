// import { mongooseConnect } from "../../../lib/mongoose";
// import { Product } from "../../../models/Product";

// export default async function handler(req, res) {
//   await mongooseConnect();

//   const { method } = req;

//   switch (method) {
//     case "GET":
//       await handleGetRequest(req, res);
//       break;
//     case "POST":
//       await handlePostRequest(req, res);
//       break;
//     case "PUT":
//       await handlePutRequest(req, res);
//       break;
//     case "DELETE":
//       await handleDeleteRequest(req, res);
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//       res.status(405).end(`Метод ${method} не дозволений`);
//       break;
//   }
// }

// async function handleGetRequest(req, res) {
//   try {
//     const { categoryId } = req.query;
//     if (categoryId) {
//       const products = await Product.find({ category: categoryId });
//       res.status(200).json(products);
//     } else {
//       const products = await Product.find();
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при отриманні товарів", error });
//   }
// }

// async function handlePostRequest(req, res) {
//   try {
//     const {
//       name,
//       shortDescription,
//       longDescription,
//       seotitle,
//       seodescriptions,
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     } = req.body;

//     const product = new Product({
//       name,
//       shortDescription,
//       longDescription,
//       seotitle, // Додаємо поля SEO Title
//       seodescriptions, // Додаємо поля SEO Опис
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     console.error("Error while creating product:", error);
//     res.status(500).json({ message: "Помилка при створенні товару", error });
//   }
// }

// async function handlePutRequest(req, res) {
//   try {
//     const { id } = req.query;
//     console.log("puId", id);

//     const {
//       name,
//       shortDescription,
//       longDescription,
//       seotitle,
//       seodescriptions,
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         shortDescription,
//         longDescription,
//         seotitle, // Додаємо поля SEO Title
//         seodescriptions, // Додаємо поля SEO Опис
//         seoText,
//         images,
//         characteristics,
//         videoUrl,
//         model3dFile,
//         category,
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при оновленні товару", error });
//   }
// }

// async function handleDeleteRequest(req, res) {
//   try {
//     const { id } = req.query;
//     await Product.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при видаленні товару", error });
//   }
// }
// src/app/api/products/route.js
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// GET
export async function GET(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const products = categoryId
    ? await Product.find({ category: categoryId })
    : await Product.find();

  return NextResponse.json(products);
}

export async function POST(req) {
  await mongooseConnect();
  const body = await req.json();

  // Явно витягуємо характеристики
  const characteristics = Array.isArray(body.characteristics)
    ? body.characteristics.map((c) => ({
        name: c.name,
        value: c.value,
      }))
    : [];

  const product = new Product({
    ...body,
    characteristics, // 🟢 Явно вставляємо
  });

  await product.save();

  return NextResponse.json(product, { status: 201 });
}

// PUT
// export async function PUT(req) {
//   await mongooseConnect();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const data = await req.json();

//   const updatedProduct = await Product.findByIdAndUpdate(id, data, {
//     new: true,
//   });
//   return NextResponse.json(updatedProduct);
// }
export async function PUT(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  console.log("📥 Отримано PUT запит для ID:", id);
  console.log("📦 Тіло запиту:", body);
  const characteristics = Array.isArray(body.characteristics)
    ? body.characteristics.map((c) => ({
        name: c.name,
        value: c.value,
      }))
    : [];

  const images = Array.isArray(body.images) ? body.images : [];

  const updatedData = {
    ...body,
    characteristics,
    images,
  };

  const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return NextResponse.json(updatedProduct);
}

// DELETE
export async function DELETE(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
