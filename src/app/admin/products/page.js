"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import css from "../../../components/admin/admin.module.css";
import BackMenu from "../../../components/admin/backMenu";
import Swal from "sweetalert2";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Помилка при завантаженні товарів:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Помилка при завантаженні категорій:", err);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name.ua : "Без категорії";
  };

  const deleteProduct = async (productId) => {
    const result = await Swal.fire({
      title: "Ви впевнені?",
      text: "Цей товар буде видалено назавжди!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Так, видалити!",
      cancelButtonText: "Скасувати",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/products?id=${productId}`);
        Swal.fire("Видалено!", "Товар успішно видалено.", "success");
        fetchProducts();
      } catch (error) {
        Swal.fire("Помилка!", "Не вдалося видалити товар.", "error");
      }
    }
  };

  const editProduct = (id) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const addNewProduct = () => {
    router.push("/admin/products/add");
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Список товарів</h1>
          <button className={css.enterButtonInNew} onClick={addNewProduct}>
            ➕ Додати товар
          </button>
        </div>

        <div className={css.wrapTableAll}>
          <table className={css.wrapTableAll}>
            <thead>
              <tr className={css.tableHeader}>
                <th className={css.tableHeaderCell}>Назва (UA)</th>
                <th className={css.tableHeaderCell}>Категорія</th>
                <th className={css.tableHeaderCell}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className={css.tableRow}>
                  <td className={css.tableCell}>{product.name.ua}</td>
                  <td className={css.tableCell}>
                    {getCategoryName(product.category)}
                  </td>
                  <td className={css.tableCell}>
                    <button
                      className={css.editButton}
                      onClick={() => editProduct(product._id)}
                    >
                      ✏️ Редагувати
                    </button>
                    <button
                      className={css.deleteButton}
                      onClick={() => deleteProduct(product._id)}
                    >
                      🗑️ Видалити
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="3" className={css.tableCell}>
                    Товари відсутні
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
