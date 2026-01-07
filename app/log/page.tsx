"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clicked, setClicked] = useState<ClickPayload | null>(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");
    const zoom = searchParams.get("zoom");

    if (lat && lng && radius && zoom) {
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: parseFloat(radius),
        zoom: parseInt(zoom),
      };
    }
    return null;
  });

  const logs = useNearbyIllegalLogs(
    clicked?.lat,
    clicked?.lng,
    clicked?.radius
  );

  const handleMapClick = (payload: ClickPayload) => {
    setClicked(payload);
    
    const params = new URLSearchParams();
    params.set("lat", payload.lat.toFixed(6));
    params.set("lng", payload.lng.toFixed(6));
    params.set("radius", payload.radius.toFixed(2));
    params.set("zoom", payload.zoom.toString());
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setClicked(null);
    router.push("/illegal-log", { scroll: false });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className={`transition-all duration-300 ${clicked ? 'w-[calc(100%-360px)]' : 'w-full'}`}>
        <BaseMap
          center={[1.44, 125.17]}
          heatmapData={dataIllegalLogs.map((l) => ({
            lat: l.lintang,
            lon: l.bujur,
          }))}
          onMapClick={handleMapClick}
        />
      </div>

      {clicked && (
        <div className="w-90 h-screen fixed right-20 top-0 z-999">
          <IllegalLogSidebar
            logs={logs}
            onClear={handleClear}
          />
        </div>
      )}
    </div>
  );
}