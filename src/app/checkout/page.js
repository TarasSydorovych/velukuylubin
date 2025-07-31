// "use client";

// import css from "../../components/checkout/checkout.module.css";
// import Header from "@/components/standartComponents/header";
// import Footer from "@/components/standartComponents/footer";
// import { useState, useEffect } from "react";
// import { useCart } from "@/lib/useCart";
// import Image from "next/image";
// import Link from "next/link";

// export default function CheckoutPage() {
//   const { getCart } = useCart();
//   const [cartItems, setCartItems] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     street: "",
//     building: "",
//     apartment: "",
//     comment: "",
//     peopleCount: 1,
//     deliveryMethod: "courier",
//     paymentMethod: "cash",
//   });

//   // Отримуємо дані з localStorage
//   useEffect(() => {
//     setCartItems(getCart());

//     const handleUpdate = () => {
//       setCartItems(getCart());
//     };

//     window.addEventListener("cartUpdated", handleUpdate);
//     return () => window.removeEventListener("cartUpdated", handleUpdate);
//   }, []);

//   // Отримуємо товари з бази
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/products", { cache: "no-store" });
//         const data = await res.json();
//         setAllProducts(data);
//       } catch (err) {
//         console.error("❌ Помилка завантаження продуктів:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = cartItems.map((item) => {
//     const product = allProducts.find((p) => p._id === item._id);
//     return { ...item, product };
//   });

//   const totalSum = filteredProducts.reduce((sum, item) => {
//     const price = item.product?.price || 0;
//     return sum + price * item.quantity;
//   }, 0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className={css.checkoutWrap}>
//       <Header />
//       <div className={css.container}>
//         <h2 className={css.title}>Робимо замовлення</h2>
//         <div className={css.wrapTwoLde}>
//           <div className={css.formBlock}>
//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Спосіб доставки</h3>
//               <div className={css.radioGroup}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="deliveryMethod"
//                     value="courier"
//                     checked={formData.deliveryMethod === "courier"}
//                     onChange={handleChange}
//                   />
//                   Доставка курʼєром
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="deliveryMethod"
//                     value="pickup"
//                     checked={formData.deliveryMethod === "pickup"}
//                     onChange={handleChange}
//                   />
//                   Самовивіз
//                 </label>
//               </div>
//             </div>

//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Дані одержувача</h3>
//               <input
//                 className={css.input}
//                 name="name"
//                 placeholder="Імʼя"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <input
//                 className={css.input}
//                 name="phone"
//                 placeholder="Телефон"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Адреса</h3>
//               <input
//                 className={css.input}
//                 name="street"
//                 placeholder="Вулиця"
//                 value={formData.street}
//                 onChange={handleChange}
//               />
//               <input
//                 className={css.input}
//                 name="building"
//                 placeholder="Будинок"
//                 value={formData.building}
//                 onChange={handleChange}
//               />
//               <input
//                 className={css.input}
//                 name="apartment"
//                 placeholder="Квартира"
//                 value={formData.apartment}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Умови оплати</h3>
//               <div className={css.radioGroup}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cash"
//                     checked={formData.paymentMethod === "cash"}
//                     onChange={handleChange}
//                   />
//                   Готівкою
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="card"
//                     checked={formData.paymentMethod === "card"}
//                     onChange={handleChange}
//                   />
//                   Карткою при отриманні
//                 </label>
//               </div>
//             </div>

//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Коментар до замовлення</h3>
//               <textarea
//                 className={css.textarea}
//                 name="comment"
//                 placeholder="Коментар"
//                 value={formData.comment}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Кількість персон</h3>
//               <input
//                 className={css.input}
//                 type="number"
//                 name="peopleCount"
//                 min="1"
//                 value={formData.peopleCount}
//                 onChange={handleChange}
//               />
//             </div>

//             <button className={css.submitBtn}>Замовити</button>
//           </div>{" "}
//           {filteredProducts.length > 0 && (
//             <div className={css.cartSummary}>
//               <h3 className={css.sectionTitle}>Ваше замовлення</h3>
//               {filteredProducts.map((item) => {
//                 const product = item.product;
//                 if (!product) return null;
//                 const imageUrl = product.images?.[0] || "/placeholder.png";
//                 const name = product.name?.ua || "Без назви";
//                 const price = product.price || 0;

//                 return (
//                   <div key={`${item._id}-${item.type}`} className={css.itemRow}>
//                     <Image
//                       src={imageUrl}
//                       alt={name}
//                       width={60}
//                       height={60}
//                       className={css.itemImage}
//                     />
//                     <div className={css.itemInfo}>
//                       <p className={css.itemName}>{name}</p>
//                       <p className={css.itemQty}>Кількість: {item.quantity}</p>
//                       <p className={css.itemPrice}>
//                         {price * item.quantity} грн
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//               <p className={css.total}>
//                 <strong>Разом: {totalSum} грн</strong>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
"use client";

import css from "../../components/checkout/checkout.module.css";
import Header from "@/components/standartComponents/header";
import Footer from "@/components/standartComponents/footer";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/useCart";
import Image from "next/image";

