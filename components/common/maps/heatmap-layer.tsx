"use client";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import L, { Layer } from "leaflet";

type HeatmapPoint = {
  lat: number;
  lon: number;
};

export default function HeatmapLayer({
  data,
}: {
  data: HeatmapPoint[];
}) {
  const map = useMapEvents({});

  useEffect(() => {
    if (!map || !data.length) return;

    const points: [number, number, number][] = data.map((p) => [
      p.lat,
      p.lon,
      0.6,
    ]);

    const heat = (L as typeof L & {
      heatLayer: (
        points: [number, number, number][],
        opts: Record<string, unknown>
      ) => Layer;
    }).heatLayer(points, {
      radius: 25,
      blur: 20,
      maxZoom: 12,
      minOpacity: 0.4,
    });

    heat.addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, data]);

  return null;
}
