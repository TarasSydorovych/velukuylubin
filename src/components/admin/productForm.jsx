import { useState, useEffect } from "react";
import axios from "axios";
import css from "../admin.module.css";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function ProductForm({
  selectedProduct,
  fetchProducts,
  categories = [],
}) {
  const [formState, setFormState] = useState({
    name: { ua: "", en: "", ru: "", pl: "" },
    shortDescription: { ua: "", en: "", ru: "", pl: "" },
    longDescription: { ua: "", en: "", ru: "", pl: "" },
    seotitle: { ua: "", en: "", ru: "", pl: "" },
    seodescriptions: { ua: "", en: "", ru: "", pl: "" },
    images: [],
    videoUrl: "",
    model3dFile: null,
    category: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormState({
        ...selectedProduct,
        images: selectedProduct.images || [],
        model3dFile: selectedProduct.model3dFile || null,
      });
    }
  }, [selectedProduct]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = await Promise.all(
        formState.images.map(async (file) => {
          if (typeof file === "string") return file;
          return await handleFileUpload(file, "images");
        })
      );

      let model3dFileUrl = formState.model3dFile;
      if (formState.model3dFile instanceof File) {
        model3dFileUrl = await handleFileUpload(
          formState.model3dFile,
          "3dmodels"
        );
      }

      const updatedFormState = {
        ...formState,
        images: uploadedImages,
        model3dFile: model3dFileUrl,
      };

      if (selectedProduct) {
        await axios.put(
          `/api/products?id=${selectedProduct._id}`,
          updatedFormState
        );
        Swal.fire({
          icon: "success",
          title: "Продукт оновлено!",
          text: "Товар успішно оновлено.",
        });
      } else {
        await axios.post("/api/products", updatedFormState);
        Swal.fire({
          icon: "success",
          title: "Продукт додано!",
          text: "Новий продукт успішно доданий.",
        });
      }

      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час збереження продукту.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.productForm}>
      {/* Назва продукту, опис, SEO */}
      {/* Логіка для завантаження зображень та вибору категорії */}
      {/* Всі поля оформлені аналогічно до компоненту категорій */}
      <button type="submit" className={css.submitBtn}>
        {selectedProduct ? "Оновити продукт" : "Додати продукт"}
      </button>
    </form>
  );
}