export default function CheckoutPage() {
  const { getCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    building: "",
    apartment: "",
    comment: "",
    peopleCount: 1,
    deliveryMethod: "courier",
    paymentMethod: "cash",
    deliveryLocation: "", // тільки один варіант
  });

  // Отримання корзини
  useEffect(() => {
    setCartItems(getCart());

    const handleUpdate = () => {
      setCartItems(getCart());
    };

    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);

  // Завантаження продуктів з API
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

  // Поєднання товарів з корзини з даними з бази
  const filteredProducts = cartItems.map((item) => {
    const product = allProducts.find((p) => p._id === item._id);
    return { ...item, product };
  });
  const handleSubmit = async () => {
    const items = filteredProducts.map((item) => ({
      name: item.product?.name?.ua || "Без назви",
      quantity: item.quantity,
    }));

    const payload = {
      ...formData,
      items,
      total: totalSum,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendViber`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (result.success) {
        alert("✅ Замовлення відправлено через Viber!");
      } else {
        alert("❌ Помилка при відправці повідомлення.");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Виникла помилка при надсиланні.");
    }
  };

  // Підрахунок суми
  const totalSum = filteredProducts.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  // Обробка інпутів
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={css.checkoutWrap}>
      <Header />
      <div className={css.container}>
        <h2 className={css.title}>Робимо замовлення</h2>

        <div className={css.wrapTwoLde}>
          {/* Ліва частина — форма */}
          <div className={css.formBlock}>
            {/* 📍 Локація доставки */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Локація доставки</h3>
              <div className={css.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="deliveryLocation"
                    value="Великий Любінь"
                    checked={formData.deliveryLocation === "Великий Любінь"}
                    onChange={handleChange}
                  />
                  Доставка Великий Любінь
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryLocation"
                    value="Зимна Вода"
                    checked={formData.deliveryLocation === "Зимна Вода"}
                    onChange={handleChange}
                  />
                  Доставка Зимна Вода
                </label>
              </div>
            </div>

            {/* 🚚 Спосіб доставки */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Спосіб доставки</h3>
              <div className={css.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="courier"
                    checked={formData.deliveryMethod === "courier"}
                    onChange={handleChange}
                  />
                  Доставка курʼєром
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === "pickup"}
                    onChange={handleChange}
                  />
                  Самовивіз
                </label>
              </div>
            </div>

            {/* 👤 Дані одержувача */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Дані одержувача</h3>
              <input
                className={css.input}
                name="name"
                placeholder="Імʼя"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className={css.input}
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* 🏡 Адреса */}
            {/* <div className={css.section}>
              <h3 className={css.sectionTitle}>Адреса</h3>
              <input
                className={css.input}
                name="street"
                placeholder="Вулиця"
                value={formData.street}
                onChange={handleChange}
              />
              <input
                className={css.input}
                name="building"
                placeholder="Будинок"
                value={formData.building}
                onChange={handleChange}
              />
              <input
                className={css.input}
                name="apartment"
                placeholder="Квартира"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div> */}
            {formData.deliveryMethod === "courier" && (
              <div className={css.section}>
                <h3 className={css.sectionTitle}>Адреса</h3>
                <input
                  className={css.input}
                  name="street"
                  placeholder="Вулиця"
                  value={formData.street}
                  onChange={handleChange}
                />
                <input
                  className={css.input}
                  name="building"
                  placeholder="Будинок"
                  value={formData.building}
                  onChange={handleChange}
                />
                <input
                  className={css.input}
                  name="apartment"
                  placeholder="Квартира"
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* 💳 Оплата */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Умови оплати</h3>
              <div className={css.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                  />
                  Готівкою
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  Карткою при отриманні
                </label>
              </div>
            </div>

            {/* 📝 Коментар */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Коментар до замовлення</h3>
              <textarea
                className={css.textarea}
                name="comment"
                placeholder="Коментар"
                value={formData.comment}
                onChange={handleChange}
              />
              <p className={css.newRew}>
                Вкажіть кількість персон, необхідні прибори (палички, учбові
                палички чи вилки) та час доставки (зараз чи на певну годину) у
                коментар до замовлення. Також зазначте чи потрібні васабі та/чи
                імбир
              </p>
            </div>

            {/* 👥 Кількість персон */}
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Кількість персон</h3>
              <input
                className={css.input}
                type="number"
                name="peopleCount"
                min="1"
                value={formData.peopleCount}
                onChange={handleChange}
              />
            </div>

            <button className={css.submitBtn} onClick={handleSubmit}>
              Замовити
            </button>
          </div>

          {/* Права частина — замовлення */}
          {filteredProducts.length > 0 && (
            <div className={css.cartSummary}>
              <h3 className={css.sectionTitle}>Ваше замовлення</h3>
              {filteredProducts.map((item) => {
                const product = item.product;
                if (!product) return null;
                const imageUrl = product.images?.[0] || "/placeholder.png";
                const name = product.name?.ua || "Без назви";
                const price = product.price || 0;

                return (
                  <div key={`${item._id}-${item.type}`} className={css.itemRow}>
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={60}
                      height={60}
                      className={css.itemImage}
                    />
                    <div className={css.itemInfo}>
                      <p className={css.itemName}>{name}</p>
                      <p className={css.itemQty}>Кількість: {item.quantity}</p>
                      <p className={css.itemPrice}>
                        {price * item.quantity} грн
                      </p>
                    </div>
                  </div>
                );
              })}
              <p className={css.total}>
                <strong>Разом: {totalSum} грн</strong>
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
