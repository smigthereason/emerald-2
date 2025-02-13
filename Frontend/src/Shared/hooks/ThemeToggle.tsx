// src/components/ThemeToggle.tsx
import React from "react";
import { useTheme } from "./ThemeContext";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ margin: "1rem", fontSize: "1.5rem" }}>
      {theme === "light" ? <MdOutlineNightlight /> : <MdOutlineLightMode />}
    </button>
  );
};

export default ThemeToggle;
