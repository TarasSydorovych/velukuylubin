// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { storage } from "../../../lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
// import css from "../../components/admin/admin.module.css";
// // Динамічний імпорт ReactQuill без SSR
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css"; // Стилі для ReactQuill
// import BackMenu from "@/app/components/admin/backMenu";

// export default function AddWork() {
//   const [workData, setWorkData] = useState({
//     translations: {
//       en: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       pl: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       ru: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       ua: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//     },
//     videoId: "",
//     photos: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [selectedPhotos, setSelectedPhotos] = useState([]); // Масив для збереження попередньо вибраних фото

//   const handleInputChange = (e, lang, field) => {
//     setWorkData({
//       ...workData,
//       translations: {
//         ...workData.translations,
//         [lang]: {
//           ...workData.translations[lang],
//           [field]: e.target.value,
//         },
//       },
//     });
//   };

//   const handleQuillChange = (value, lang) => {
//     setWorkData({
//       ...workData,
//       translations: {
//         ...workData.translations,
//         [lang]: {
//           ...workData.translations[lang],
//           longDescription: value,
//         },
//       },
//     });
//   };

//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files); // Перетворюємо об'єкт FileList у масив
//     const photoPreviews = files.map((file) => URL.createObjectURL(file)); // Створюємо URL для попереднього перегляду фото

//     setSelectedPhotos((prevPhotos) => [...prevPhotos, ...photoPreviews]); // Додаємо нові фото до попередніх
//     setWorkData((prevWorkData) => ({
//       ...prevWorkData,
//       photos: [...prevWorkData.photos, ...files], // Додаємо вибрані файли у workData
//     }));
//   };

//   const uploadPhotos = async (files) => {
//     const promises = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const storageRef = ref(storage, `works/${file.name}`);
//       const uploadTask = uploadBytes(storageRef, file);
//       promises.push(
//         uploadTask.then(async (snapshot) => {
//           const downloadURL = await getDownloadURL(snapshot.ref);
//           return downloadURL;
//         })
//       );
//     }
//     return Promise.all(promises);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Завантаження...",
//       text: "Будь ласка, зачекайте, завантаження триває",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const photoURLs = await uploadPhotos(workData.photos);

//       const formData = {
//         translations: workData.translations,
//         videoId: workData.videoId,
//         photos: photoURLs,
//       };

//       const response = await axios.post("/api/works", formData);

//       Swal.fire({
//         icon: "success",
//         title: "Успіх!",
//         text: "Робота успішно додана!",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка при додаванні роботи. Спробуйте ще раз.",
//       });
//     } finally {
//       setLoading(false);
//       Swal.close();
//     }
//   };

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <h1>Додати нову роботу</h1>

//         <form onSubmit={handleSubmit} className={css.productForm}>
//           {["en", "pl", "ru", "ua"].map((lang) => (
//             <div key={lang} className={css.formGroupWorks}>
//               <h2>
//                 {lang === "en"
//                   ? "Англійська версія"
//                   : lang === "pl"
//                   ? "Польська версія"
//                   : lang === "ru"
//                   ? "Російська версія"
//                   : "Українська версія"}
//               </h2>
//               <input
//                 type="text"
//                 placeholder={`Title (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].title}
//                 onChange={(e) => handleInputChange(e, lang, "title")}
//                 required
//                 className={css.inputInAddWorks}
//               />
//               <input
//                 type="text"
//                 placeholder={`SEO Title (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].seotitle}
//                 onChange={(e) => handleInputChange(e, lang, "seotitle")}
//                 required
//                 className={css.inputInAddWorks}
//               />
//               <input
//                 type="text"
//                 placeholder={`SEO Description (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].seodescription}
//                 onChange={(e) => handleInputChange(e, lang, "seodescription")}
//                 required
//                 className={css.inputInAddWorks}
//               />
//               <textarea
//                 placeholder={`Short Description (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].shortDescription}
//                 onChange={(e) => handleInputChange(e, lang, "shortDescription")}
//                 required
//                 className={css.inputInAddWorks}
//               />
//               <h3>Довгий опис ({lang.toUpperCase()})</h3>
//               <ReactQuill
//                 className={css.bigDescriptino}
//                 theme="snow"
//                 value={workData.translations[lang].longDescription}
//                 onChange={(value) => handleQuillChange(value, lang)}
//               />
//             </div>
//           ))}

//           <h2 className={css.newWorksH2}>Додаткові дані</h2>
//           <input
//             type="text"
//             placeholder="Video ID"
//             value={workData.videoId}
//             onChange={(e) =>
//               setWorkData({ ...workData, videoId: e.target.value })
//             }
//             required
//           />

//           <h2>Фото</h2>
//           <input type="file" multiple onChange={handlePhotoChange} required />

//           {/* Відображення обраних фото */}
//           <div className={css.selectedPhotosContainer}>
//             {selectedPhotos.map((photo, index) => (
//               <img
//                 key={index}
//                 src={photo}
//                 alt={`Selected ${index + 1}`}
//                 className={css.photoPreview}
//               />
//             ))}
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Додавання..." : "Додати роботу"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import css from "../../components/admin/admin.module.css";
import BackMenu from "../../components/admin/backMenu";
import Swal from "sweetalert2";

export default function WorksList() {
  const [works, setWorks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get("/api/works");

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
        await axios.delete(`/api/works?id=${workId}`);
        Swal.fire("Видалено!", "Роботу було успішно видалено.", "success");
        fetchWorks();
      }
    } catch (error) {
      Swal.fire("Помилка!", "Не вдалося видалити роботу.", "error");
    }
  };

  const editWork = (workId) => {
    router.push(`/admin/works/edit/${workId}`);
  };

  const addNewWork = () => {
    router.push("/admin/works/add");
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Список робіт</h1>
          <button className={css.enterButtonInNew} onClick={addNewWork}>
            Додати нову роботу
          </button>
        </div>
        <div className={css.wrapTableAll}>
          <table className={css.wrapTableAll}>
            <thead>
              <tr className={css.tableHeader}>
                <th className={css.tableHeaderCell}>Назва (UA)</th>
                <th className={css.tableHeaderCell}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work._id} className={css.tableRow}>
                  <td className={css.tableCell}>
                    {work.translations.ua.title}
                  </td>
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
