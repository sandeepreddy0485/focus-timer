import { useEffect, useState } from "react";

const defaultDurations = {
  focus: 25,
  short: 5,
  long: 15,
};

export default function Timer({ addSession }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [targetMinutes, setTargetMinutes] = useState(defaultDurations.focus);
  const [goal, setGoal] = useState("");

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const targetSeconds = targetMinutes * 60;

    if (running && targetSeconds > 0 && seconds >= targetSeconds) {
      stopTimer(true);
    }
  }, [seconds, running, targetMinutes]);

  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return [hrs, mins, secs]
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  };

  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const stopTimer = (completed = false) => {
    setRunning(false);
    if (completed || seconds > 0) {
      addSession(seconds, mode, goal.trim());
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">

      <h2 className="text-6xl font-bold text-blue-600 mb-8">
        {formatTime(seconds)}
      </h2>

      <div className="flex justify-center gap-4">

        {!running ? (
          <button
            onClick={() => setRunning(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Stop
          </button>
        )}

        <button
          onClick={resetTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}