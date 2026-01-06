"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useRequireRole(allowedRoles = []) {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    const savedRole = localStorage.getItem("user_role");
    if (!token) {
      router.replace("/login");
      return;
    }
    if (allowedRoles.length && savedRole && !allowedRoles.includes(savedRole)) {
      router.replace("/dashboard");
      return;
    }
    setRole(savedRole || null);
  }, [router, allowedRoles]);

  return role;
}
