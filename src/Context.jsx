import { useContext, createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const getInitialTheme = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;

  const isDarkTheme = localStorage.getItem("darkTheme") === "true";

  if (!typeof isDarkTheme === "boolean") return prefersDarkMode;

  return isDarkTheme;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme());
  const [searchTerm, setSearchTerm] = useState("cat");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    localStorage.setItem("darkTheme", newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
