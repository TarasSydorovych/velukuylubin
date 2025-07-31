"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { storage } from "../../../../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import css from "../../../../components/admin/styles/addStyle.module.css";
import BackMenu from "../../../../components/admin/backMenu";

// Динамічний імпорт ReactQuill без SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Налаштування інструментів панелі
const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function EditWork() {
  const [workData, setWorkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`/api/works?id=${id}`);
        setWorkData(response.data.data);
        setSelectedPhotos(response.data.data.photos);
      } catch (error) {
        console.error("Помилка при отриманні роботи:", error);
      }
    };

    fetchWork();
  }, [id]);

  const handleInputChange = (e, lang, field) => {
    setWorkData((prevState) => ({
      ...prevState,
      translations: {
        ...prevState.translations,
        [lang]: {
          ...prevState.translations[lang],
          [field]: e.target.value,
        },
      },
    }));
  };

  const handleQuillChange = (value, lang) => {
    setWorkData((prevState) => ({
      ...prevState,
      translations: {
        ...prevState.translations,
        [lang]: {
          ...prevState.translations[lang],
          longDescription: value,
        },
      },
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const photoPreviews = files.map((file) => URL.createObjectURL(file));

    setSelectedPhotos((prevPhotos) => [...prevPhotos, ...photoPreviews]);
    setWorkData((prevWorkData) => ({
      ...prevWorkData,
      photos: [...prevWorkData.photos, ...files],
    }));
  };

  const uploadPhotos = async (files) => {
    const promises = files.map((file) => {
      const storageRef = ref(storage, `works/${file.name}`);
      return uploadBytes(storageRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      });
    });
    return Promise.all(promises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Оновлення...",
      text: "Будь ласка, зачекайте, оновлення триває",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const photoURLs = await uploadPhotos(
        workData.photos.filter((file) => file instanceof File)
      );

      const formData = {
        translations: workData.translations,
        videoId: workData.videoId,
        photos: [
          ...selectedPhotos.filter((photo) => typeof photo === "string"),
          ...photoURLs,
        ],
      };

      await axios.put(`/api/works?id=${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Успіх!",
        text: "Робота успішно оновлена!",
      });

      router.push("/admin/works");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка при оновленні роботи. Спробуйте ще раз.",
      });
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  if (!workData) {
    return <div>Завантаження...</div>;
  }
  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setWorkData((prevWorkData) => ({
      ...prevWorkData,
      photos: prevWorkData.photos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <h1 className={css.enterH1}>Редагувати роботу</h1>
        <form onSubmit={handleSubmit} className={css.productForm}>
          {["en", "pl", "ru", "ua"].map((lang) => (
            <div key={lang} className={css.formGroup}>
              <h2 className={css.productLabel}>
                {lang === "en"
                  ? "Англійська версія"
                  : lang === "pl"
                  ? "Польська версія"
                  : lang === "ru"
                  ? "Російська версія"
                  : "Українська версія"}
              </h2>
              <input
                type="text"
                placeholder={`Title (${lang.toUpperCase()})`}
                value={workData.translations[lang].title}
                onChange={(e) => handleInputChange(e, lang, "title")}
                required
                className={css.productInput}
              />
              <input
                type="text"
                placeholder={`SEO Title (${lang.toUpperCase()})`}
                value={workData.translations[lang].seotitle}
                onChange={(e) => handleInputChange(e, lang, "seotitle")}
                required
                className={css.productInput}
              />
              <input
                type="text"
                placeholder={`SEO Description (${lang.toUpperCase()})`}
                value={workData.translations[lang].seodescription}
                onChange={(e) => handleInputChange(e, lang, "seodescription")}
                required
                className={css.productInput}
              />
              <textarea
                placeholder={`Short Description (${lang.toUpperCase()})`}
                value={workData.translations[lang].shortDescription}
                onChange={(e) => handleInputChange(e, lang, "shortDescription")}
                required
                className={css.productTextarea}
              />
              <h3 className={css.productLabel}>
                Довгий опис ({lang.toUpperCase()})
              </h3>
              <ReactQuill
                className={css.productQuill}
                theme="snow"
                value={workData.translations[lang].longDescription}
                onChange={(value) => handleQuillChange(value, lang)}
                modules={modules}
              />
            </div>
          ))}

          <div className={css.formGroupFull}>
            <h2 className={css.productLabel}>Додаткові дані</h2>
            <input
              type="text"
              placeholder="Video ID"
              value={workData.videoId}
              onChange={(e) =>
                setWorkData({ ...workData, videoId: e.target.value })
              }
              required
              className={css.productInput}
            />

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
                    alt={`Selected ${index + 1}`}
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
            {loading ? "Оновлення..." : "Оновити роботу"}
          </button>
        </form>
      </div>
    </div>
  );
}
