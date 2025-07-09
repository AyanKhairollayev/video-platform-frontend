import { createContext, useState, useEffect, type ReactNode } from "react";
import { register as apiRegister, login as apiLogin, type RegisterDto, type LoginDto } from "../api/authApi";

export type AuthContextType = {
  token: string | null;
  username: string | null;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem("username"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  }, [username]);

  const login = async (dto: LoginDto) => {
    const t = await apiLogin(dto);
    setToken(t);
    setUsername(dto.username);
  };

  const register = async (dto: RegisterDto) => {
    await apiRegister(dto);
    await login({ username: dto.username, password: dto.password });
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
