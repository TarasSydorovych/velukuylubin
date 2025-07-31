"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./admin.module.css";

const BackMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // видалення токена
    router.push("/login");
  };

  return (
    <div className={css.wrapBackMenu}>
      <Link href={`/admin/categories`} className={css.linkInDas}>
        Категорії
      </Link>
      <Link href={`/admin/products`} className={css.linkInDas}>
        Товари
      </Link>

      <Link href={`/admin/blog`} className={css.linkInDas}>
        Блог
      </Link>
      <button onClick={handleLogout} className={css.logoutButton}>
        Вийти
      </button>
    </div>
  );
};

export default BackMenu;
