import React, { useState } from "react";
import { useStore } from "../store";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStore();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("themeBlogMern", newTheme);
  };
  return (
    <label className="switch">
      <input type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeSwitch;
