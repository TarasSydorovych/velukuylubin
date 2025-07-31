"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../../../components/admin/styles/addStyle.module.css";
import Swal from "sweetalert2";
import BackMenu from "../../../../components/admin/backMenu";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
export default function AddProductPage() {
  const [formState, setFormState] = useState({
    name: { ua: "" },
    shortDescription: { ua: "" },
    longDescription: { ua: "" },
    seotitle: { ua: "" },
    seodescriptions: { ua: "" },
    seoText: { ua: "" },
    images: [],
    characteristics: [{ name: "", value: "" }],
    category: "",
    price: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
    ],
    content: formState.longDescription.ua,
    onUpdate: ({ editor }) => {
      setFormState((prev) => ({
        ...prev,
        longDescription: { ua: editor.getHTML() },
      }));
    },
  });

  useEffect(() => {
    axios.get("/api/category").then((res) => setCategories(res.data));
  }, []);

  // const handleImageChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append("files", file));
  //   try {
  //     const res = await axios.post("/api/uploads", formData);
  //     setFormState((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...res.data.urls],
  //     }));
  //   } catch (err) {
  //     console.error("Upload error:", err);
  //   }
  // };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    setIsUploading(true);
    Swal.fire({
      title: "Завантаження фото...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      for (const file of files) {
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        urls.push(downloadUrl);
      }

      setFormState((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));

      Swal.close();
    } catch (err) {
      console.error("❌ Firebase upload error:", err);
      Swal.fire("Помилка", "Не вдалося завантажити фото", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.ua.trim()) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Введіть назву продукту.",
      });
      return;
    }

    Swal.fire({ title: "Завантаження...", didOpen: () => Swal.showLoading() });

    try {
      await axios.post("/api/products", formState);
      await axios.post("/api/updateSitemap", {
        productName: formState.name.ua,
      });
      Swal.fire({ icon: "success", title: "Продукт додано!" });
      router.push("/admin/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Не вдалося додати продукт.",
      });
    }
  };

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1 className={styles.enterH1}>Додати новий продукт</h1>
        <form onSubmit={handleSubmit} className={styles.productForm}>
          <input
            type="text"
            placeholder="Назва"
            className={styles.productInput}
            value={formState.name.ua}
            onChange={(e) =>
              setFormState({ ...formState, name: { ua: e.target.value } })
            }
            required
          />

          <textarea
            placeholder="Короткий опис"
            className={styles.productTextarea}
            value={formState.shortDescription.ua}
            onChange={(e) =>
              setFormState({
                ...formState,
                shortDescription: { ua: e.target.value },
              })
            }
          />

          <label className={styles.productLabel}>Довгий опис</label>
          <div className={styles.tiptapToolbar}>
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
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              1. Список
            </button>
          </div>
          <div className={styles.tiptapEditor}>
            <EditorContent editor={editor} />
          </div>

          <input
            type="text"
            placeholder="SEO Title"
            className={styles.productInput}
            value={formState.seotitle.ua}
            onChange={(e) =>
              setFormState({ ...formState, seotitle: { ua: e.target.value } })
            }
          />
          <input
            type="number"
            placeholder="Ціна (грн)"
            className={styles.productInput}
            value={formState.price}
            onChange={(e) =>
              setFormState({
                ...formState,
                price: parseFloat(e.target.value) || "",
              })
            }
            required
          />
          <textarea
            placeholder="SEO Опис"
            className={styles.productTextarea}
            value={formState.seodescriptions.ua}
            onChange={(e) =>
              setFormState({
                ...formState,
                seodescriptions: { ua: e.target.value },
              })
            }
          />

          <input
            type="text"
            placeholder="SEO Текст (додатковий)"
            className={styles.productInput}
            value={formState.seoText.ua}
            onChange={(e) =>
              setFormState({ ...formState, seoText: { ua: e.target.value } })
            }
          />

          <select
            value={formState.category}
            onChange={(e) =>
              setFormState({ ...formState, category: e.target.value })
            }
          >
            <option value="">Оберіть категорію</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name.ua}
              </option>
            ))}
          </select>

          <input type="file" multiple onChange={handleImageChange} />

          {formState.characteristics.map((char, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Назва характеристики"
                value={char.name}
                onChange={(e) => {
                  const updated = [...formState.characteristics];
                  updated[i].name = e.target.value;
                  setFormState({ ...formState, characteristics: updated });
                }}
              />
              <input
                type="text"
                placeholder="Значення"
                value={char.value}
                onChange={(e) => {
                  const updated = [...formState.characteristics];
                  updated[i].value = e.target.value;
                  setFormState({ ...formState, characteristics: updated });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = formState.characteristics.filter(
                    (_, idx) => idx !== i
                  );
                  setFormState({ ...formState, characteristics: updated });
                }}
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormState({
                ...formState,
                characteristics: [
                  ...formState.characteristics,
                  { name: "", value: "" },
                ],
              })
            }
          >
            Додати характеристику
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isUploading}
          >
            {isUploading ? "Зачекайте..." : "Додати продукт"}
          </button>
        </form>
      </div>
    </div>
  );
}
