// "use client";
// import { PhotoProvider, PhotoView } from "react-photo-view";
// import "react-photo-view/dist/react-photo-view.css";
// import Image from "next/image";
// import css from "../../components/product/product.module.css";
// import placeholder from "../../img/newForkd.png";

// const SAFE_HOSTS = new Set([
//   "firebasestorage.googleapis.com",
//   "storage.googleapis.com",
//   "images.unsplash.com",
//   // додайте свої домени/CDN
// ]);

// function isSafeImageUrl(url) {
//   try {
//     const u = new URL(url);
//     return SAFE_HOSTS.has(u.hostname);
//   } catch {
//     return false;
//   }
// }

// const ProductImageWithZoomBig = ({ imageUrl, alt }) => {
//   const safe = isSafeImageUrl(imageUrl);

//   const imgSrc = safe ? imageUrl : placeholder.src;

//   // Якщо URL небезпечний — краще не давати zoom на нього
//   const Wrapper = ({ children }) =>
//     safe ? <PhotoView src={imgSrc}>{children}</PhotoView> : <>{children}</>;

//   return (
//     <PhotoProvider>
//       <Wrapper>
//         <Image
//           src={imgSrc}
//           alt={alt}
//           className={css.imageIn}
//           width={300}
//           height={200}
//         />
//       </Wrapper>
//     </PhotoProvider>
//   );
// };

// export default ProductImageWithZoomBig;
"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "../../components/product/product.module.css";
import placeholder from "../../img/newForkd.png";

const SAFE_HOSTS = new Set([
  "firebasestorage.googleapis.com",
  "storage.googleapis.com",
  "images.unsplash.com",
  // додай свої домени/CDN
]);

const BLOCKED_PATTERNS = [
  "facebook.com/tr", // піксель Facebook
];

function toUrlString(item) {
  if (!item) return null;
  if (typeof item === "string") return item;
  if (typeof item === "object") {
    // Поширені назви полів
    return item.src || item.url || item.imageUrl || item.href || null;
  }
  return null;
}

function isSafeHost(u) {
  return SAFE_HOSTS.has(u.hostname);
}

function isBlocked(u) {
  const s = u.toString();
  return BLOCKED_PATTERNS.some((p) => s.includes(p));
}

function seemsImagePath(u) {
  // Дозволяємо data-URL та firebase links із токенами,
  // або закінчення на типові розширення
  if (u.protocol === "data:") return true;
  const pathname = u.pathname.toLowerCase();
  return /\.(jpg|jpeg|png|webp|gif|avif)$/.test(pathname);
}

function pickFirstSafeImage(images) {
  if (!images) return null;
  const list = Array.isArray(images) ? images : [images];

  for (const it of list) {
    const s = toUrlString(it);
    if (!s) continue;
    try {
      const u = new URL(s);
      if (isBlocked(u)) continue;
      if (!isSafeHost(u)) continue; // хост не в білому списку
      if (!seemsImagePath(u)) continue; // схоже, що не картинка
      return u.toString();
    } catch {
      // не валідний URL — пропускаємо
    }
  }
  return null;
}

const ProductImageWithZoomBig = ({ imageUrl: images, alt }) => {
  const picked = pickFirstSafeImage(images);
  const isSafe = Boolean(picked);
  const imgSrc = isSafe ? picked : placeholder.src;

  const Wrapper = ({ children }) =>
    isSafe ? <PhotoView src={imgSrc}>{children}</PhotoView> : <>{children}</>;

  return (
    <PhotoProvider>
      <Wrapper>
        <Image
          src={imgSrc}
          alt={alt || ""}
          className={css.imageIn}
          width={300}
          height={200}
        />
      </Wrapper>
    </PhotoProvider>
  );
};

export default ProductImageWithZoomBig;
