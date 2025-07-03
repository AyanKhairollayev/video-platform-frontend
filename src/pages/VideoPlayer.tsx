// src/pages/VideoPlayer.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (id) {
      setSrc(`https://video-platform-backend.railway.internal/${id}`);
    }
  }, [id]);

  if (!src) {
    return <p className="text-center py-6">Выберите видео для воспроизведения...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <video
        src={src}
        controls
        autoPlay
        className="w-full rounded-lg shadow-lg bg-black"
      />
    </div>
  );
}
