import IllegalLogCard from "./illegal-log-card";
import { IllegalLog } from "./data-illegal-log";

export default function IllegalLogSidebar({
  logs,
  onClear,
}: {
  logs: IllegalLog[];
  onClear: () => void;
}) {
  return (
    <div className="w-95 h-full bg-gray-100 border-l p-3 flex flex-col">
      <h3 className="font-bold text-sm mb-2">
        Illegal Fishing Log ({logs.length})
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">
            Tidak ada kapal dalam radius
          </p>
        ) : (
          logs.map((log) => (
            <IllegalLogCard key={log.id} log={log} />
          ))
        )}
      </div>

      <button
        onClick={onClear}
        className="mt-3 bg-gray-800 text-white py-2 rounded-lg text-sm font-bold"
      >
        Clear Selection
      </button>
    </div>
  );
}
