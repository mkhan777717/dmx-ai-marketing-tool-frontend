"use client";

import { useEffect } from "react";
import { applyThemeToDOM } from "@/components/settings/AppearanceSettings";

export default function RootThemeInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("dmx_theme") || "system";
    applyThemeToDOM(savedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentSaved = localStorage.getItem("dmx_theme") || "system";
      if (currentSaved === "system") {
        applyThemeToDOM("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return null;
}
