"use client";
import css from "./main.module.css";
import { useCart } from "../../lib/useCart";
import { useState, useEffect } from "react";

const CartControls = ({ product }) => {
  const { _id, price, type = "default" } = product;
  const { addToCart, updateQuantity, getCart } = useCart();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = getCart().find((el) => el._id === _id && el.type === type);
    if (item) setQuantity(item.quantity);
  }, []);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      updateQuantity(_id, type, newQty);
    } else {
      addToCart(_id, type);
      setQuantity(1);
    }

    window.dispatchEvent(
      new CustomEvent("showToast", { detail: "Додано до корзини" })
    );
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(_id, type, newQty);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(_id, type, newQty);
    } else {
      setQuantity(0);
      updateQuantity(_id, type, 0);
    }
  };

  return (
    <div className={css.wrapCounter}>
      <p className={css.price}>{price} ГРН</p>
      <div className={css.line}></div>

      {quantity > 0 && (
        <>
          <div className={css.wrCountk}>
            <div className={css.cuntFj} onClick={handleDecrease}>
              -
            </div>
            <p className={css.price}>{quantity}</p>
            <div className={css.cuntFj} onClick={handleIncrease}>
              +
            </div>
          </div>
          <div className={css.line}></div>
        </>
      )}

      <p className={css.price} onClick={handleAddToCart}>
        В КОРЗИНУ
      </p>
    </div>
  );
};

export default CartControls;
