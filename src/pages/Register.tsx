import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const auth = useContext(AuthContext)!;
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    auth.register(form)
      .then(() => nav("/"))
      .catch(e => setError(e.response?.data || "Registration failed"));
  };

  return (
    <form onSubmit={handle} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Register</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
      
        type="text" placeholder="Username" required
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 caret-black
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.username}
        onChange={e => setForm({...form, username: e.target.value})}
      />
      <input
        type="email" placeholder="Email" required
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 caret-black
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
      />
      <input
        type="password" placeholder="Password" required
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500 caret-black
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.password}
        onChange={e => setForm({...form, password: e.target.value})}
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
    </form>
  );
}
