"use client"

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { css } from '@emotion/css';

const EditorComponent = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      console.log('Initializing EditorJS...');

      editorInstance.current = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Введите заголовок...',
            },
            toolbox: {
              title: 'Заголовок'
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              placeholder: 'Введите список...',
            },
            // toolbox: {
            //   title: 'Заголовок'
            // }
          },
        },
        // Ручная локализация для кнопок
        
        i18n: {
          toolNames: {
            header: 'Заголовок',
            list: 'Список',
          },
          
          // Перевод кнопки "Add"
          addButton: 'Добавить',
          undo: 'Отмена',
          redo: 'Повторить',

          messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            ui: {
              "blockTunes": {
                "toggler": {
                  "Click to tune": "Нажмите, чтобы настроить",
                  "or drag to move": "или перетащите"
                },
              },
              "inlineToolbar": {
                "converter": {
                  "Convert to": "Конвертировать в"
                }
              },
              "toolbar": {
                "toolbox": {
                  "Add": "Добавить"
                }
              }
            },
        
            /**
             * Section for translation Tool Names: both block and inline tools
             */
            toolNames: {
              "Text": "Параграф",
              "Heading": "Заголовок",
              "List": "Список",
              "Warning": "Примечание",
              "Unordered List": "Ненумерованный список",
              "Ordered List": "Нумерованный список",
              "Filter": "2",
              "Checklist": "Чеклист",
              "Quote": "Цитата",
              "Code": "Код",
              "Delimiter": "Разделитель",
              "Raw HTML": "HTML-фрагмент",
              "Table": "Таблица",
              "Link": "Ссылка",
              "Marker": "Маркер",
              "Bold": "Полужирный",
              "Italic": "Курсив",
              "InlineCode": "Моноширинный",
            },
        
            /**
             * Section for passing translations to the external tools classes
             */
            tools: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
               * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
               */
              "warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "Название",
                "Message": "Сообщение",
              },
        
              /**
               * Link is the internal Inline Tool
               */
              "link": {
                "Add a link": "Вставьте ссылку"
              },
              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              "stub": {
                'The block can not be displayed correctly.': 'Блок не может быть отображен'
              }
            },
        
            /**
             * Section allows to translate Block Tunes
             */
            blockTunes: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
               * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
               *
               * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
               */
              "delete": {
                "Delete": "Удалить"
              },
              "moveUp": {
                "Move up": "Переместить вверх"
              },
              "moveDown": {
                "Move down": "Переместить вниз"
              },
              
            },
          }
        },
      });

      
      console.log('EditorJS initialized', editorInstance.current);
      
      // return () => {
      //   if (editorInstance.current) {
      //     console.log('Destroying EditorJS...');
      //     if (typeof editorInstance.current.destroy === 'function') {
      //       editorInstance.current.destroy().then(() => {
      //         console.log('EditorJS destroyed');
      //         editorInstance.current = null;
      //       }).catch((error) => {
      //         console.error('Error destroying EditorJS:', error);
      //       });
      //     } else {
      //       console.error('EditorJS does not have a destroy method');
      //     }
      //   }
      // };
    }
  }, []);

//   // Функция для преобразования данных в HTML
// const convertToHTML = (editorData) => {
//   let htmlContent = '';

//   editorData.blocks.forEach(block => {
//     switch (block.type) {
//       case 'header':
//         htmlContent += `<h1>${block.data.text}</h1>`;
//         break;
//       case 'list':
//         htmlContent += `<ul>`;
//         console.log(block.data.items)
//         block.data.items.forEach(item => {
//           htmlContent += `<li>${item.content}</li>`;
//         });
//         htmlContent += `</ul>`;
//         break;
//       // Пример для текстового блока (по умолчанию)
//       case 'paragraph':
//         htmlContent += `<p>${block.data.text}</p>`;
//         break;
//       // Пример для блока с изображением (если такой тип блоков используется)
//       case 'image':
//         htmlContent += `<img src="${block.data.file.url}" alt="${block.data.caption || ''}" />`;
//         break;
//       // Пример для цитаты
//       case 'quote':
//         htmlContent += `<blockquote>${block.data.text}</blockquote>`;
//         break;
//       // Для любых других типов, которые не были указаны, добавляем как обычный текст
//       default:
//         htmlContent += `<p>${block.data.text || ''}</p>`;  // Если у блока нет текста, он просто пропустится
//         break;
//     }
//   });

//   return htmlContent;
// };

//   const [previewHtml, setPreviewHtml] = useState(null)
//   // Функция для сохранения данных в базу
//   const saveData = async () => {
//     try {
//       const savedData = await editorInstance.current.save();
//       const htmlContent = convertToHTML(savedData);

//       // Сохраните htmlContent в базу данных через API или другие средства
//       console.log('HTML content:', htmlContent);
//       setPreviewHtml(htmlContent)

//       // Здесь отправьте htmlContent в базу данных
//     } catch (error) {
//       console.error('Error saving EditorJS data:', error);
//     }
//   };

  return (
      <div ref={editorRef} className={css`
        height: 376px;
        background-color: #fff;
        border-radius: 28px;
        margin-bottom: 64px;
        // overflow-y: auto;
        // padding: 32px;

        // .ce-block__content {
        //   width: 100%;
        //   max-width: 100%;
        // }

        .ce-toolbar__settings-btn {
          display: none;
        }
      `}>
        {/* <button onClick={saveData}>Предпросмотр</button>

        <div
            dangerouslySetInnerHTML={{ __html: previewHtml }}
            style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}
          /> */}
      </div>
  );
};

export default EditorComponent;


