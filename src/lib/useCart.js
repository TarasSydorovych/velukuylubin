// export function useCart() {
//   const STORAGE_KEY = "kronos_cart";

//   const getCart = () => {
//     if (typeof window === "undefined") return [];
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         return Array.isArray(parsed) ? parsed : [];
//       } catch {
//         return [];
//       }
//     }
//     return [];
//   };

//   const addToCart = (productId) => {
//     const cart = getCart();
//     const exists = cart.find((item) => item._id === productId);
//     let updated;
//     if (exists) {
//       updated = cart.map((item) =>
//         item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       updated = [...cart, { _id: productId, quantity: 1 }];
//     }
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

//     window.dispatchEvent(new CustomEvent("cartUpdated")); // 🔑
//   };

//   const removeFromCart = (productId) => {
//     const cart = getCart();
//     const updated = cart.filter((item) => item._id !== productId);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//   };

//   const clearCart = () => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
//   };

//   return {
//     getCart,
//     addToCart,
//     removeFromCart,
//     clearCart,
//   };
// }
export function useCart() {
  const STORAGE_KEY = "velukuilubin_cart";

  const getCart = () => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const addToCart = (productId, type) => {
    const cart = getCart();
    const exists = cart.find(
      (item) => item._id === productId && item.type === type
    );
    let updated;
    if (exists) {
      updated = cart.map((item) =>
        item._id === productId && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...cart, { _id: productId, quantity: 1, type }];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const removeFromCart = (productId, type) => {
    const cart = getCart();
    const updated = cart.filter(
      (item) => !(item._id === productId && item.type === type)
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };
  const updateQuantity = (productId, type, quantity) => {
    const cart = getCart();

    let updated;

    if (quantity <= 0) {
      // Видаляємо товар повністю
      updated = cart.filter(
        (item) => !(item._id === productId && item.type === type)
      );
    } else {
      // Оновлюємо кількість
      updated = cart.map((item) =>
        item._id === productId && item.type === type
          ? { ...item, quantity }
          : item
      );
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
}
