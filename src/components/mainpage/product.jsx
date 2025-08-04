import css from "./main.module.css";
import onePhotoForProd from "../../img/onePhotoForProd.png";
import Image from "next/image";
import newForkd from "../../img/newForkd.png";
import hfdkk from "../../img/hfdkk.jpg";
import { transliterate } from "@/utils/transliterate";
import Link from "next/link";
import CartControls from "./CartControls";

import ProductImageWithZoom from "./ProductImageWithZoom";

const Product = ({ product }) => {
  const { name, shortDescription, images, characteristics, price } = product;

  const imageUrl = images && images.length > 0 ? images[0] : "/placeholder.png";
  const slug = transliterate(name?.ua || "product");

  return (
    <div className={css.prodOneWrap}>
      {" "}
      {/* <img
        src={imageUrl}
        alt={name?.ua || "Суші"}
        className={css.onePhotoForProd}
        width={300}
        height={200}
      /> */}
      {/* <Image
        src={newForkd}
        alt={name?.ua || "Суші"}
        className={css.onePhotoForProd}
        width={300}
        height={200}
      /> */}
      <ProductImageWithZoom imageUrl={imageUrl} alt={name?.ua || "Суші"} />
      <Link href={`/product/${slug}`} className={css.nameRoll}>
        {name?.ua}
      </Link>{" "}
      <p className={css.descRoll}>
        {characteristics && characteristics.length > 0
          ? characteristics.map((char) => char.name).join(", ")
          : "Опис відсутній"}
      </p>
      {/* <div className={css.wrapCounter}>
        <p className={css.price}>{price} ГРН</p>
        <div className={css.line}></div>
        <div className={css.wrCountk}>
          <div className={css.cuntFj}>-</div>
          <p className={css.price}>1</p>
          <div className={css.cuntFj}>+</div>
        </div>{" "}
        <div className={css.line}></div>
        <p className={css.price}>В КОРЗИНУ</p>
      </div> */}
      <CartControls product={product} />
    </div>
  );
};
export default Product;
