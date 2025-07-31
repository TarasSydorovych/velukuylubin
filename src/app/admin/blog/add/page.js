// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { storage } from "../../../../lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
// import css from "../../../../components/admin/styles/addStyle.module.css";
// import BackMenu from "../../../../components/admin/backMenu";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// export default function AddWork() {
//   const [loading, setLoading] = useState(false);
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   const [workData, setWorkData] = useState({
//     ua: {
//       title: "",
//       seotitle: "",
//       seodescription: "",
//       shortDescription: "",
//       longDescription: "",
//     },
//     photos: [],
//   });

//   const handleInputChange = (e, field) => {
//     setWorkData((prev) => ({
//       ...prev,
//       ua: {
//         ...prev.ua,
//         [field]: e.target.value,
//       },
//     }));
//   };

//   const handleQuillChange = (value) => {
//     setWorkData((prev) => ({
//       ...prev,
//       ua: {
//         ...prev.ua,
//         longDescription: value,
//       },
//     }));
//   };

//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedPhotos((prev) => [...prev, ...files]);
//     setWorkData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...files],
//     }));
//   };

//   const handleRemovePhoto = (index) => {
//     setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
//     setWorkData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//   };

//   const uploadPhotos = async (files) => {
//     const promises = files.map((file) => {
//       const storageRef = ref(storage, `blogs/${file.name}`);
//       return uploadBytes(storageRef, file).then(async (snapshot) => {
//         return await getDownloadURL(snapshot.ref);
//       });
//     });
//     return Promise.all(promises);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     Swal.fire({
//       title: "Завантаження...",
//       text: "Будь ласка, зачекайте",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const photoURLs = await uploadPhotos(workData.photos);
//       const formData = {
//         ua: workData.ua,
//         photos: photoURLs,
//       };

//       await axios.post("/api/blogs", formData);

//       Swal.fire({
//         icon: "success",
//         title: "Готово!",
//         text: "Статтю додано успішно.",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Спробуйте ще раз.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <h1 className={css.enterH1}>Додати нову статтю</h1>
//         <form onSubmit={handleSubmit} className={css.productForm}>
//           <div className={css.formGroup}>
//             <h2 className={css.productLabel}>Українська версія</h2>

//             <input
//               type="text"
//               placeholder="Заголовок"
//               value={workData.ua.title}
//               onChange={(e) => handleInputChange(e, "title")}
//               required
//               className={css.productInput}
//             />

//             <input
//               type="text"
//               placeholder="SEO Title"
//               value={workData.ua.seotitle}
//               onChange={(e) => handleInputChange(e, "seotitle")}
//               required
//               className={css.productInput}
//             />

//             <input
//               type="text"
//               placeholder="SEO Description"
//               value={workData.ua.seodescription}
//               onChange={(e) => handleInputChange(e, "seodescription")}
//               required
//               className={css.productInput}
//             />

//             <textarea
//               placeholder="Короткий опис"
//               value={workData.ua.shortDescription}
//               onChange={(e) => handleInputChange(e, "shortDescription")}
//               required
//               className={css.productTextarea}
//             />

//             <h3 className={css.productLabel}>Довгий опис</h3>
//             <ReactQuill
//               className={css.productQuill}
//               theme="snow"
//               value={workData.ua.longDescription}
//               onChange={handleQuillChange}
//               modules={modules}
//             />
//           </div>

//           <div className={css.formGroupFull}>
//             <h2 className={css.productLabel}>Фото</h2>
//             <input
//               type="file"
//               multiple
//               onChange={handlePhotoChange}
//               required
//               className={css.productFileInput}
//             />

//             <div className={css.selectedPhotosContainer}>
//               {selectedPhotos.map((photo, index) => (
//                 <div key={index} className={css.photoWrapper}>
//                   <img
//                     src={
//                       typeof photo === "string"
//                         ? photo
//                         : URL.createObjectURL(photo)
//                     }
//                     alt={`Фото ${index + 1}`}
//                     className={css.photoPreview}
//                   />
//                   <button
//                     type="button"
//                     className={css.deletePhotoButton}
//                     onClick={() => handleRemovePhoto(index)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button type="submit" disabled={loading} className={css.submitButton}>
//             {loading ? "Додавання..." : "Додати статтю"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import css from "../../../../components/admin/styles/addStyle.module.css";
import BackMenu from "../../../../components/admin/backMenu";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

export default function AddWork() {
  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const [workData, setWorkData] = useState({
    title: "",
    seotitle: "",
    seodescription: "",
    shortDescription: "",
    longDescription: "",
    photos: [],
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
    ],
    content: workData.longDescription,
    onUpdate: ({ editor }) => {
      setWorkData((prev) => ({ ...prev, longDescription: editor.getHTML() }));
    },
  });

  const handleInputChange = (e, field) => {
    setWorkData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedPhotos((prev) => [...prev, ...files]);
    setWorkData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
    setWorkData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const uploadPhotos = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await axios.post("/api/upload", formData);
    return res.data.urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Завантаження...",
      text: "Будь ласка, зачекайте",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const photoURLs = await uploadPhotos(workData.photos);
      const formData = {
        ua: {
          title: workData.title,
          seotitle: workData.seotitle,
          seodescription: workData.seodescription,
          shortDescription: workData.shortDescription,
          longDescription: workData.longDescription,
        },
        photos: photoURLs,
      };

      await axios.post("/api/blogs", formData);

      Swal.fire({
        icon: "success",
        title: "Готово!",
        text: "Статтю додано успішно.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Спробуйте ще раз.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <h1 className={css.enterH1}>Додати нову статтю</h1>
        <form onSubmit={handleSubmit} className={css.productForm}>
          <div className={css.formGroup}>
            <input
              type="text"
              placeholder="Заголовок"
              value={workData.title}
              onChange={(e) => handleInputChange(e, "title")}
              required
              className={css.productInput}
            />

            <input
              type="text"
              placeholder="SEO Title"
              value={workData.seotitle}
              onChange={(e) => handleInputChange(e, "seotitle")}
              required
              className={css.productInput}
            />

            <input
              type="text"
              placeholder="SEO Description"
              value={workData.seodescription}
              onChange={(e) => handleInputChange(e, "seodescription")}
              required
              className={css.productInput}
            />

            <textarea
              placeholder="Короткий опис"
              value={workData.shortDescription}
              onChange={(e) => handleInputChange(e, "shortDescription")}
              required
              className={css.productTextarea}
            />

            <label className={css.productLabel}>Довгий опис</label>
            <div className={css.tiptapToolbar}>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().setParagraph().run()}
              >
                P
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                • Список
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
              >
                1. Список
              </button>
            </div>
            <div className={css.tiptapEditor}>
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className={css.formGroupFull}>
            <h2 className={css.productLabel}>Фото</h2>
            <input
              type="file"
              multiple
              onChange={handlePhotoChange}
              required
              className={css.productFileInput}
            />

            <div className={css.selectedPhotosContainer}>
              {selectedPhotos.map((photo, index) => (
                <div key={index} className={css.photoWrapper}>
                  <img
                    src={
                      typeof photo === "string"
                        ? photo
                        : URL.createObjectURL(photo)
                    }
                    alt={`Фото ${index + 1}`}
                    className={css.photoPreview}
                  />
                  <button
                    type="button"
                    className={css.deletePhotoButton}
                    onClick={() => handleRemovePhoto(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className={css.submitButton}>
            {loading ? "Додавання..." : "Додати статтю"}
          </button>
        </form>
      </div>
    </div>
  );
}
