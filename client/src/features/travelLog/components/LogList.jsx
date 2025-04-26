import React from "react";
import Log from "./Log";

export default function LogList({ logs, selectedLog, setSelectedLog }) {
  return (
    <div className="col-span-1 flex flex-col rounded-xl bg-neutral-700 p-2">
      {logs.length > 0 &&
        logs.map((log) => (
          <Log
            key={log.id}
            log={log}
            selectedLog={selectedLog}
            setSelectedLog={setSelectedLog}
          />
        ))}
      {/* Testing */}

      <p className="mt-2 border-t border-neutral-600 pt-5 text-center text-lg font-medium text-white">
        {logs.length} results
      </p>
    </div>
  );
}
