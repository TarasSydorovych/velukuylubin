import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/standartComponents/header";
import FirstBlock from "@/components/mainpage/firstBlock";
import SecondBlock from "@/components/mainpage/secondBlock";
import css from "../components/mainpage/main.module.css";
import BlockCatalog from "@/components/mainpage/blockCatalog";
import Dostavka from "@/components/mainpage/dostavka";
import AboutUs from "@/components/mainpage/aboutUs";
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
export default async function Home() {
  const categories = await getCategories();
  const products = await getAllProducts();
  console.log("products", products);

  return (
    <div className={css.allWrap}>
      <Header />
      <FirstBlock />
      <SecondBlock />
      <BlockCatalog categories={categories} products={products} />
      <Dostavka />
      <AboutUs />
      <Footer />
    </div>
  );
}
