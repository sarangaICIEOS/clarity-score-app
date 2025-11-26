// components/auth/ResetPasswordForm.tsx
import { useState } from "react";
import { Eye, EyeOff, Loader, AlertCircle } from "lucide-react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      setSuccess("Password reset link sent to your email.");
    }
    catch (err) {
      const message = err instanceof Error ? err.message : "Request failed";
      setError(message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center text-red-600 bg-red-100 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center text-green-600 bg-green-100 p-3 rounded-lg">
          <span>{success}</span>
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-3 border
            border-gray-300 dark:border-gray-600 rounded-lg 
            bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white                   
            placeholder-gray-500 dark:placeholder-gray-400                  
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-lg font-semibold text-white 
          bg-gradient-to-r from-blue-600 to-blue-700 
          hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader className="w-5 h-5 mx-auto animate-spin" /> : "Send Reset Link"}
      </button>
    </form>
  );
}