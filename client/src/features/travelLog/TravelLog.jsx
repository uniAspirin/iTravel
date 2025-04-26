import { useState } from "react";
import { useLogs } from "./api/useLogs";
import LogList from "./components/LogList";
import LogForm from "./components/LogForm";

export default function TravelLog() {
  const { data: logs, error, isLoading } = useLogs();
  const [selectedLog, setSelectedLog] = useState(null);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <div
      className="mt-5 grid grid-cols-3 space-x-5"
      style={{ height: "calc(100vh - 10rem)" }}
    >
      <LogList
        logs={logs}
        selectedLog={selectedLog}
        setSelectedLog={setSelectedLog}
      />
      <LogForm selectedLog={selectedLog} setSelectedLog={setSelectedLog} />
    </div>
  );
}
