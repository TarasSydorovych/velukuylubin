"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/useCart";
import css from "../../components/cart/cart.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/standartComponents/header";
import { AiOutlineDelete } from "react-icons/ai";
import Footer from "@/components/standartComponents/footer";

export default function CartClient() {
  const { getCart, updateQuantity, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // 1. Зчитуємо корзину з localStorage
  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);

    const handleUpdate = () => {
      setCartItems(getCart());
    };

    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);

  // 2. Отримуємо всі товари з бази
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("❌ Помилка завантаження продуктів:", err);
      }
    };

    fetchProducts();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className={css.ifCartD}>
        <Header />
        <div className={css.wrapEmpty}>
          <p className={css.empty}>🛒 Ваша корзина порожня</p>
          <Link href={`/menu`} className={css.wrapButtom}>
            Перейти до меню
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = cartItems.map((item) => {
    const product = allProducts.find((p) => p._id === item._id);
    return { ...item, product };
  });

  return (
    <div className={css.cartWrap}>
      <Header />
      <div className={css.wrapProdInCart}>
        {filteredProducts.map((item) => {
          const product = item.product;
          if (!product) return null;

          const imageUrl = product.images?.[0] || "/placeholder.png";
          const name = product.name?.ua || "Без назви";
          const price = product.price || 0;

          return (
            <div key={`${item._id}-${item.type}`} className={css.cartItem}>
              <Link href={`/product/${item._id}`} className={css.imgWrap}>
                <Image
                  src={imageUrl}
                  alt={name}
                  width={100}
                  height={100}
                  className={css.prodImg}
                />
              </Link>
              <h3 className={css.title}>{name}</h3>
              <div className={css.infoWrap}>
                <p className={css.price}>{price} грн</p>

                <div className={css.controls}>
                  <button
                    className={css.controlBtn}
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.type,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span className={css.qty}>{item.quantity}</span>
                  <button
                    className={css.controlBtn}
                    onClick={() =>
                      updateQuantity(item._id, item.type, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <AiOutlineDelete
                  className={css.removeBtn}
                  onClick={() => {
                    removeFromCart(item._id, item.type);
                    setCartItems(getCart());
                  }}
                />

                {/* <button>✕ Видалити</button> */}
              </div>
            </div>
          );
        })}{" "}
        <div className={css.totalBlock}>
          <p className={css.totalText}>
            Разом:
            <strong>
              {filteredProducts.reduce((sum, item) => {
                const price = item.product?.price || 0;
                return sum + price * item.quantity;
              }, 0)}{" "}
              грн
            </strong>
          </p>

          <Link href="/checkout" className={css.checkoutBtn}>
            Замовити
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
