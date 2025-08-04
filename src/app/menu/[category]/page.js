import Header from "@/components/standartComponents/header";
import css from "../../../components/menu/main.module.css";
import Catalog from "@/components/menu/catalog";
import { notFound } from "next/navigation";
import Footer from "@/components/standartComponents/footer";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  return res.json();
}

async function getCategoryBySlug(slug) {
  const res = await fetch(`http://localhost:3000/api/category?slug=${slug}`, {
    cache: "no-store",
  });
  console.log("slug", slug);

  if (!res.ok) return null;

  try {
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (err) {
    console.error("❌ JSON parsing error", err);
    return null;
  }
}

async function getProductsByCategoryId(categoryId) {
  const res = await fetch(
    `http://localhost:3000/api/products?categoryId=${categoryId}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function MenuCategoryPage({ params }) {
  const slug = params.category;
  const categories = await getCategories();
  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  const products = await getProductsByCategoryId(category._id);
  console.log("category", category);

  return (
    <div className={css.allWrap}>
      <Header />
      <Catalog
        categories={categories}
        products={products}
        activeCategory={category}
      />
      <Footer />
    </div>
  );
}
export async function generateMetadata({ params }) {
  const slug = params.category;
  const res = await fetch(`http://localhost:3000/api/category?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Категорія не знайдена",
    };
  }

  const category = await res.json();
  console.log("category", category);

  return {
    title: category[0].seotitle.ua || category[0].name.ua,
    description:
      category[0].ceodescriptions.ua ||
      `Перегляньте товари з категорії ${category[0].name.ua}`,
  };
}
