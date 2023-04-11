import { useContext } from "react";

import { ThemeContext } from "../../contexts/theme.context";

import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button className="h-6 w-6 " onClick={toggleDarkMode}>
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
