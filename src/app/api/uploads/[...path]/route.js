import { join } from "path";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { NextResponse } from "next/server";
import mime from "mime";

export async function GET(req, { params }) {
  try {
    const filePath = join(process.cwd(), "uploads", ...params.path);
    const fileStat = await stat(filePath);
    const stream = createReadStream(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";

    return new NextResponse(stream, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStat.size,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("❌ Помилка зображення:", err);
    return new NextResponse("File not found", { status: 404 });
  }
}
