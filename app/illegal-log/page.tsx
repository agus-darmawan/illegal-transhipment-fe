"use client";

import { useState, useEffect } from "react";
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
  const [clicked, setClicked] = useState<ClickPayload | null>(null);

  // Load params from URL on mount
  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");
    const zoom = searchParams.get("zoom");

    if (lat && lng && radius && zoom) {
      setClicked({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: parseFloat(radius),
        zoom: parseInt(zoom),
      });
    }
  }, [searchParams]);

  const logs = useNearbyIllegalLogs(
    clicked?.lat,
    clicked?.lng,
    clicked?.radius
  );

  const handleMapClick = (payload: ClickPayload) => {
    setClicked(payload);
    
    // Update URL params
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
      {/* Map Container */}
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

      {/* Sidebar - Fixed position */}
      {clicked && (
        <div className="w-[360px] h-screen fixed right-0 top-0 z-[1000]">
          <IllegalLogSidebar
            logs={logs}
            onClear={handleClear}
          />
        </div>
      )}
    </div>
  );
}