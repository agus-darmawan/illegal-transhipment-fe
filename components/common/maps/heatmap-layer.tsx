"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
// @ts-ignore
import "leaflet.heat";

type HeatmapPoint = {
  lat: number;
  lon: number;
};

export default function HeatmapLayer({
  data,
}: {
  data: HeatmapPoint[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !data.length) return;

    // Convert data to format: [lat, lng, intensity]
    const points: [number, number, number][] = data.map((p) => [
      p.lat,
      p.lon,
      0.8, // intensity
    ]);

    // Check if heatLayer is available
    if (typeof (L as any).heatLayer === 'function') {
      const heatLayer = (L as any).heatLayer(points, {
        radius: 25,
        blur: 20,
        maxZoom: 12,
        minOpacity: 0.4,
        gradient: {
          0.0: '#3b82f6',
          0.5: '#fbbf24', 
          1.0: '#ef4444'
        }
      });

      heatLayer.addTo(map);

      return () => {
        map.removeLayer(heatLayer);
      };
    } else {
      console.warn('Leaflet.heat plugin not loaded');
    }
  }, [map, data]);

  return null;
}