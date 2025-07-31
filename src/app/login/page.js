"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "../../components/admin/admin.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        document.cookie = `token=${data.token}; path=/`; // збереження токена
        router.push("/admin");
      } else {
        alert(data.message || "Помилка входу");
      }
    } catch (err) {
      console.error("Помилка входу:", err);
      alert("Помилка підключення до сервера");
    }
  };

  return (
    <div className={css.mainLogin}>
      <h1 className={css.enterH1}>Вхід</h1>
      <form onSubmit={handleLogin} className={css.loginForm}>
        <input
          type="text"
          placeholder="text"
          className={css.inputInCate}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={css.inputInCate}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={css.enterButtonIn} type="submit">
          Увійти
        </button>
      </form>
    </div>
  );
}
