import fs from "fs";
import path from "path";
import { transliterate } from "@/utils/transliterate";

export async function POST(req) {
  try {
    const body = await req.json();
    const { productName } = body;

    const sitemapPath = path.resolve(process.cwd(), "public", "sitemap.xml");
    let sitemapContent = fs.readFileSync(sitemapPath, "utf8");

    const transliteratedName = transliterate(productName?.toString?.() || "");

    const url = `
    <url>
      <loc>https://vel.com/product/${transliteratedName}</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`;

    sitemapContent = sitemapContent.replace("</urlset>", `${url}</urlset>`);
    fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

    return new Response(JSON.stringify({ message: "Sitemap оновлено" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Sitemap update error:", error); // ← це додай
    return new Response(
      JSON.stringify({
        message: "Помилка при оновленні sitemap",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
