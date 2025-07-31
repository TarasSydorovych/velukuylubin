"use client";
import cartNfm from "../../img/cartNfm.png";
import css from "./header.module.css";
import { useState, useEffect } from "react";
import { useCart } from "../../lib/useCart"; // якщо ти тримаєш getCart в хуку
import Link from "next/link";
import Image from "next/image";

const WrapCart = () => {
  const { getCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Спочатку рахуємо одразу
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(totalItems);

    // Підписуємось на подію "cartUpdated"
    const handleCartUpdated = () => {
      const updatedCart = getCart();
      const updatedTotal = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setTotal(updatedTotal);
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [getCart]);

  return (
    <Link href="/cart" className={css.wrapCartInHeader}>
      <Image
        src={cartNfm}
        alt="Суші Великий Любіню"
        className={css.cartNfm}
        priority
      />{" "}
      {total > 0 && <span className={css.countInCart}>{total}</span>}
    </Link>
  );
};

export default WrapCart;
