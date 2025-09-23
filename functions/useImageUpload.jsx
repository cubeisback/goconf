import { useRef, useState } from "react";
import axios from "axios";
import { getApiUrl } from "./functions";

export const useImageUpload = ({
  token,
  data,
  setData,
  targetKey = "",
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [previewSize, setPreviewSize] = useState(null); // 👉 размер локального файла
  const inputRef = useRef(null);

  // формат размера
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageUrl);
    setFile(selectedFile);
    setPreviewSize(formatSize(selectedFile.size)); // 👉 сохраняем размер

    e.target.value = null;
  };

  const handleUploadImage = async () => {
    if (!file) return null;

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

      const newImage = { 
        id: response.data.id, 
        url: response.data.url, 
        size: formatSize(file.size) // 👉 записываем размер в объект
      };

      setData((prev) => ({
        ...prev,
        [targetKey]: newImage,
      }));

      setPreviewUrl(null);
      setFile(null);
      setPreviewSize(null);

      return newImage;
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      return null;
    }
  };

  const handleRemoveImage = async (id) => {
    if (!id) return;

    try {
      const response = await axios.get(
        getApiUrl(`/backend/wp-json/images/v2/delete?id=${id}`),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setData((prev) => ({ ...prev, [targetKey]: {} }));
      }
    } catch (error) {
      console.error("Ошибка удаления изображения:", error);
    }
  };

  // удалить только превью (без запроса)
  const handleRemovePreview = () => {
    setPreviewUrl(null);
    setFile(null);
    setPreviewSize(null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return {
    previewUrl,
    previewSize, // 👉 экспортируем размер превью
    inputRef,
    handleFileChange,
    handleUploadImage,
    handleRemoveImage,
    handleRemovePreview,
    handleButtonClick,
    file,
  };
};
