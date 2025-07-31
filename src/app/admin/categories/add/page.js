"use client";
import { useRouter } from "next/navigation";
import CategoryForm from "../../../../components/admin/category/categoryForm";
import css from "../../../../components/admin/admin.module.css";
import BackMenu from "../../../../components/admin/backMenu";
import { useEffect, useState } from "react";
import axios from "axios"; // Не забудь імпорт axios

export default function AddCategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  // Функція для завантаження категорій
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data); // Зберігаємо масив категорій
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Викликаємо fetchCategories при завантаженні компонента
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Додати нову категорію</h1>
          <button
            className={css.enterButtonInNew}
            onClick={() => router.push("/admin/categories")}
          >
            Назад
          </button>
        </div>
        {/* Передаємо завантажені категорії у форму */}
        <CategoryForm
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>
    </div>
  );
}
