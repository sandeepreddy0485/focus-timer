import { useEffect, useMemo, useState } from "react";
import Timer from "./components/Timer";
import ThemeToggle from "./components/ThemeToggle";
import SessionHistory from "./components/SessionHistory";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [sessions, setSessions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("focus-timer-sessions")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("focus-timer-sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (seconds, type, goal) => {
    if (seconds === 0) return;

    setSessions((prev) => [
      {
        id: Date.now(),
        duration: seconds,
        type,
        goal,
        completedAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const totalTime = useMemo(
    () => sessions.reduce((sum, session) => sum + session.duration, 0),
    [sessions]
  );

  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return [hrs, mins, secs]
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-xl mx-auto p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Focus Timer
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {sessions.length === 0
                ? "Start a session to build your focus streak."
                : `${sessions.length} completed session${sessions.length === 1 ? "" : "s"} · Total ${formatTime(totalTime)}`}
            </p>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <Timer addSession={addSession} />

        <SessionHistory sessions={sessions} />
      </div>
    </div>
  );
}

export default App;