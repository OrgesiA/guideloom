"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useRequireAuth() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
}
