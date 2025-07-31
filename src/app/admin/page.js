// src/app/admin/page.js
import styles from "../../components/admin/admin.module.css";
import BackMenu from "../../components/admin/backMenu";

export default function AdminHomePage() {
  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1>Панель управління сайтом</h1>
      </div>
    </div>
  );
}
