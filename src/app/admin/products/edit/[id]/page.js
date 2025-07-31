"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import styles from "../../../../../components/admin/styles/addStyle.module.css";
import Swal from "sweetalert2";
import BackMenu from "../../../../../components/admin/backMenu";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [seotitle, setSeotitle] = useState("");
  const [seodescriptions, setSeodescriptions] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setLongDescription(editor.getHTML());
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`/api/products?id=${id}`),
          axios.get("/api/category"),
        ]);
        console.log("productRes.data[0]", productRes.data[0]);

        const product = productRes.data[0];
        setName(product.name?.ua || "");
        setShortDescription(product.shortDescription?.ua || "");
        setLongDescription(product.longDescription?.ua || "");
        setSeotitle(product.seotitle?.ua || "");
        setSeodescriptions(product.seodescriptions?.ua || "");
        setCategory(product.category || "");
        setImages(product.images || []);
        setPrice(product.price || "");

        setCharacteristics(product.characteristics || []);
        setCategories(categoryRes.data);
        setLoading(false);
        if (editor) {
          editor.commands.setContent(product.longDescription?.ua || "");
        }
      } catch (err) {
        console.error("Помилка завантаження:", err);
      }
    };

    if (id) fetchData();
  }, [id, editor]);

  // const handleImageUpload = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append("files", file));
  //   try {
  //     const res = await axios.post("/api/uploads", formData);
  //     setImages((prev) => [...prev, ...res.data.urls]);
  //   } catch (err) {
  //     console.error("Помилка завантаження фото:", err);
  //   }
  // };
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newUrls = [];

    setUploading(true);
    Swal.fire({
      title: "Завантаження фото...",
      text: "Зачекайте, поки фото завантажуються",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      for (const file of files) {
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        newUrls.push(downloadUrl);
      }
      setImages((prev) => [...prev, ...newUrls]);
    } catch (err) {
      console.error("❌ Firebase upload error:", err);
      Swal.fire("Помилка", "Не вдалося завантажити фото", "error");
    } finally {
      setUploading(false);
      Swal.close();
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: { ua: name },
      shortDescription: { ua: shortDescription },
      longDescription: { ua: longDescription },
      seotitle: { ua: seotitle },
      seodescriptions: { ua: seodescriptions },
      category,
      images,
      characteristics,
      price,
    };
    console.log("➡️ Payload перед відправкою:", payload);

    try {
      await axios.put(`/api/products?id=${id}`, payload);
      Swal.fire("Успіх", "Продукт оновлено", "success");
      router.push("/admin/products");
    } catch (err) {
      Swal.fire("Помилка", "Не вдалося оновити продукт", "error");
    }
  };

  if (loading) return <p>Завантаження...</p>;
  console.log("BASE_URL", BASE_URL);

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <form onSubmit={handleSubmit} className={styles.productForm}>
        <h1 className={styles.enterH1}>Редагувати продукт</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.productInput}
          placeholder="Назва"
        />
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className={styles.productTextarea}
          placeholder="Короткий опис"
        />
        <div className={styles.tiptapEditor}>
          {editor && <EditorContent editor={editor} />}
        </div>
        <input
          value={seotitle}
          onChange={(e) => setSeotitle(e.target.value)}
          className={styles.productInput}
          placeholder="SEO Title"
        />
        <textarea
          value={seodescriptions}
          onChange={(e) => setSeodescriptions(e.target.value)}
          className={styles.productTextarea}
          placeholder="SEO Description"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.productSelect}
        >
          <option value="">Оберіть категорію</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name.ua}
            </option>
          ))}
        </select>

        {/* Відображення зображень */}

        <div className={styles.imagePreviewWrap}>
          {images.map((img, index) => (
            <div key={index} className={styles.imageItem}>
              <Image
                src={img}
                alt={`img-${index}`}
                width={100}
                height={100}
                className={styles.previewImg}
              />
              <button type="button" onClick={() => removeImage(index)}>
                Видалити
              </button>
            </div>
          ))}
        </div>

        {/* Додавання нових зображень */}
        <input type="file" multiple onChange={handleImageUpload} />
        <input
          type="number"
          className={styles.productInput}
          placeholder="Ціна (грн)"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
          required
        />
        {/* Характеристики */}
        {characteristics.map((char, i) => (
          <div key={i} className={styles.characteristicRow}>
            <input
              value={char.name || ""}
              placeholder="Назва"
              onChange={(e) => {
                const updated = [...characteristics];
                updated[i].name = e.target.value;
                setCharacteristics(updated);
              }}
            />
            <input
              value={char.value || ""}
              placeholder="Значення"
              onChange={(e) => {
                const updated = [...characteristics];
                updated[i].value = e.target.value;
                setCharacteristics(updated);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setCharacteristics([...characteristics, { name: "", value: "" }])
          }
          className={styles.addButton}
        >
          Додати характеристику
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={uploading}
        >
          {uploading ? "Зачекайте..." : "Оновити продукт"}
        </button>
      </form>
    </div>
  );
}
