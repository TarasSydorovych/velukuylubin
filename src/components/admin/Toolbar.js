"use client";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <b>Bold</b>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i>Italic</i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        P
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Список
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. Список
      </button>
    </div>
  );
}
