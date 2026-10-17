"use client";

import { darkTheme, lightTheme, ThemeType } from "@/styles/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    if (typeof document === "undefined") return;

    const rootTheme = document.documentElement.getAttribute("data-theme");
    const stored = window.localStorage.getItem("theme");
    const resolved =
      stored === "light" || stored === "dark" ? stored : rootTheme;

    if (resolved === "light" || resolved === "dark") {
      setTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.style.setProperty(
      "--color-body",
      newTheme === "dark" ? "#000000" : "#ffffff"
    );
  };

  const currentTheme: ThemeType = useMemo(
    () => (theme === "light" ? lightTheme : darkTheme),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      <EmotionThemeProvider theme={currentTheme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
