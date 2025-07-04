// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoUpload from "./components/VideoUpload";
import VideoList from "./pages/VideoList";
import VideoPlayer from "./pages/VideoPlayer";
import { FiVideo } from "react-icons/fi";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="w-full bg-white shadow-md">
          <nav className="max-w-6xl mx-auto flex justify-between p-4">
            <div className="max-w-6xl mx-auto py-4 px-6 flex items-center">
                        <Link to="/" className="flex items-center">
                            <FiVideo className="text-3xl text-blue-600 mr-2" />
                            <h1 className="text-2xl font-bold text-gray-800">Video Platform</h1>
                        </Link>
                    </div>
            <div className="space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </nav>
        </header>

        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            <Route
                            path="/"
                            element={
                                <>
                                    <VideoUpload />
                                    <VideoList />
                                </>
                            }
                        />
                        <Route path="/watch/:id" element={<VideoPlayer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
