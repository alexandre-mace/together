import React, {useContext, useEffect, useState} from 'react';
import orderByDistance from 'geolib/es/orderByDistance';
import isPointWithinRadius from "geolib/es/isPointWithinRadius";
import SearchBar from "../../utils/SearchBar";
import FullScreenLoader from "../../utils/FullScreenLoader";
import EventsAgenda from "../molecules/EventsAgenda";
import {list, reset} from "../../../actions/event/list";
import {connect} from "react-redux";
import AppContext from "../../../config/context/appContext";
import NoDataSvg from "../../../utils/svg/NoDataSvg";

const DiscoverEvents = props => {
  const [radius, setRadius] = useState(5000);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const appContext = useContext(AppContext);

  const filterEvents = (eventsToFilter, { latitude, longitude }) => {
    return orderByDistance({latitude, longitude}, eventsToFilter.filter((event) => {
      return isPointWithinRadius(
        {latitude: event.latitude, longitude: event.longitude},
        {latitude: latitude, longitude: longitude},
        radius
      )
    }))
  };

  useEffect(() => {
    props.list(
      props.match.params.page &&
      decodeURIComponent(props.match.params.page))
  }, []);

  if (props.retrieved && props.retrieved['hydra:member'].length !== allEvents.length) {
    setAllEvents(props.retrieved['hydra:member']);
    setLoading(false);
  }

  const handleUserPositionSelected = ({lat, lng}, addressName) => {
    setLoading(true);
    appContext.setUserPosition({
      latitude: lat,
      longitude: lng,
      addressName: addressName
    });
    setTimeout(() => {setLoading(false)}, 800);
  };

  const handleChangeRadius = (radiusElement) => {
    setLoading(true);
    setRadius(radiusElement.target.value);
    setTimeout(() => {setLoading(false)}, 800);
  };

  const events = filterEvents(allEvents, {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude});

  return (
    <>
      {(loading || props.loading) &&
      <FullScreenLoader/>
      }
      {(!props.loading && !loading) &&
      <SearchBar
        handleUserPositionSelected={({lat, lng}, addressName) => handleUserPositionSelected({lat, lng}, addressName)}
        radius={radius}
        handleChangeRadius={handleChangeRadius}
      />
      }
      {(!props.loading && !loading) &&
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
              <p>
                Recherche de d'événement à proximité de <br/>
                <span className="font-weight-bold">
                  {appContext.userPosition.addressName}
                </span>
              </p>
            </div>
          </div>
          {events && events > 0 &&
          <div className="row">
            <div className="col text-center">
              <p>
                <span className="font-weight-bold">
                  {props.events.length}
                </span> {props.events.length === 1 ? 'événement trouvé' : 'événements trouvés'}
              </p>
            </div>
          </div>
          }
          <div className="row">
            {events.length === 0 &&
            <>
              <div className="col-12 text-center mt-3">
                <NoDataSvg/>
              </div>
              <div className="col-12 text-center mt-3">
                <p>Il n'y a pas encore d'événements organisés proche de votre localisation</p>
              </div>
            </>
            }
          </div>
        </div>
        <EventsAgenda
          events={events}
          history={props.history}
          userPosition={appContext.userPosition}
          handleMapView={appContext.handleMapView}
        />
      </>
      }
    </>
  )
};


const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.event.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};
const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverEvents);
