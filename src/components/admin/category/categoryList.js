import axios from "axios";
import css from "../admin.module.css";

export default function CategoryList({
  categories,
  onEditCategory,
  fetchCategories,
}) {
  const handleDelete = async (id) => {
    if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
      await axios.delete(`/api/category?id=${id}`);
      fetchCategories();
    }
  };

  return (
    <table className={css.wrapTableAll}>
      <thead>
        <tr className={css.tableHeader}>
          <th className={css.tableHeaderCell}>Назва</th>

          <th className={css.tableHeaderCell}>Дії</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id} className={css.tableRow}>
            <td className={css.tableCell}>{category.name.ua}</td>

            <td className={css.tableCell}>
              <button
                className={css.editButton}
                onClick={() => onEditCategory(category._id)}
              >
                Редагувати
              </button>
              <button
                className={css.deleteButton}
                onClick={() => handleDelete(category._id)}
              >
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
