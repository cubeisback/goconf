import { useState, useRef } from "react";
import axios from "axios";
import { getApiUrl } from "./functions";
//TODO сделать или переделать галерею
export const useGalleryUpload = ({ token, data, setData, targetKey = "gallery" }) => {
  const [previewUrls, setPreviewUrls] = useState([]); // превью локальные
  const [files, setFiles] = useState([]); // файлы ещё не загруженные
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    setFiles((prev) => [...prev, ...selectedFiles]);

    e.target.value = null;

    // обновляем локальный массив gallery с превью
    setData((prev) => ({
      ...prev,
      [targetKey]: [
        ...(prev[targetKey] || []),
        ...selectedFiles.map((file, i) => ({ file, preview: newPreviews[i] })),
      ],
    }));

    console.log("📸 gallery после выбора файлов:", [
      ...(data[targetKey] || []),
      ...selectedFiles.map((file, i) => ({ file, preview: newPreviews[i] })),
    ]);
  };

  const handleUploadImages = async () => {
    if (!files.length) return [];

    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          getApiUrl("/backend/wp-json/images/v2/upload"),
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        uploadedImages.push({ id: response.data.id, url: response.data.url });
      } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
      }
    }

    if (uploadedImages.length) {
      setData((prev) => ({
        ...prev,
        [targetKey]: [
          ...(prev[targetKey] || []).filter((img) => !img.file), // удаляем локальные до загрузки
          ...uploadedImages,
        ],
      }));

      setFiles([]);
      setPreviewUrls([]);
      console.log("📸 gallery после загрузки на сервер:", [
        ...(data[targetKey] || []).filter((img) => !img.file),
        ...uploadedImages,
      ]);
    }

    return uploadedImages;
  };

  const handleRemoveImage = (indexOrId) => {
    setData((prev) => ({
      ...prev,
      [targetKey]: prev[targetKey].filter((img) =>
        img.id ? img.id !== indexOrId : img.preview !== indexOrId
      ),
    }));

    setPreviewUrls((prev) => prev.filter((p) => p !== indexOrId));
    setFiles((prev) => prev.filter((f) => URL.createObjectURL(f) !== indexOrId));
  };

  const handleButtonClick = () => inputRef.current?.click();

  return {
    previewUrls,
    inputRef,
    handleFileChange,
    handleUploadImages,
    handleRemoveImage,
    handleButtonClick,
    files,
  };
};
