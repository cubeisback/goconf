"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import Bold from "@/public/images/svg/bold_icon.svg";
import Italic from "@/public/images/svg/italic_icon.svg";
import Under from "@/public/images/svg/underline_icon.svg";
import ListBullets from "@/public/images/svg/list_bullets_icon.svg";
import ListNumbers from "@/public/images/svg/list_numbers_icon.svg";
import Header from "@/public/images/svg/header_icon.svg";

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

  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

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
			gap: 8,
		}}>
        <button
          	onClick={() => editor.chain().focus().toggleBold().run()}
          	disabled={!editor.can().toggleBold()}
			style={{ 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				border: '1px solid #f5f7fa', 
				borderColor: editor.isActive("bold") ? "#191921" : "#f5f7fa" 
			}}
          title="Жирный (Ctrl+B)"
        >
          <Bold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().toggleItalic()}
          style={{ display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				border: '1px solid #f5f7fa', 
				borderColor: editor.isActive("italic") ? "#191921" : "#f5f7fa" 
			}}
          title="Курсив (Ctrl+I)"
        >
          <Italic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().toggleUnderline()}
          style={{
			display: 'flex',
			alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				border: '1px solid #f5f7fa', 
				borderColor: editor.isActive("underline") ? "#191921" : "#f5f7fa" 
          }}
          title="Подчеркнутый (Ctrl+U)"
        >
          <Under />
        </button>

        {/* <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().toggleStrike()}
          style={{
            textDecoration: editor.isActive("strike") ? "line-through" : "none",
          }}
          title="Зачеркнутый"
        >
          S
        </button> */}

        {/* <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().toggleCode()}
          style={{
            fontFamily: editor.isActive("code") ? "monospace" : "inherit",
          }}
          title="Код"
        >
          {"</>"}
        </button> */}

        {/* <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Цитата"
          style={{
            backgroundColor: editor.isActive("blockquote") ? "#ddd" : "transparent",
          }}
        >
          ❝ ❞
        </button> */}

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Маркированный список"
          style={{
			display: 'flex',
			alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				border: '1px solid #f5f7fa', 
				borderColor: editor.isActive("bulletList") ? "#191921" : "#f5f7fa" 
          }}
        >
          <ListBullets />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Нумерованный список"
          style={{
			display: 'flex',
			alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				border: '1px solid #f5f7fa', 
				borderColor: editor.isActive("orderedList") ? "#191921" : "#f5f7fa" 
          }}
        >
          <ListNumbers />
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

		<div style={{
			position: 'relative',
			alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
				}}>
			{/* <Header /> */}
			<div style={{
				// position: 'absolute', 
				// padding: 16,
				display: 'flex',
				gap: 8
				}}>
				{[1, 2, 3, 4, 5, 6].map((level) => (
					
				<button
					key={level}
					onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
					title={`Заголовок H${level}`}
					style={{
					fontWeight: editor.isActive("heading", { level })
						? "bold"
						: "normal",
					}}
				>
					H{level}
				</button>
				
				))}
			</div>
		</div>

        {/* {["left", "center", "right", "justify"].map((alignment) => (
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
        ))} */}

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          title="Очистить форматирование"
		  style={{
			alignItems: 'center', 
				justifyContent: 'center', 
				padding: 3, 
				borderRadius: 6, 
		  }}
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
			padding: 16,
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
