"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/token/", { username, password });
      const { access, refresh, role, name, user_id } = res.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user_role", role);
        localStorage.setItem("user_name", name || username);
        localStorage.setItem("user_id", user_id);
      }
      setMessage("Login successful. Redirecting...");
      router.replace("/dashboard");
    } catch (err) {
      setMessage("Login failed. Check username/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        {message && <p className="text-sm text-slate-700">{message}</p>}
      </form>
      <div className="text-sm text-slate-600">
        Need an account? <a href="/signup" className="font-semibold text-slate-900">Sign up</a>
      </div>
    </div>
  );
}
