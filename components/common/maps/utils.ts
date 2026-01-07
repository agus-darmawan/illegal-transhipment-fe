export const zoomToRadiusKm = (zoom: number): number => {
  if (zoom >= 15) return 1;
  if (zoom >= 13) return 3;
  if (zoom >= 11) return 7;
  if (zoom >= 9) return 15;
  if (zoom >= 7) return 30;
  return 50;
};
