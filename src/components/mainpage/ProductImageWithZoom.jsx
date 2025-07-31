"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "./main.module.css";
import newForkd from "../../img/newForkd.png";

const ProductImageWithZoom = ({ imageUrl, alt }) => {
  return (
    <PhotoProvider>
      <PhotoView src={imageUrl}>
        <Image
          src={imageUrl}
          alt={alt}
          className={css.onePhotoForProd}
          width={300}
          height={200}
        />
      </PhotoView>
    </PhotoProvider>
  );
};

export default ProductImageWithZoom;
