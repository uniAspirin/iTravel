export default function Log({ log, selectedLog, setSelectedLog }) {
  return (
    <div
      className={`transision flex flex-col rounded-2xl px-4 py-2 text-white duration-175 ${selectedLog && selectedLog.id === log.id ? "bg-neutral-600" : "hover:bg-neutral-600"}`}
      onClick={() => {
        setSelectedLog(log);
      }}
    >
      <p className="text-lg font-medium">{log.title}</p>
      <p className="font-mono text-sm text-gray-100">
        {log.start_date} to {log.end_date}
      </p>
    </div>
  );
}
