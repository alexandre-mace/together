export default function displayMeters(meters) {
  if (meters.toString().length < 4) {
    return meters + " m";
  }

  const metersKmFormatted = (meters / 1000).toFixed(1);

  return (metersKmFormatted - Math.floor(metersKmFormatted) === 0
    ? Math.floor(metersKmFormatted)
    : metersKmFormatted)
    + " km";
}
