"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

import css from "../../../../../components/admin/styles/addStyle.module.css";
import BackMenu from "../../../../../components/admin/backMenu";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

export default function EditWork() {
  const [workData, setWorkData] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setWorkData((prev) => ({
        ...prev,
        ua: {
          ...prev.ua,
          longDescription: editor.getHTML(),
        },
      }));
    },
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`/api/blogs?id=${id}`);
        const data = response.data.data;
        setWorkData({
          ua: data.ua,
          photos: data.photos || [],
        });
        setSelectedPhotos(data.photos || []);
        editor?.commands.setContent(data.ua.longDescription || "");
      } catch (error) {
        console.error("Помилка при завантаженні статті:", error);
      }
    };

    if (editor) fetchWork();
  }, [id, editor]);

  const handleInputChange = (e, field) => {
    setWorkData((prev) => ({
      ...prev,
      ua: {
        ...prev.ua,
        [field]: e.target.value,
      },
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedPhotos((prev) => [...prev, ...files]);
    setWorkData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
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
      title: "Оновлення...",
      text: "Будь ласка, зачекайте",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const newPhotos = await uploadPhotos(
        workData.photos.filter((file) => file instanceof File)
      );

      const finalPhotos = [
        ...selectedPhotos.filter((photo) => typeof photo === "string"),
        ...newPhotos,
      ];

      const payload = {
        ua: workData.ua,
        photos: finalPhotos,
      };

      await axios.put(`/api/blogs?id=${id}`, payload);

      Swal.fire({
        icon: "success",
        title: "Готово!",
        text: "Статтю оновлено успішно.",
      });

      router.push("/admin/blog");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Не вдалося оновити статтю.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!workData) return <div>Завантаження...</div>;

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <h1 className={css.enterH1}>Редагувати статтю</h1>
        <form onSubmit={handleSubmit} className={css.productForm}>
          <div className={css.formGroup}>
            <input
              type="text"
              placeholder="Заголовок"
              value={workData.ua.title}
              onChange={(e) => handleInputChange(e, "title")}
              required
              className={css.productInput}
            />

            <input
              type="text"
              placeholder="SEO Title"
              value={workData.ua.seotitle}
              onChange={(e) => handleInputChange(e, "seotitle")}
              required
              className={css.productInput}
            />

            <input
              type="text"
              placeholder="SEO Description"
              value={workData.ua.seodescription}
              onChange={(e) => handleInputChange(e, "seodescription")}
              required
              className={css.productInput}
            />

            <textarea
              placeholder="Короткий опис"
              value={workData.ua.shortDescription}
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
            {loading ? "Оновлення..." : "Оновити статтю"}
          </button>
        </form>
      </div>
    </div>
  );
}
