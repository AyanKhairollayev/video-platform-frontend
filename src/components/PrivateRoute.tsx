import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("PrivateRoute must be used within AuthProvider");
  return auth.token ? <>{children}</> : <Navigate to="/login" replace />;
}
