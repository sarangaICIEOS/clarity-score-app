"use client";

import { useState } from "react";
import { LogIn, AlertCircle, Loader } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowErrorPopup(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show popup if login fails
        setError(data.error || "Invalid username or password");
        setShowErrorPopup(true);
        return;
      }

      // Login successful → navigate to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Login failed");
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Error popup */}
      {showErrorPopup && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button
            className="ml-auto text-red-700 font-bold"
            onClick={() => setShowErrorPopup(false)}
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow-md">
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center`}
        >
          {loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
          Sign In
        </button>
      </form>
    </div>
  );
}
