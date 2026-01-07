"use client";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// import HeatmapLayer from "./heatmap-layer";
import MapClickHandler from "./map-click-handler";
import MapRadiusCircle from "./map-radius-circle";
import useTileStore from "@/store/use-tile-store";
import config from "@/lib/env";

type HeatmapPoint = {
  lat: number;
  lon: number;
};

type ClickPayload = {
  lat: number;
  lng: number;
  radius: number;
  zoom: number;
};

type Props = {
  center: [number, number];
  heatmapData?: HeatmapPoint[];
  onMapClick?: (payload: ClickPayload) => void;
};

export default function BaseMap({
  center,
  // heatmapData,
  onMapClick,
}: Props) {
  const { setSelectedTile } = useTileStore();
  const [zoomLevel, setZoomLevel] = useState(6);
  const [clicked, setClicked] = useState<ClickPayload | null>(null);

  function LayerChangeHandler() {
    useMapEvents({
      baselayerchange: (e) => setSelectedTile(e.name),
      zoom: (e) => setZoomLevel(e.target.getZoom()),
    });
    return null;
  }

  const handleClick = (payload: ClickPayload) => {
    setClicked(payload);
    onMapClick?.(payload);
  };

  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      <LayerChangeHandler />
      <MapClickHandler onClick={handleClick} />

      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer checked name="Leaflet">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Default">
          <TileLayer
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${config.STADIA_MAP_API}`}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
{/* 
        {heatmapData && (
          <LayersControl.Overlay checked name="Heatmap">
            <HeatmapLayer data={heatmapData} />
          </LayersControl.Overlay>
        )} */}
      </LayersControl>

      {clicked && (
        <MapRadiusCircle
          lat={clicked.lat}
          lng={clicked.lng}
          radiusKm={clicked.radius}
        />
      )}

      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}
