"use client";

import { useState } from "react";
import { LogIn, AlertCircle, Eye, EyeOff, Loader } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const role =
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("role")
      : null) || "developer";

  const getRoleColor = (r: string) => {
    const colors: Record<string, string> = {
      admin: "from-purple-600 to-purple-700",
      developer: "from-blue-600 to-blue-700",
      reporter: "from-emerald-600 to-emerald-700",
      ba: "from-amber-600 to-amber-700",
    };
    return colors[r] || colors.developer;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      console.log("Login successful:", data);
      window.location.href = "/dashboard";
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setUsername("demo_user");
    setPassword("demo123");
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${getRoleColor(
        role
      )} flex items-center justify-center px-4 py-6`}
    >
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`h-2 bg-linear-to-r ${getRoleColor(role)}`} />

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Logo section */}
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 rounded-full bg-linear-to-br ${getRoleColor(
                  role
                )} flex items-center justify-center mx-auto mb-4 shrink-0`}
              >
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ClarityScore
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Login as <span className="font-semibold capitalize">{role}</span>
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login inputs */}
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400 transition pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  loading
                    ? "opacity-75 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:scale-105"
                }`}
              >
                {loading && <Loader className="w-5 h-5 animate-spin" />}
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            {/* Demo button */}
            <button
              onClick={handleDemo}
              className="w-full py-3 px-4 rounded-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
            >
              Try Demo Account
            </button>

            {/* Footer */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Contact Admin
                </a>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                © 2025 ClarityScore • Internal Use Only
              </p>
            </div>
          </div>
        </div>

        {/* Trusted badge */}
        <div className="text-center mt-6 text-white text-xs opacity-75">
          Secure • Encrypted • Compliant
        </div>
      </div>
    </div>
  );
}
