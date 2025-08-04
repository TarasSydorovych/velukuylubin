// "use client";
// import cartNfm from "../../img/cartNfm.png";
// import css from "./header.module.css";
// import { useState, useEffect } from "react";
// import { useCart } from "../../lib/useCart"; // якщо ти тримаєш getCart в хуку
// import Link from "next/link";
// import Image from "next/image";

// const WrapCart = () => {
//   const { getCart } = useCart();
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // Спочатку рахуємо одразу
//     const cart = getCart();
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     setTotal(totalItems);

//     // Підписуємось на подію "cartUpdated"
//     const handleCartUpdated = () => {
//       const updatedCart = getCart();
//       const updatedTotal = updatedCart.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//       setTotal(updatedTotal);
//     };

//     window.addEventListener("cartUpdated", handleCartUpdated);

//     return () => {
//       window.removeEventListener("cartUpdated", handleCartUpdated);
//     };
//   }, [getCart]);

//   return (
//     <Link href="/cart" className={css.wrapCartInHeader}>
//       <Image
//         src={cartNfm}
//         alt="Суші Великий Любіню"
//         className={css.cartNfm}
//         priority
//       />{" "}
//       {total > 0 && <span className={css.countInCart}>{total}</span>}
//     </Link>
//   );
// };

// export default WrapCart;
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";

import css from "./header.module.css";
import cartNfm from "../../img/cartNfm.png"; // звичайна іконка в хедері
import { useCart } from "../../lib/useCart";

const WrapCart = () => {
  const { getCart } = useCart();
  const [total, setTotal] = useState(0);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    // початковий підрахунок
    const cart = getCart();
    setTotal(cart.reduce((s, i) => s + i.quantity, 0));

    // підписка на оновлення кошика
    const handleCartUpdated = () => {
      const updated = getCart();
      setTotal(updated.reduce((s, i) => s + i.quantity, 0));
    };
    window.addEventListener("cartUpdated", handleCartUpdated);

    // показ/приховування плаваючої кнопки
    const onScroll = () => {
      // > 100px — показуємо
      setShowFloating(window.scrollY > 100);
    };
    onScroll(); // ініціалізація стану при завантаженні
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("scroll", onScroll);
    };
  }, [getCart]);

  return (
    <>
      {/* Іконка в хедері (як було) */}
      <Link href="/cart" className={css.wrapCartInHeader} aria-label="Кошик">
        <Image src={cartNfm} alt="Кошик" className={css.cartNfm} priority />
        {total > 0 && <span className={css.countInCart}>{total}</span>}
      </Link>

      {/* Плаваюча fixed-іконка (показується після 100px) */}
      {showFloating && (
        <Link
          href="/cart"
          className={`${css.floatingCart} ${showFloating ? css.visible : ""}`}
          aria-label="Відкрити кошик"
          title="Кошик"
        >
          <CiShoppingCart className={css.cartNfmFloat} />

          {total > 0 && <span className={css.countInCart}>{total}</span>}
        </Link>
      )}
    </>
  );
};

export default WrapCart;
