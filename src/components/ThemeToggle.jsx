export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
      className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-yellow-400 dark:text-black"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}