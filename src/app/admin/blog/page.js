"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import css from "../../../components/admin/admin.module.css";
import BackMenu from "../../../components/admin/backMenu";
import Swal from "sweetalert2";

export default function WorksList() {
  const [works, setWorks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get("/api/blogs");

      setWorks(response.data.data);
    } catch (error) {
      console.error("Помилка при завантаженні робіт:", error);
    }
  };

  const deleteWork = async (workId) => {
    try {
      const result = await Swal.fire({
        title: "Ви впевнені?",
        text: "Ця робота буде видалена назавжди!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Так, видалити!",
        cancelButtonText: "Скасувати",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/blogs?id=${workId}`);
        Swal.fire("Видалено!", "Роботу було успішно видалено.", "success");
        fetchWorks();
      }
    } catch (error) {
      Swal.fire("Помилка!", "Не вдалося видалити роботу.", "error");
    }
  };

  const editWork = (workId) => {
    router.push(`/admin/blog/edit/${workId}`);
  };

  const addNewWork = () => {
    router.push("/admin/blog/add");
  };
  console.log("fafdag", works);

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Список статей</h1>
          <button className={css.enterButtonInNew} onClick={addNewWork}>
            Додати нову статтю
          </button>
        </div>
        <div className={css.wrapTableAll}>
          <table className={css.wrapTableAll}>
            <thead>
              <tr className={css.tableHeader}>
                <th className={css.tableHeaderCell}>Назва</th>
                <th className={css.tableHeaderCell}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work._id} className={css.tableRow}>
                  <td className={css.tableCell}>{work.title}</td>
                  <td className={css.tableCell}>
                    <button
                      className={css.editButton}
                      onClick={() => editWork(work._id)}
                    >
                      Редагувати
                    </button>
                    <button
                      className={css.deleteButton}
                      onClick={() => deleteWork(work._id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
