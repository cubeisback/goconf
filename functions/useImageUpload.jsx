import { useState, useRef } from "react";
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

    // Чтобы onChange срабатывал даже при выборе того же файла
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Файл успешно загружен:", response.data);

      const newImage = {
        id: response.data.id,
        url: response.data.url,
      };

      // Обновляем стейт (например, data.anons)
      setData((prev) => ({
        ...prev,
        [targetKey]: newImage,
      }));

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Файл успешно удален:", response);

      if (response.status === 200) {
        setData((prev) => ({
          ...prev,
          [targetKey]: {},
        }));
        setPreviewUrl(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Ошибка удаления изображения:", error);
    }
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
    handleButtonClick,
    file, // <- можешь проверять, выбран ли файл
  };
};
