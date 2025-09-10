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
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageUrl);
    setFile(selectedFile);

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

      const newImage = { id: response.data.id, url: response.data.url };

      setData((prev) => ({
        ...prev,
        [targetKey]: newImage,
      }));

      setPreviewUrl(null);
      setFile(null);

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

  // ❗ Новый метод: удаление только превью (без запроса)
  const handleRemovePreview = () => {
    setPreviewUrl(null);
    setFile(null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return {
    previewUrl,
    inputRef,
    handleFileChange,
    handleUploadImage,
    handleRemoveImage,
    handleRemovePreview, // экспортируем
    handleButtonClick,
    file,
  };
};
