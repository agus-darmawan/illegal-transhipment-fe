import { IllegalLog } from "./data-illegal-log";
import { Card } from "@/components/ui/card";
import { Ship, Calendar, Users, AlertTriangle, MapPin } from "lucide-react";

export default function IllegalLogCard({ log }: { log: IllegalLog }) {
  return (
    <Card className="p-3 border-l-4 border-l-red-500 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
      {/* Header - Compact */}
      <div className="flex items-center gap-2 mb-2">
        <Ship className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-900 dark:text-white truncate">
            {log.nama_kapal}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            GT {log.gt} • {log.kebangsaan}
          </p>
        </div>
      </div>

      {/* Location & Date - Compact Grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs">
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{log.perairan}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{new Date(log.tgl_riksa).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
        </div>
      </div>

      {/* Alat Tangkap - Compact Badge */}
      <div className="mb-2">
        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
          {log.alkap}
        </span>
      </div>

      {/* Violation - Compact Alert */}
      <div className="mb-2 p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900">
        <div className="flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-red-900 dark:text-red-200 mb-0.5">
              Pelanggaran
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 leading-tight">
              {log.duga_langgar}
            </p>
          </div>
        </div>
      </div>

      {/* Crew Info - Inline & Compact */}
      <div className="flex items-center gap-3 mb-2 text-xs">
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <Users className="w-3 h-3" />
          <span>WNI: <strong className="text-gray-900 dark:text-white">{log.jumlah_awak_wni}</strong></span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <Users className="w-3 h-3" />
          <span>WNA: <strong className="text-gray-900 dark:text-white">{log.jumlah_awak_wna}</strong></span>
        </div>
      </div>

      {/* Follow Up - Compact */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
          {log.tindak_lanjut}
        </p>
        {log.keterangan && (
          <p className="text-xs text-gray-600 dark:text-gray-400 italic line-clamp-2">
            {log.keterangan}
          </p>
        )}
      </div>

      {/* Coordinates - Ultra Compact */}
      <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
          {log.lintang.toFixed(4)}°, {log.bujur.toFixed(4)}°
        </p>
      </div>
    </Card>
  );
}