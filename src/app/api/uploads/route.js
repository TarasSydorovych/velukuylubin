// import { writeFile } from "fs/promises";
// import path from "path";
// import { NextResponse } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   const formData = await req.formData();
//   const files = formData.getAll("files");

//   const uploadFolder = path.join(process.cwd(), "public/uploads");
//   const uploadedUrls = [];

//   for (const file of files) {
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
//     const filepath = path.join(uploadFolder, filename);
//     await writeFile(filepath, buffer);
//     uploadedUrls.push(`/uploads/${filename}`);
//   }

//   return NextResponse.json({ urls: uploadedUrls });
// }
// app/api/upload/route.js
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll("files");

  const uploadFolder = path.join(process.cwd(), "uploads");

  // 🔽 Цей блок створює папку, якщо її ще немає
  if (!existsSync(uploadFolder)) {
    await mkdir(uploadFolder, { recursive: true });
  }

  const uploadedUrls = [];

  for (const file of files) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
      const filepath = path.join(uploadFolder, filename);
      await writeFile(filepath, buffer);
      uploadedUrls.push(`/api/uploads/${filename}`);
    } catch (err) {
      console.error("❌ Error writing file:", err);
      return NextResponse.json(
        { error: "Failed to write file" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ urls: uploadedUrls });
}
