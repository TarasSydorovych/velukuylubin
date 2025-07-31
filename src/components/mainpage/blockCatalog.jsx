import css from "./main.module.css";
import Product from "./product";
const BlockCatalog = ({ categories, products }) => {
  console.log("categories", categories);
  return (
    <section className={css.blockCatalogWrap}>
      <p className={css.chousYour}>ОБЕРІТЬ СВІЙ УЛЮБЛЕНИЙ РОЛ</p>
      <ul className={css.categoryList}>
        {categories.map((el) => (
          <li key={el._id} className={css.listLi}>
            {el.name.ua}
          </li>
        ))}
      </ul>
      <div className={css.productWrap}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}{" "}
      </div>
      <div className={css.productWrap}></div>
    </section>
  );
};
export default BlockCatalog;
