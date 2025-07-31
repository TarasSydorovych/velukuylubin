import css from "./main.module.css";
import Product from "../mainpage/product";
import { transliterate } from "@/utils/transliterate";
import Link from "next/link";

const Catalog = ({ categories, products }) => {
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
    </section>
  );
};
export default Catalog;
