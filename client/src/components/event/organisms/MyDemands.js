import React, {useEffect} from "react";
import {retrieve} from "../../../actions/user/show";
import {authentication} from "../../../utils/auth/authentication";
import {Loader} from "../../utils/Loader";
import {connect} from "react-redux";
import { del } from '../../../actions/event/delete';
import ManagePendingDemands from "../molecules/ManagePendingDemands";
import BeerCelebrationSvg from "../../../utils/svg/BeerCelebrationSvg";
import {update} from "../../../actions/event/update";
import {reset} from "../../../actions/event/show";
import usePushNotifications from "../../../utils/notification/usePushNotification";

const MyDemands = (props) => {
  // const {
  //   userConsent,
  //   pushNotificationSupported,
  //   userSubscription,
  //   onClickAskUserPermission,
  //   onClickSusbribeToPushNotification,
  //   onClickSendSubscriptionToPushServer,
  //   pushServerSubscriptionId,
  //   onClickSendNotification,
  //   error,
  //   loading
  // } = usePushNotifications();

  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
     if (user.organizedEvents.length > 0 && typeof user.organizedEvents[0].pendingParticipants === "undefined") {
      props.retrieve(authentication.currentUserValue['@id']);
     } else {
       events = user.organizedEvents
       events = events.filter((event) => event.pendingParticipants.length > 0)
     }
  }

  const refuseDemand = (event, participant) => {
    if (window.confirm('Voulez-vous vraiment refuser ce participant')) {
      let eventParticipantsWithoutUser = event.pendingParticipants.filter(user => user['@id'] !== participant['@id']);
      props.update(event, {pendingParticipants: eventParticipantsWithoutUser.map(loopParticipant => loopParticipant['@id'])}).then(() => {
        props.update(event, {refusedParticipants: [...(event.refusedParticipants.map(loopParticipant => loopParticipant['@id'])), participant['@id']]}).then(() =>
            props.retrieve(authentication.currentUserValue['@id'])
        )
      })
    }
  };

  const acceptDemand = (event, participant) => {
    let eventParticipantsWithoutUser = event.pendingParticipants.filter(user => user['@id'] !== participant['@id']);
    props.update(event, {pendingParticipants: eventParticipantsWithoutUser.map(loopParticipant => loopParticipant['@id'])}).then(() => {
      props.update(event, {participants: [...(event.participants.map(loopParticipant => loopParticipant['@id'])), participant['@id']]}).then(() =>
        props.retrieve(authentication.currentUserValue['@id'])
      )
    })
  };

  return (
    <div className={"mt-5 pt-3"}>
      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>
      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          {props.error}
        </div>
      )}

      {/*<button onClick={onClickAskUserPermission}>Ask user permission</button>*/}
      {/*<button onClick={onClickSusbribeToPushNotification}>Create Notification subscription</button>*/}
      {/*<button onClick={onClickSendSubscriptionToPushServer}>Send subscription to push server</button>*/}
      {/*<button onClick={onClickSendNotification}>Send a notification</button>*/}

      {(!props.loading && user) &&
      <>
        <div>
          {user.name}
        </div>
        <div className="container mt-4 mb-3">
          {events && events.length === 0 &&
          <div className="row mt-5 pt-5">
            <div className="col-12 text-center mt-5">
              <BeerCelebrationSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p className={"mb-0"}>Aucune demande en attente</p>
            </div>
          </div>
          }
          {events && events.length > 0 &&
          <div className="row">
            <div className="col text-center">
              <p className={"mb-0"}>
                <span className="font-weight-bold">
                  {events.length}
                </span> {events.length === 1 ? 'mission organisée' : 'missions organisées'}
              </p>
            </div>
          </div>
          }
        </div>
        <ManagePendingDemands
          events={events}
          history={props.history}
          refuseDemand={refuseDemand}
          acceptDemand={acceptDemand}
        />
      </>
      }
    </div>
  )
};

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  error: state.user.show.error,
  loading: state.user.show.loading,
  eventSource: state.user.show.eventSource,
  deleteError: state.event.del.error,
  deleteLoading: state.event.del.loading,
  deleted: state.event.del.deleted,
  updated: state.user.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource)),
  update: (item, values) => dispatch(update(item, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDemands);
