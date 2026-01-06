"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const initialState = { loggedIn: false, role: null };

  const [auth, setAuth] = useState(initialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    const savedRole = localStorage.getItem("user_role");
    setAuth({ loggedIn: Boolean(token), role: savedRole || null });
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");
    }
    setAuth(initialState);
    router.replace("/login");
  };

  const mentorLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Programs/Tasks" },
    { href: "/submissions", label: "Submissions" },
    { href: "/questions", label: "Intern Q&A" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/analytics", label: "Analytics" },
  ];

  const internLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/questions", label: "Q&A" },
    { href: "/feedback", label: "Feedback" },
    { href: "/progress", label: "Progress" },
  ];

  const linksToShow = auth.role === "MENTOR" ? mentorLinks : internLinks;

  const hideNav = pathname === "/login";
  if (hideNav) return null;

  return (
    <nav className="space-x-4 text-sm text-slate-600">
      {linksToShow.map((l) => (
        <a key={l.href} href={l.href} className="hover:text-slate-900">
          {l.label}
        </a>
      ))}
      {!auth.loggedIn ? (
        <>
          <a href="/login" className="hover:text-slate-900">Login</a>
          <a href="/signup" className="hover:text-slate-900">Sign up</a>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-200"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
