import Header from "@/components/standartComponents/header";
import css from "../../components/menu/main.module.css";
import Catalog from "@/components/menu/catalog";
import Footer from "@/components/standartComponents/footer";
async function getCategories() {
  const res = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати категорії");
  }
  return res.json();
}
async function getAllProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати продукти");
  }
  return res.json();
}
export default async function Menu() {
  const categories = await getCategories();
  const products = await getAllProducts();
  return (
    <div className={css.allWrap}>
      <Header />
      <Catalog categories={categories} products={products} />
      <Footer />
    </div>
  );
}
