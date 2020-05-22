import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Badge, Typography} from "@material-ui/core";
import format from "date-fns/format";
import EventMaxPlacesIndicator from "../atoms/EventMaxPlacesIndicator";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import React, {useContext, useState} from "react";
import displayMeters from "../../../utils/geocoding/displayMeters";
import getDistance from "geolib/es/getDistance";
import {authentication} from "../../../utils/auth/authentication";
import redirectToLoginIfNoUser from "../../../utils/security/redirectToLoginIfNoUser";
import AppContext from "../../../config/context/appContext";
import {reset, retrieve} from "../../../actions/event/show";
import {update} from "../../../actions/event/update";
import {update as updateUser} from "../../../actions/user/update";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';

const SingleEvent = (
  {
    history,
    item,
    ...props
  }) => {
  const [interests, setInterests] = useState(item.interests);
  const [participants, setParticipants] = useState(item.participants);
  const [pendingParticipants, setPendingParticipants] = useState(item.pendingParticipants);

  const appContext = useContext(AppContext);

  const handleInterest = (event) => {
    if (!authentication.currentUserValue) {
      redirectToLoginIfNoUser(history);
      return;
    }

    if (interests.includes(authentication.currentUserValue['@id'])) {
      let eventInterestsWithoutUser = event.interests.filter(userId => userId !== authentication.currentUserValue['@id']);
      props.update(event, {interests: eventInterestsWithoutUser})
    } else {
      props.update(event, {interests: [...event.interests, authentication.currentUserValue['@id']]})
    }
  };

  const handleParticipate = (event) => {
    if (!authentication.currentUserValue) {
      redirectToLoginIfNoUser(history);
      return;
    }

    if (participants.includes(authentication.currentUserValue['@id'])) {
      let eventParticipantsWithoutUser = event.participants.filter(userId => userId !== authentication.currentUserValue['@id']);
      props.update(event, {participants: eventParticipantsWithoutUser})
      props.updateUser(event.organizator, {'name': 'test5'})
    } else if (pendingParticipants.includes(authentication.currentUserValue['@id'])) {
      let eventParticipantsWithoutUser = event.pendingParticipants.filter(userId => userId !== authentication.currentUserValue['@id']);
      props.update(event, {pendingParticipants: eventParticipantsWithoutUser})
      props.updateUser(event.organizator, {'name': 'test5'})
    }
    else {
      if (event.autoAccept) {
        props.update(event, {participants: [...event.participants, authentication.currentUserValue['@id']]})
        props.updateUser(event.organizator, {'name': 'test5'})
      } else {
        props.update(event, {pendingParticipants: [...event.pendingParticipants, authentication.currentUserValue['@id']]})
        props.updateUser(event.organizator, {updatedAt: new Date()})
      }
    }
  };

  const userInterested = authentication.currentUserValue
    ? interests.includes(authentication.currentUserValue['@id'])
    : false;
  const userParticipates = authentication.currentUserValue
    ? participants.includes(authentication.currentUserValue['@id'])
    : false;
  const userPendingParticipates = authentication.currentUserValue
    ? pendingParticipants.includes(authentication.currentUserValue['@id'])
    : false;

  let eventDate = new Date(item.date.slice(0, 19));

  if (props.retrieved && props.retrieved['@id'] === item['@id'] && interests.length !== props.retrieved.interests.length) {
    setInterests(props.retrieved.interests)
  }

  if (props.updated && props.updated['@id'] === item['@id'] && participants.length !== props.retrieved.participants.length) {
    setParticipants(props.retrieved.participants)
  }

  if (props.retrieved && props.retrieved['@id'] === item['@id'] && pendingParticipants.length !== props.retrieved.pendingParticipants.length) {
    setPendingParticipants(props.retrieved.pendingParticipants)
  }

  let distance = appContext.userPosition
    ? displayMeters(getDistance({ latitude: item.latitude, longitude: item.longitude} , {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
    : false;

  return (
    <div className={"full-screen-page full-screen-page-desktop"}>
      <div className="container pt-md-5">
        <div className="row">
          <div className="col p-0">
            <IconButton onClick={() => {
              props.reset();
              history.goBack()
            }} className={"color-white"}>
              <ArrowBackIcon/>
            </IconButton>
          </div>
        </div>
      </div>
      <Paper elevation={4} className={"container mt-3 pt-2 pb-3 single-event-paper"}>
        <div className="row mt-3">
          {item.autoAccept &&
            <div className="col-auto">
                <OfflineBoltIcon/>
            </div>
          }
          <div className={"col text-center"}>
            <Typography variant={"h6"}
                        className="font-weight-bold">{format(eventDate, 'dd')}/{format(eventDate, 'MM')}</Typography>
            <Typography variant={"h6"}
                        className="font-weight-light">{format(eventDate, 'HH')}h{format(eventDate, 'mm') !== 0 ? format(eventDate, 'mm') : ''}</Typography>
          </div>
          <div>
            <div className="col">
              <Typography variant={"h6"}>
                {distance ? distance : ''}
              </Typography>
            </div>
          </div>
        </div>
        <div className="row my-3 align-items-center">
          <EventMaxPlacesIndicator
            maxPlaces={item.maxPlaces}
            current={participants.length}
          />
        </div>
        <div className="row mt-3">
          <div className="col">
            <Typography variant={"h5"}>{item.name}</Typography>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Typography variant={"body1"}>{item.description}</Typography>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
          </div>
          <div className="col-12">
            <Typography gutterBottom>
              <span className={"organizator-name"}>{item.organizator.name ? <div className={"d-flex align-items-center"}><span className={"mr-4"}>{item.organizator.name}</span> {item.organizator.rates.length > 0 && <><span className={"mr-2"}>{(item.organizator.rates.reduce((a, b) => a + b, 0) / item.organizator.rates.length) || 0} </span> <StarIcon className={"star-icon"}/></>}</div> : "Non défini"}</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email : {item.organizator.contactEmail ? item.organizator.contactEmail : "Non défini"}
            </Typography>
          </div>
          <div className="col-12">
            <Typography variant="body1" gutterBottom>
              Tel : {item.organizator.contactPhone ? item.organizator.contactPhone : "Non défini"}
            </Typography>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Typography variant="h6" gutterBottom>
              Adresse
            </Typography>
          </div>
          <div className="col-12">
            <Typography variant="body1" gutterBottom>
              {item.address}
            </Typography>
          </div>
        </div>
        <div className="row mt-5">
          <div className={"col-12 d-flex justify-content-between align-items-center w-100 flex-wrap"}>
            <div className={"col-12 col-md-auto p-0 d-flex flex-column text-center"}>
              <div>
                <Button
                  variant="contained"
                  onClick={() => appContext.handleMapView(item)}
                  className={"py-3"}
                  endIcon={<RoomRoundedIcon/>}
                >
                  Voir sur la carte
                </Button>
              </div>
            </div>
            {(!authentication.currentUserValue ||
              authentication.currentUserValue && authentication.currentUserValue.status === 'volunteer') &&
            <div className="col-12 mt-3 mt-md-0 p-0 p-md-auto col-md-auto d-flex justify-content-center">
              {(!userParticipates && !userPendingParticipates) &&
              <Button
                variant="contained"
                className={"py-3 mr-3"}
                color={userInterested ? 'primary' : 'default'}
                endIcon={
                  <Badge badgeContent={interests.length}>
                    <BookmarkIcon fontSize="large"/>
                  </Badge>
                }
                onClick={() => handleInterest(item)}
              >
                Intéressé
              </Button>
              }
              <Button
                variant={"contained"}
                color={(userParticipates || userPendingParticipates) ? 'primary' : 'default'}
                className={"py-3"}
                endIcon={
                  <Badge badgeContent={participants.length}>
                    {!userParticipates &&
                    <CalendarTodayIcon className={"fs-60"}/>
                    }
                    {userParticipates &&
                    <EventAvailableIcon fontSize="large"/>
                    }                    </Badge>
                }
                onClick={() => handleParticipate(item)}>
                {userPendingParticipates ? 'Demande envoyée' : 'Participe'}
              </Button>
            </div>
            }
          </div>
        </div>
      </Paper>
    </div>
  )
};

const mapStateToProps = state => ({
  retrieved: state.event.show.retrieved,
  updateError: state.event.update.updateError,
  updateLoading: state.event.update.updateLoading,
  error: state.event.show.error,
  loading: state.event.show.loading,
  eventSource: state.event.show.eventSource,
  updated: state.event.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  updateUser: (item, values) => dispatch(updateUser(item, values)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);
