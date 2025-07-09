import axios from "axios";

const auth = axios.create({
  baseURL: "https://video-platform-backend-production.up.railway.app",    // ← ваш Spring Boot
  headers: { "Content-Type": "application/json" },
});


export interface RegisterDto { username: string; email: string; password: string; }
export interface LoginDto { username: string; password: string; }

export async function register(dto: RegisterDto) {
  return auth.post("/auth/registration", dto);
}

export async function login(dto: LoginDto): Promise<string> {
  const { data } = await auth.post<string>("/auth/login", dto);
  return data;
}
