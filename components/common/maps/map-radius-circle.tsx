import { Circle } from "react-leaflet";

type Props = {
  lat: number;
  lng: number;
  radiusKm: number;
};

export default function MapRadiusCircle({
  lat,
  lng,
  radiusKm,
}: Props) {
  return (
    <Circle
      center={[lat, lng]}
      radius={radiusKm * 1000}
      pathOptions={{
        color: "blue",
        dashArray: "4 4",
        fillOpacity: 0.05,
      }}
    />
  );
}
