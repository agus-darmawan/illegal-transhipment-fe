import { IllegalLog } from "./data-illegal-log";
import { Card } from "@/components/ui/card";

export default function IllegalLogCard({ log }: { log: IllegalLog }) {
  return (
    <Card className="p-4 border-red-400">
      <p className="font-bold text-sm text-red-700">{log.nama_kapal}</p>
      <p className="text-xs text-gray-600">
        GT {log.gt} • {log.kebangsaan}
      </p>

      <div className="mt-2 text-xs space-y-1">
        <p><b>Perairan:</b> {log.perairan}</p>
        <p><b>Alkap:</b> {log.alkap}</p>
        <p className="text-red-600 font-semibold">
          ⚠ {log.duga_langgar}
        </p>
      </div>

      <div className="mt-2 text-xs text-gray-600">
        <p><b>WNl:</b> {log.jumlah_awak_wni}</p>
        <p><b>WNA:</b> {log.jumlah_awak_wna}</p>
      </div>
    </Card>
  );
}
