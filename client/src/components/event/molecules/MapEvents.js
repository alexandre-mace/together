import SwipeableViews from "react-swipeable-views";
import EventCard from "../atoms/EventCard";
import React from "react";
import displayMeters from "../../../utils/geocoding/displayMeters";
import getDistance from "geolib/es/getDistance";

const styles = {
  root: {
    padding: '0 30px 0 15px',
  },
  slideContainer: {
  },
  slide: {
  },
};

const MapEvents = (props) => (
  <>
    {/* mobile */}
    <div className="d-block d-md-none">
      <div className="events-container">

        <SwipeableViews
          onChangeIndex={props.handleEventSelected}
          style={props.eventSelected.name !== props.events[props.events.length - 1].name ? styles.root : {padding:"0 0 0 45px"}}
          slideStyle={styles.slideContainer}>
          {props.events.map((event, index) => (
            <div className={"h-100 py-30 pr-3"} key={index} style={Object.assign({}, styles.slide)}>
              <EventCard
                handleEventSelected={props.handleEventSelected}
                event={event}
                distance={
                  props.userPosition
                    ? displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: props.userPosition.latitude, longitude: props.userPosition.longitude}))
                    : false
                }
              />
            </div>
          ))}
        </SwipeableViews>
      </div>

    </div>

    {/* desktop */}
    <div className="d-none d-md-block">
      <div className="container">
        <div className="row">
          {props.events.map((event, index) => (
            <div className={"col-4 mt-3"} key={index}>
              <EventCard
                handleEventSelected={props.handleEventSelected}
                event={event}
                distance={
                  props.userPosition
                    ? displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: props.userPosition.latitude, longitude: props.userPosition.longitude}))
                    : false
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
export default MapEvents
