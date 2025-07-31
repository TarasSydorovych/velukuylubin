"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("❌ Помилка при завантаженні товарів:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Ви впевнені, що хочете видалити цей товар?")) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        alert("✅ Товар видалено");
        fetchProducts();
      } else {
        alert("❌ Не вдалося видалити товар");
      }
    } catch (error) {
      console.error("❌ Помилка при видаленні товару:", error);
    }
  };

  const editProduct = (id) => {
    router.push(`/admin/products/edit/${id}`);
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список товарів</h1>
      {products.length === 0 ? (
        <p>Немає товарів</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <h2>{product.name.ua}</h2>
              <p>{product.shortDescription?.ua || "Опис відсутній"}</p>
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name.ua}
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                />
              )}
              <div>
                <button onClick={() => editProduct(product._id)}>
                  ✏️ Редагувати
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  🗑️ Видалити
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
