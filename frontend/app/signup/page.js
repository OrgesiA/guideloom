"use client";

import { useState } from "react";
import api from "../../lib/api";

const roles = [
  { value: "MENTOR", label: "Mentor" },
  { value: "INTERN", label: "AI Intern" },
];

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    name: "",
    role: "INTERN",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/api/auth/signup/", form);
      setMessage("Account created. You can now log in.");
    } catch (err) {
      setMessage("Sign up failed. Check inputs or try a different username/email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Sign up</h1>
        <p className="text-sm text-slate-600">
          Create a mentor or AI intern account. Mentors become staff automatically.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="mentor"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="mentor@example.com"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Pat Mentor"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Role</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
        {message && <p className="text-sm text-slate-700">{message}</p>}
      </form>
      <div className="text-sm text-slate-600">
        Already have an account? <a href="/login" className="font-semibold text-slate-900">Login</a>
      </div>
    </div>
  );
}
