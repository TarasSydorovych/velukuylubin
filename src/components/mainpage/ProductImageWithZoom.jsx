// "use client";
// import { PhotoProvider, PhotoView } from "react-photo-view";
// import "react-photo-view/dist/react-photo-view.css";
// import Image from "next/image";
// import css from "./main.module.css";
// import newForkd from "../../img/newForkd.png";

// const ProductImageWithZoom = ({ imageUrl, alt }) => {
//   return (
//     <PhotoProvider>
//       <PhotoView src={imageUrl}>
//         <Image
//           src={imageUrl}
//           alt={alt}
//           className={css.onePhotoForProd}
//           width={300}
//           height={200}
//         />
//       </PhotoView>
//     </PhotoProvider>
//   );
// };

// export default ProductImageWithZoom;
"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "./main.module.css";
import placeholder from "../../img/newForkd.png";

const SAFE_HOSTS = new Set([
  "firebasestorage.googleapis.com",
  "storage.googleapis.com",
  "images.unsplash.com",
  // додайте свої домени/CDN
]);

function isSafeImageUrl(url) {
  try {
    const u = new URL(url);
    return SAFE_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

const ProductImageWithZoom = ({ imageUrl, alt }) => {
  const safe = isSafeImageUrl(imageUrl);

  const imgSrc = safe ? imageUrl : placeholder.src;

  // Якщо URL небезпечний — краще не давати zoom на нього
  const Wrapper = ({ children }) =>
    safe ? <PhotoView src={imgSrc}>{children}</PhotoView> : <>{children}</>;

  return (
    <PhotoProvider>
      <Wrapper>
        <Image
          src={imgSrc}
          alt={alt}
          className={css.onePhotoForProd}
          width={300}
          height={200}
        />
      </Wrapper>
    </PhotoProvider>
  );
};

export default ProductImageWithZoom;
