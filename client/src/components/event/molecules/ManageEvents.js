import React, {useContext} from "react";
import displayMeters from "../../../utils/geocoding/displayMeters";
import getDistance from "geolib/es/getDistance";
import sortByDateDesc from "../../../utils/agenda/sortByDateDesc";
import ManageEventCard from "../atoms/ManageEventCard";
import AgendaDay from "../atoms/AgendaDay";
import AppContext from "../../../config/context/appContext";

const ManageEvents = (props) => {
  const appContext = useContext(AppContext);

  return (
  <div className="container">
    <div className="row">
      {props.events && sortByDateDesc(props.events).map((event, index) => (
        <React.Fragment key={index}>
          <AgendaDay
            events={props.events}
            event={event}
            index={index}
          />
          <div className={"col-12 col-md-4 mt-3"} key={index}>
            <ManageEventCard
              event={event}
              history={props.history}
              handleMapView={appContext.handleMapView}
              deleteEvent={props.deleteEvent}
              updateEvent={props.updateEvent}
              distance={
                appContext.userPosition
                  ? displayMeters(getDistance({
                    latitude: event.latitude,
                    longitude: event.longitude
                  }, {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
                  : false
              }
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
  )
};
export default ManageEvents
