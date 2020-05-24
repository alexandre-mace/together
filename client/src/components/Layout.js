import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {connect} from "react-redux";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import theme from "../config/ui/theme";
import AppContext from "../config/context/appContext";
import Navigation from "./navigation/Navigation";
import Map from "./map/LeafletMap";
import {authentication} from "../utils/auth/authentication";
import {retrieve, reset} from "../actions/user/show";
import {update} from "../actions/user/update";
import isBefore from 'date-fns/isBefore'

const Layout = (props) => {
  const [userPosition, setUserPosition] = useState(
    { latitude: 44.8337080, longitude: -0.5821208, addressName:  "38 Rue Lacornée, 33000 Bordeaux France" });
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [mapView, setMapView] = useState(false);
  const [currentRatedEvent, setCurrentRatedEvent] = useState(false);
  const [eventsToRate, setEventsToRate] = useState([]);

  const handleMapView = event => {
    setMapCenter([event.latitude, event.longitude]);
    setMapView(true);
  };
  const handleCloseMapView = () => {
    setMapView(false)
  };

  useEffect(() => {
    if (!localStorage.getItem('action-onboarding')) {
      props.history.push('/bienvenue')
    }

    if (authentication.currentUserValue) {
      props.retrieve('/users/' + decodeURIComponent(authentication.currentUserValue.id));
    }

    if (
      authentication.currentUserValue &&
      authentication.currentUserValue.status === "association" &&
      !localStorage.getItem("associationRedirect")) {
        props.history.push('/mes-missions');
        localStorage.setItem("associationRedirect", "true");
    }
  }, []);


  useEffect(() => {
    if (currentRatedEvent) {
      props.history.push(`/users/rate/${encodeURIComponent(currentRatedEvent['organizator']['@id'])}`)
    }
  }, [currentRatedEvent])

  const user =
    (props.updated &&
    props.updated['@id'] === authentication.currentUserValue['@id'])
      ? props.updated
      : props.retrieved
        ? props.retrieved
        : false;

  if (user) {
    if (user.participatedEvents) {
      const calculatedEventsToRate = user.participatedEvents
        .filter((event) => !user.ratedEvents.includes(event.id))
        .filter((event) => isBefore(new Date(event.date).setHours(new Date().getHours() - 2), new Date()));

      if (eventsToRate.length !== calculatedEventsToRate.length) {
        setEventsToRate(calculatedEventsToRate);
        if (calculatedEventsToRate.length === 0) {
          setCurrentRatedEvent(false);
          props.history.push(`/`)
        }
      }

      if (calculatedEventsToRate.length > 0) {
        if (!currentRatedEvent || currentRatedEvent['@id'] !== calculatedEventsToRate[0]['@id']) {
          setCurrentRatedEvent(calculatedEventsToRate[0]);
        }
      }
    }
  }

  return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <AppContext.Provider value={
            { userPosition: userPosition,
              setUserPosition: setUserPosition,
              mapView: mapView,
              handleMapView: handleMapView,
              mapCenter: mapCenter,
              user: user,
              currentRatedEvent: currentRatedEvent,
              eventsToRate: eventsToRate,
              handleCloseMapView: handleCloseMapView }
          }>
            <div className="my-0 my-md-5"></div>
            {props.history &&
              <Navigation {...props} user={user}/>
            }
            <div className={"bottom-navigation-padding"}>
              {props.children}
            </div>
            {mapView &&
            <Map
              center={mapCenter}
              event={{latitude: mapCenter[0], longitude: mapCenter[1]}}
              handleCloseMapView={handleCloseMapView}
            />
            }
          </AppContext.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
}
const mapStateToProps = state => ({
  updated: state.user.update.updated,
  retrieved: state.user.show.retrieved,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  reset: eventSource => dispatch(reset(eventSource)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
