import css from "./main.module.css";
import Product from "../mainpage/product";
import { transliterate } from "@/utils/transliterate";
import Link from "next/link";
function normalizeHeadingLevels(html = "") {
  return html
    .replaceAll(/<h1(\s|>)/gi, "<h2$1")
    .replaceAll(/<\/h1>/gi, "</h2>");
}
const Catalog = ({ categories, products, activeCategory }) => {
  const rawHtml = activeCategory?.longdesc?.ua || "";
  const longHtml = rawHtml;

  return (
    <section className={css.blockCatalogWrap}>
      <p className={css.chousYour}>ОБЕРІТЬ СВІЙ УЛЮБЛЕНИЙ РОЛ</p>
      <ul className={css.categoryList}>
        {categories.map((el) => (
          <li key={el._id} className={css.listLi}>
            <Link href={`/menu/${transliterate(el.name.ua)}`}>
              {el.name.ua}
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.productWrap}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>{" "}
      <div className={css.productWrap}></div>
      {longHtml && (
        <div className={css.longCategoryText} key={activeCategory?._id}>
          <article
            className={css.longTextInner}
            dangerouslySetInnerHTML={{ __html: longHtml }}
          />
        </div>
      )}
    </section>
  );
};
export default Catalog;
