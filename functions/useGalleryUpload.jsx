import { useState, useRef } from "react";
import axios from "axios";
import { getApiUrl } from "./functions";

export const useMultiImageUpload = ({
  token,
  data,
  setData,
  targetKey = "gallery",
  maxCount = 9,
}) => {
  const inputRef = useRef(null);
  const replaceInputRef = useRef(null);

  const [previews, setPreviews] = useState([]);           // новые превью
  const [files, setFiles] = useState([]);                // новые файлы
  const [replaceIndex, setReplaceIndex] = useState(null); 
  const [replaceFiles, setReplaceFiles] = useState({});  
  const [replacePreviews, setReplacePreviews] = useState({});  

  // вспомогательная функция для размера
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  // проверка формата
  const isValidFile = (file) => {
    const validTypes = ["image/png", "image/jpeg"];
    return validTypes.includes(file.type);
  };

  // добавление новых файлов
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []).filter(isValidFile);
    if (!selectedFiles.length) return;

    const newFiles = [...files, ...selectedFiles].slice(0, maxCount);
    setFiles(newFiles);
    setPreviews(newFiles.map((f) => ({
      url: URL.createObjectURL(f),
      size: formatSize(f.size),
    })));

    e.target.value = null;
  };

  // выбор файла для замены
  const handleReplaceChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || replaceIndex === null || !isValidFile(file)) return;

    setReplaceFiles((prev) => ({ ...prev, [replaceIndex]: file }));
    setReplacePreviews((prev) => ({
      ...prev,
      [replaceIndex]: { url: URL.createObjectURL(file), size: formatSize(file.size) },
    }));

    setReplaceIndex(null);
    e.target.value = null;
  };

  // загрузка новых картинок
  const handleUploadImages = async () => {
    if (!files.length) return [];

    const uploaded = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        getApiUrl("/backend/wp-json/images/v2/upload"),
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      uploaded.push({ id: response.data.id, url: response.data.url, size: formatSize(file.size) });
    }

    setData((prev) => ({
      ...prev,
      [targetKey]: [...(prev[targetKey] || []), ...uploaded].slice(0, maxCount),
    }));

    setFiles([]);
    setPreviews([]);
    return uploaded;
  };

  // загрузка замен
  const handleUploadReplacements = async () => {
    const updatedGallery = [...(data[targetKey] || [])];

    for (const [indexStr, file] of Object.entries(replaceFiles)) {
      const index = parseInt(indexStr, 10);
      const oldImage = updatedGallery[index];

      try {
        // удалить старое
        if (oldImage?.id) {
          await axios.get(
            getApiUrl(`/backend/wp-json/images/v2/delete?id=${oldImage.id}`),
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        // загрузка нового
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          getApiUrl("/backend/wp-json/images/v2/upload"),
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        updatedGallery[index] = { id: response.data.id, url: response.data.url, size: formatSize(file.size) };
      } catch (err) {
        console.error("Ошибка замены:", err);
      }
    }

    setData((prev) => ({
      ...prev,
      [targetKey]: updatedGallery,
    }));

    setReplaceFiles({});
    setReplacePreviews({});
    return updatedGallery;
  };

  const handleRemoveTemp = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = async (id) => {
    try {
      await axios.get(
        getApiUrl(`/backend/wp-json/images/v2/delete?id=${id}`),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData((prev) => ({
        ...prev,
        [targetKey]: prev[targetKey].filter((img) => img.id !== id),
      }));
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const handleButtonClick = () => inputRef.current?.click();
  const startReplace = (index) => {
    setReplaceIndex(index);
    replaceInputRef.current?.click();
  };

  return {
    inputRef,
    replaceInputRef,
    previews,
    replacePreviews,
    handleFileChange,
    handleReplaceChange,
    handleUploadImages,
    handleUploadReplacements,
    handleRemoveImage,
    handleRemoveTemp,
    handleButtonClick,
    startReplace,
    files,
    replaceFiles,
  };
};
