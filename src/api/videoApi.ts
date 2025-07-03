import axios from "axios";

const api = axios.create({
  baseURL: "http://video-platform-backend-production.up.railway.app",
});

export interface VideoPreviewDto {
  id: number;
  name: string;
  previewPhoto: string;
}

// async функция всегда возвращает нативный Promise<T>
export async function getVideoList(): Promise<VideoPreviewDto[]> {
  const response = await api.get<VideoPreviewDto[]>("/videos/list");
  return response.data;
}

// …уже есть import axios…
export async function uploadVideo(formData: FormData) {
  // если backend на другом порту – убедитесь, что включен CORS
  return axios.post("/videos/upload", formData, {
    baseURL: "http://video-platform-backend-production.up.railway.app",
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteVideo(id: number): Promise<void> {
  await api.delete(`/videos/${id}`);
}
