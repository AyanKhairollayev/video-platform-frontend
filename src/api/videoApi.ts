import API from "./http";

export interface VideoPreviewDto {
  id: number;
  name: string;
  previewPhoto: string;
}

/**
 * Получить список превью видео
 */
export async function getVideoList(): Promise<VideoPreviewDto[]> {
  const { data } = await API.get<VideoPreviewDto[]>("/videos/list");
  return data;
}

/**
 * Загрузить новое видео с превью
 */
export async function uploadVideo(formData: FormData): Promise<void> {
  await API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

/**
 * Удалить видео по ID
 */
export async function deleteVideo(id: number): Promise<void> {
  await API.delete(`/videos/${id}`);
}