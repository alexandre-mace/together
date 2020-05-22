import {authentication} from "../../auth/authentication";
import clientToApiDateAdapter from "./date/clientToApiDateAdapter";
import clientToApiMaxPlacesAdapter from "./maxPlaces/clientToApiMaxPlacesAdapter";

export default function createClientToApiAdapter(values) {
  // adapt date format
  values = clientToApiDateAdapter(values)

  // adapt maxPlaces format
  values = clientToApiMaxPlacesAdapter(values)

  // fill organizator
  values['organizator'] = authentication.currentUserValue['@id'];

  return values
}
