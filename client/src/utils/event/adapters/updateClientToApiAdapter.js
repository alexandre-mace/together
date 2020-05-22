import clientToApiDateAdapter from "./date/clientToApiDateAdapter";
import clientToApiMaxPlacesAdapter from "./maxPlaces/clientToApiMaxPlacesAdapter";

export default function updateClientToApiAdapter(values) {
  // adapt date format
  values = clientToApiDateAdapter(values)

  // adapt maxPlaces format
  values = clientToApiMaxPlacesAdapter(values)

  return values
}
