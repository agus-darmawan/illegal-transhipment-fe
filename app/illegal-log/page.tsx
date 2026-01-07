// app/illegal-log/page.tsx
"use client";

import { useState } from "react";
import BaseMap from "@/components/common/maps";
import IllegalLogSidebar from "./_components/illegal-log-sidebar";
import useNearbyIllegalLogs from "@/hooks/use-nearby-illegal-log";
import { dataIllegalLogs } from "./_components/data-illegal-log";

type ClickPayload = {
  lat: number;
  lng: number;
  radius: number;
  zoom: number;
};

export default function IllegalLogPage() {
  const [clicked, setClicked] = useState<ClickPayload | null>(null);

  const logs = useNearbyIllegalLogs(
    clicked?.lat,
    clicked?.lng,
    clicked?.radius
  );

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1">
        <BaseMap
          center={[1.44, 125.17]}
          heatmapData={dataIllegalLogs.map((l) => ({
            lat: l.lintang,
            lon: l.bujur,
          }))}
          onMapClick={(payload) => setClicked(payload)}
        />
      </div>

      {clicked && (
        <IllegalLogSidebar
          logs={logs}
          onClear={() => setClicked(null)}
        />
      )}
    </div>
  );
}
