"use client";
import { useEffect, useState } from "react";

export function useDarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setEnabled(true);
    }
  }, []);

  const toggle = () => {
    if (typeof window === "undefined") return;
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setEnabled(isDark);
  };

  return { enabled, toggle };
}
