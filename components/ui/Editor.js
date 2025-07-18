"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";

export default function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      transformPastedHTML(html) {
        // Удаляем все ссылки <a> из вставленного HTML
        return html.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1");
      },
      attributes: {
        spellcheck: "true",
        autocapitalize: "sentences",
        autocomplete: "off",
        autocorrect: "off",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {/* Панель инструментов */}
		<div className="texteditor_panel" style={{ 
			userSelect: "none",
			borderRadius: '28px 28px 0px 0px',
			border: '2px solid #FFF',
			background: '#F5F7FA',
			padding: '16px 24px',
			display: 'flex',
			gap: 16,
		}}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().toggleBold()}
          style={{ fontWeight: editor.isActive("bold") ? "bold" : "normal" }}
          title="Жирный (Ctrl+B)"
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().toggleItalic()}
          style={{ fontStyle: editor.isActive("italic") ? "italic" : "normal" }}
          title="Курсив (Ctrl+I)"
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().toggleUnderline()}
          style={{
            textDecoration: editor.isActive("underline") ? "underline" : "none",
          }}
          title="Подчеркнутый (Ctrl+U)"
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().toggleStrike()}
          style={{
            textDecoration: editor.isActive("strike") ? "line-through" : "none",
          }}
          title="Зачеркнутый"
        >
          S
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().toggleCode()}
          style={{
            fontFamily: editor.isActive("code") ? "monospace" : "inherit",
          }}
          title="Код"
        >
          {"</>"}
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Цитата"
          style={{
            backgroundColor: editor.isActive("blockquote") ? "#ddd" : "transparent",
          }}
        >
          ❝ ❞
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Маркированный список"
          style={{
            backgroundColor: editor.isActive("bulletList") ? "#ddd" : "transparent",
          }}
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Нумерованный список"
          style={{
            backgroundColor: editor.isActive("orderedList") ? "#ddd" : "transparent",
          }}
        >
          1. List
        </button>

        {/* <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Параграф"
          style={{
            backgroundColor: editor.isActive("paragraph") ? "#ddd" : "transparent",
          }}
        >
          ¶
        </button> */}

        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            title={`Заголовок H${level}`}
            style={{
              backgroundColor: editor.isActive("heading", { level })
                ? "#ddd"
                : "transparent",
            }}
          >
            H{level}
          </button>
        ))}

        {["left", "center", "right", "justify"].map((alignment) => (
          <button
            key={alignment}
            onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
            title={`Выравнивание: ${alignment}`}
            style={{
              backgroundColor: editor.isActive({ textAlign: alignment })
                ? "#ddd"
                : "transparent",
            }}
          >
            {alignment[0].toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          title="Очистить форматирование"
        >
          ✖
        </button>
      </div>

      {/* Редактор */}
      <div
	  	className="texteditor_main"
        style={{
			background: '#fff',
			borderRadius: '0 0 28px 28px',
			padding: 14,
			fontSize: 16,
			lineHeight: 1.5,
			overflowY: "auto",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
