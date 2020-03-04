import React, {useContext, useEffect} from "react";
import NoDataSvg from "../../../utils/svg/NoDataSvg";
import {reset, retrieve} from "../../../actions/user/show";
import {connect} from "react-redux";
import {authentication} from "../../../utils/auth/authentication";
import AppContext from "../../../config/context/appContext";
import {Loader} from "../../utils/Loader";
import EventsAgenda from "../molecules/EventsAgenda";

const InterestedEvents = (props) => {
  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
    events = [...new Set([...user.interestedEvents, ...user.participatedEvents])]
  }

  const appContext = useContext(AppContext);

  return (
    <>
      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          {props.error}
        </div>
      )}

      {!props.loading &&
      <>
        <div className="container mt-5">
          {user && events && events.length === 0 &&
          <div className="row">
            <div className="col-12 text-center mt-5">
              <NoDataSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p>Vous n'avez pas encore indiqué que vous étiez intéressé ou que vous participez à un événement</p>
            </div>
          </div>
          }
          {events && events.length > 0 &&
          <div className="row">
            <div className="col text-center">
              <span className="font-weight-bold">
                {events.length}
              </span> {events.length === 1 ? 'événement dans mon agenda' : 'événements dans mon agenda'}
            </div>
          </div>
          }
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

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  error: state.user.show.error,
  loading: state.user.show.loading,
  eventSource: state.user.show.eventSource,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestedEvents);
