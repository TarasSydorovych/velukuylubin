// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import css from "../admin.module.css";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "list",
//   "bullet",
//   "link",
//   "image",
// ];

// export default function CategoryForm({
//   selectedCategory,
//   fetchCategories,
//   clearSelection,
//   categories = [],
// }) {
//   const [formState, setFormState] = useState({
//     name: { ua: "" },
//     parent: "",
//     properties: [],
//     shorttitle: { ua: "" },
//     longdesc: { ua: "" },
//     seotitle: { ua: "" },
//     ceodescriptions: { ua: "" },
//   });

//   useEffect(() => {
//     if (selectedCategory) {
//       setFormState({
//         name: selectedCategory.name || { ua: "" },
//         parent: selectedCategory.parent?._id || "",
//         properties: selectedCategory.properties || [],
//         shorttitle: selectedCategory.shorttitle || { ua: "" },
//         longdesc: selectedCategory.longdesc || { ua: "" },
//         seotitle: selectedCategory.seotitle || { ua: "" },
//         ceodescriptions: selectedCategory.ceodescriptions || { ua: "" },
//       });
//     }
//   }, [selectedCategory]);

//   const resetForm = () => {
//     setFormState({
//       name: { ua: "" },
//       parent: "",
//       properties: [],
//       shorttitle: { ua: "" },
//       longdesc: { ua: "" },
//       seotitle: { ua: "" },
//       ceodescriptions: { ua: "" },
//     });
//   };

//   const handleLongDescChange = useCallback(
//     (value) => {
//       if (formState.longdesc.ua !== value) {
//         setFormState((prev) => ({
//           ...prev,
//           longdesc: { ua: value },
//         }));
//       }
//     },
//     [formState.longdesc.ua]
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedCategory) {
//         await axios.put(`/api/category?id=${selectedCategory._id}`, formState);
//         Swal.fire({ icon: "success", title: "Категорія оновлена!" });
//       } else {
//         await axios.post("/api/category", formState);
//         Swal.fire({ icon: "success", title: "Категорія додана!" });
//       }
//       fetchCategories();
//       resetForm();
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: `Сталася помилка: ${error.message || error.toString()}`,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={css.formWrapCat}>
//       {/* Назва категорії */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Назва категорії (UA)</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.name.ua}
//           onChange={(e) =>
//             setFormState({ ...formState, name: { ua: e.target.value } })
//           }
//           required
//         />
//       </div>

//       {/* Батьківська категорія */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Батьківська категорія</label>
//         <select
//           className={css.inputInCate}
//           value={formState.parent}
//           onChange={(e) =>
//             setFormState({ ...formState, parent: e.target.value })
//           }
//         >
//           <option value="">Без батьківської категорії</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name.ua}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Довгий опис */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Довгий опис (UA)</label>
//         <ReactQuill
//           className={css.reacrQilrddf}
//           theme="snow"
//           value={formState.longdesc.ua}
//           onChange={handleLongDescChange}
//           modules={modules}
//           formats={formats}
//         />
//       </div>

//       {/* Короткий заголовок */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Короткий заголовок (UA)</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.shorttitle.ua}
//           onChange={(e) =>
//             setFormState({
//               ...formState,
//               shorttitle: { ua: e.target.value },
//             })
//           }
//         />
//       </div>

//       {/* SEO title */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>SEO заголовок (UA)</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.seotitle.ua}
//           onChange={(e) =>
//             setFormState({
//               ...formState,
//               seotitle: { ua: e.target.value },
//             })
//           }
//         />
//       </div>

//       {/* SEO description */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>SEO опис (UA)</label>
//         <textarea
//           className={css.textAreaInCate}
//           value={formState.ceodescriptions.ua}
//           onChange={(e) =>
//             setFormState({
//               ...formState,
//               ceodescriptions: { ua: e.target.value },
//             })
//           }
//         />
//       </div>

//       <button type="submit" className={css.submitBtn}>
//         {selectedCategory ? "Оновити категорію" : "Додати категорію"}
//       </button>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import css from "../admin.module.css";
import Swal from "sweetalert2";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Toolbar from "../../admin/Toolbar";

export default function CategoryForm({
  selectedCategory,
  fetchCategories,
  clearSelection,
  categories = [],
}) {
  const [formState, setFormState] = useState({
    name: { ua: "" },
    parent: "",
    properties: [],
    shorttitle: { ua: "" },
    longdesc: { ua: "" },
    seotitle: { ua: "" },
    ceodescriptions: { ua: "" },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      Paragraph,
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: formState.longdesc.ua,
    onUpdate: ({ editor }) => {
      setFormState((prev) => ({ ...prev, longdesc: { ua: editor.getHTML() } }));
    },
  });

  useEffect(() => {
    if (editor && selectedCategory?.longdesc?.ua) {
      editor.commands.setContent(selectedCategory.longdesc.ua);
    }
  }, [editor, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setFormState({
        name: selectedCategory.name || { ua: "" },
        parent: selectedCategory.parent?._id || "",
        properties: selectedCategory.properties || [],
        shorttitle: selectedCategory.shorttitle || { ua: "" },
        longdesc: selectedCategory.longdesc || { ua: "" },
        seotitle: selectedCategory.seotitle || { ua: "" },
        ceodescriptions: selectedCategory.ceodescriptions || { ua: "" },
      });
    }
  }, [selectedCategory]);

  const resetForm = () => {
    setFormState({
      name: { ua: "" },
      parent: "",
      properties: [],
      shorttitle: { ua: "" },
      longdesc: { ua: "" },
      seotitle: { ua: "" },
      ceodescriptions: { ua: "" },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await axios.put(`/api/category?id=${selectedCategory._id}`, formState);
        Swal.fire({ icon: "success", title: "Категорія оновлена!" });
      } else {
        await axios.post("/api/category", formState);
        Swal.fire({ icon: "success", title: "Категорія додана!" });
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: `Сталася помилка: ${error.message || error.toString()}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formWrapCat}>
      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Назва категорії (UA)</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.name.ua}
          onChange={(e) =>
            setFormState({ ...formState, name: { ua: e.target.value } })
          }
          required
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Батьківська категорія</label>
        <select
          className={css.inputInCate}
          value={formState.parent}
          onChange={(e) =>
            setFormState({ ...formState, parent: e.target.value })
          }
        >
          <option value="">Без батьківської категорії</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name.ua}
            </option>
          ))}
        </select>
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Довгий опис (UA)</label>
        <div className={css.tiptapEditor}>
          {editor && (
            <>
              <Toolbar editor={editor} />
              <EditorContent editor={editor} />
            </>
          )}
        </div>
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Короткий заголовок (UA)</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.shorttitle.ua}
          onChange={(e) =>
            setFormState({
              ...formState,
              shorttitle: { ua: e.target.value },
            })
          }
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>SEO заголовок (UA)</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.seotitle.ua}
          onChange={(e) =>
            setFormState({
              ...formState,
              seotitle: { ua: e.target.value },
            })
          }
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>SEO опис (UA)</label>
        <textarea
          className={css.textAreaInCate}
          value={formState.ceodescriptions.ua}
          onChange={(e) =>
            setFormState({
              ...formState,
              ceodescriptions: { ua: e.target.value },
            })
          }
        />
      </div>

      <button type="submit" className={css.submitBtn}>
        {selectedCategory ? "Оновити категорію" : "Додати категорію"}
      </button>
    </form>
  );
}
