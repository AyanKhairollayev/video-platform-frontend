// src/pages/VideoList.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideoList, deleteVideo, type VideoPreviewDto } from "../api/videoApi";
import { FiTrash2 } from "react-icons/fi";

export default function VideoList() {
  const [videos, setVideos] = useState<VideoPreviewDto[] | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const list = await getVideoList();
      setVideos(list);
    } catch (err) {
      console.error("Error loading videos:", err);
      setVideos([]);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Удалить это видео?")) return;
    try {
      await deleteVideo(id);
      setVideos((prev) => prev?.filter((v) => v.id !== id) ?? null);
    } catch (err) {
      console.error("Error deleting video:", err);
      alert("Не удалось удалить видео");
    }
  };

  if (videos === null) {
    return <p className="text-center py-6">Загрузка видео…</p>;
  }

  if (videos.length === 0) {
    return <p className="text-center py-6">Видео отсутствуют.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((v) => (
        <div
          key={v.id}
          className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          {/* Кнопка удаления */}
          <button
            onClick={(e) => handleDelete(v.id, e)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white bg-opacity-75 rounded-full p-1 z-10"
            aria-label="Удалить видео"
          >
            <FiTrash2 size={18} />
          </button>

          {/* Ссылка на страницу плеера */}
          <Link to={`/watch/${v.id}`}>
            <img
              src={`https://video-platform-backend.railway.internal${v.previewPhoto}`}
              alt={v.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">{v.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
