// src/App.tsx

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FiVideo } from "react-icons/fi";
import VideoUpload from "./components/VideoUpload";
import VideoList from "./pages/VideoList";
import VideoPlayer from "./pages/VideoPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gray-100">
        <header className="w-full bg-white shadow-md">
          <div className="max-w-6xl mx-auto py-4 px-6 flex items-center">
            <Link to="/" className="flex items-center">
              <FiVideo className="text-3xl text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">Video Platform</h1>
            </Link>
          </div>
        </header>

        <main className="w-full p-6 space-y-8 max-w-6xl mx-auto">
          <Routes>
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
      </div>
    </BrowserRouter>
  );
}
