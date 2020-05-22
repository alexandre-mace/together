import getDistance from "geolib/es/getDistance";

export default function (event, userPosition) {
  return getDistance(
    { latitude: event.latitude, longitude: event.longitude},
      {latitude: userPosition.latitude, longitude: userPosition.longitude})
}
