import { notFound } from "next/navigation";
import Image from "next/image";
import css from "../../../components/product/product.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/components/standartComponents/header";
import newForkd from "../../../img/newForkd.png";
import CartControls from "@/components/product/CartControls";
import Footer from "@/components/standartComponents/footer";
import ProductImageWithZoomBig from "@/components/mainpage/ProductImageWithZoomBig";

// ⛓️ Отримати ВСІ товари
async function getAllProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return await res.json();
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const products = await getAllProducts();

  // 🔍 Знаходимо товар по трансліту з назви
  const product = products.find((p) => transliterate(p.name.ua) === slug);
  console.log("product", product);

  if (!product) return notFound();

  return (
    <div className={css.productPage}>
      <Header />
      <div className={css.wrapNamedIcon}>
        {/* <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name.ua}
      
            className={css.imageIn}
        /> */}
        {/* <div className={css.wrapImage}>
          <Image src={newForkd} alt={product.name.ua} className={css.imageIn} />
        </div> */}
        <div className={css.wrapImage}>
          <ProductImageWithZoomBig
            imageUrl={product.images}
            alt={product.name?.ua || "Суші"}
          />{" "}
        </div>
        <div className={css.wrapOneBlockWith}>
          <h1 className={css.title}>{product.name.ua}</h1>
          <p className={css.short}>{product.shortDescription?.ua}</p>

          <ul className={css.chars}>
            {product.characteristics?.map((char, idx) => (
              <li className={css.wrapLi} key={idx}>
                {char.name},
              </li>
            ))}
          </ul>
          <CartControls product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
