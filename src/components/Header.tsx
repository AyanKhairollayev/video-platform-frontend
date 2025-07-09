import { Link } from "react-router-dom";
import { FiVideo } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Header must be used within AuthProvider");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <FiVideo className="text-3xl text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Video Platform</h1>
        </Link>
        <div className="space-x-4">
          {auth.token ? (
            <button
              onClick={auth.logout}
              className="text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
