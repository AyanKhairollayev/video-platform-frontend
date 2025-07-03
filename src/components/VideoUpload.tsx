// src/components/VideoUpload.tsx
import { useState } from "react";
import { FiUpload, FiVideo, FiImage } from "react-icons/fi";
import { uploadVideo } from "../api/videoApi";

export default function VideoUpload() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !preview) return alert("Выберите видео и превью");
    const form = new FormData();
    form.append("file", file);
    form.append("previewPhoto", preview);
    form.append("name", name);

    try {
      await uploadVideo(form);
      alert("Видео успешно загружено!");
      setName("");
      setFile(null);
      setPreview(null);
    } catch {
      alert("Ошибка загрузки");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      {/* Название видео */}
      <div className="col-span-full">
        <label className="block text-gray-700 mb-1">Название видео</label>
        <input
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 caret-black
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название"
          required
        />
      </div>

      {/* Видео-файл */}
      <div className="flex flex-col">
        <label
          htmlFor="file"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-medium 
                     px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
        >
          <FiVideo className="mr-2" /> Выберите видео
        </label>
        <input
          id="file"
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="hidden"
        />
        {/* Имя выбранного файла */}
        <span
          className={`mt-2 text-sm ${
            file ? "text-green-600" : "text-gray-500"
          }`}
        >
          {file ? file.name : "Файл не выбран"}
        </span>
      </div>

      {/* Превью-изображение */}
      <div className="flex flex-col">
        <label
          htmlFor="preview"
          className="inline-flex items-center justify-center bg-green-600 text-white font-medium 
                     px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors"
        >
          <FiImage className="mr-2" /> Выберите превью
        </label>
        <input
          id="preview"
          type="file"
          accept="image/*"
          onChange={(e) => setPreview(e.target.files?.[0] || null)}
          required
          className="hidden"
        />
        {/* Имя выбранного превью */}
        <span
          className={`mt-2 text-sm ${
            preview ? "text-green-600" : "text-gray-500"
          }`}
        >
          {preview ? preview.name : "Превью не выбрано"}
        </span>
      </div>

      {/* Кнопка загрузки */}
      <button
        type="submit"
        className="col-span-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 
                   hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5"
      >
        <FiUpload className="mr-2" /> Загрузить
      </button>
    </form>
  );
}
