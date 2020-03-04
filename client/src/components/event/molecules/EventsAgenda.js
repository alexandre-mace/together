import EventCard from "../atoms/EventCard";
import React from "react";
import displayMeters from "../../../utils/geocoding/displayMeters";
import getDistance from "geolib/es/getDistance";
import sortByDateAsc from "../../../utils/agenda/sortByDateAsc";
import { Animate }  from 'react-simple-animate';
import AgendaDay from "../atoms/AgendaDay";

const EventsAgenda = (props) => (
  <div className="container">
    <div className="row mt-3">
      {props.events && sortByDateAsc(props.events).map((event, index) => (
        <React.Fragment key={index}>
          <AgendaDay
            events={props.events}
            event={event}
            index={index}
          />
          <div className={"col-12 col-md-4 mt-3"} key={index}>
            <Animate
              play={true} // set play true to start the animation
              duration={0.6} // how long is the animation duration
              delay={index * 0.1} // how many delay seconds will apply before the animation start
              start={{ transform: 'translate(0, 400px)' }}
              end={{ transform: 'translate(0, 0)' }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
              onComplete={() => {}} // call back function when animation is completed
            >
              <EventCard
                event={event}
                history={props.history}
                handleMapView={props.handleMapView}
                distance={
                  props.userPosition
                    ? displayMeters(
                        getDistance(
                    { latitude:event.latitude, longitude: event.longitude},
                      {latitude: props.userPosition.latitude, longitude: props.userPosition.longitude}
                        )
                      )
                    : false
                }
              />
            </Animate>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);
export default EventsAgenda
