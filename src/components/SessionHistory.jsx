export default function SessionHistory({ sessions }) {
  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return [hrs, mins, secs]
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Session History
      </h2>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No completed sessions yet.</p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold dark:text-white">
                    {session.type === "focus"
                      ? "Focus Session"
                      : session.type === "short"
                      ? "Short Break"
                      : "Long Break"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Duration: {formatTime(session.duration)}
                  </p>
                  {session.goal ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Goal: {session.goal}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {session.completedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}