import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Link from "react-router-dom/es/Link";
import {Badge} from "@material-ui/core";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import format from 'date-fns/format'
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import {reset, retrieve, update} from "../../../actions/event/update";
import {del} from "../../../actions/event/delete";
import {authentication} from "../../../utils/auth/authentication";
import redirectToLoginIfNoUser from "../../../utils/security/redirectToLoginIfNoUser";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  root: {
    paddingTop: '0'
  }
}));

function EventCard(props) {
  const classes = useStyles();

  const [interests, setInterests] = useState(props.event.interests);
  const [participants, setParticipants] = useState(props.event.participants);

  // let totalMessages = 0;
  // if (props.event.forum) {
  //   totalMessages = props.event.forum.messages.length
  // }

  let eventDate = new Date(props.event.date.slice(0, 19));

  const handleInterest = (event) => {
    if (!authentication.currentUserValue) {
      redirectToLoginIfNoUser(props.history);
      return;
    }

    if (interests.includes(authentication.currentUserValue['@id'])) {
      let eventInterestsWithoutUser = event.interests.filter(user => user !== authentication.currentUserValue['@id']);
      props.update(event, {interests: eventInterestsWithoutUser})
    } else {
      props.update(event, {interests: [...event.interests, authentication.currentUserValue['@id']]})
    }
  };

  const handleParticipate = (event) => {
    if (!authentication.currentUserValue) {
      redirectToLoginIfNoUser(props.history);
      return;
    }

    if (participants.includes(authentication.currentUserValue['@id'])) {
      let eventParticipantsWithoutUser = event.participants.filter(user => user !== authentication.currentUserValue['@id']);
      props.update(event, {participants: eventParticipantsWithoutUser})
    } else {
      props.update(event, {participants: [...event.participants, authentication.currentUserValue['@id']]})
    }
  };

  if (props.updated && props.updated['@id'] === props.event['@id'] && interests.length !== props.updated.interests.length) {
    setInterests(props.updated.interests)
  }
  if (props.updated && props.updated['@id'] === props.event['@id'] && participants.length !== props.updated.participants.length) {
    setParticipants(props.updated.participants)
  }

  const userInterested = authentication.currentUserValue
    ? interests.includes(authentication.currentUserValue['@id'])
    : false;
  const userParticipates = authentication.currentUserValue
    ? participants.includes(authentication.currentUserValue['@id'])
    : false;

  return (
    <Card key={props.event['@id']} className={classes.card}>
      <Link to={`/events/show/${encodeURIComponent(props.event['@id'])}`}>
        <CardHeader
          classes={{title: classes.title}}
          title={`${props.event.name.substring(0, 60)} ${props.event.name.length > 58 ? '...' : ''}`}
          subheader={''}
        />
        <CardContent classes={{root: classes.root}} className={"pb-0 pb-md-3"}>
          <div className="d-flex flex-column w-100">
            <div className={"d-none d-md-flex"}>
              <Typography variant={"body1"} >{props.event.description}</Typography>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardActions className={'mt-auto d-flex flex-column pt-0'} disableSpacing>
        <div className={"d-flex justify-content-between align-items-center w-100 px-2"}>
          <div>
            <Typography variant={"h6"} className="font-weight-light">{format(eventDate, 'HH')}h{format(eventDate, 'mm') !== 0 ? format(eventDate, 'mm') : ''}</Typography>
          </div>
          <div>
              <Typography variant={"h6"}>
                {props.distance ? props.distance : ''}
              </Typography>
          </div>
        </div>
        <div className={"d-flex justify-content-between align-items-center w-100"}>
          <IconButton
            className={'color-black'}
            onClick={() => props.handleMapView(props.event)}>
            <RoomRoundedIcon fontSize="large"/>
          </IconButton>
          <div className="d-flex">
            <IconButton
              color={userInterested ? 'primary' : 'secondary'}
              size="medium"
              onClick={() => handleInterest(props.event)}>
              <Badge badgeContent={interests.length}>
                <BookmarkIcon fontSize="large"/>
              </Badge>
            </IconButton>
            <IconButton
              color={'primary'}
              size="medium"
              onClick={() => handleParticipate(props.event)}>
              <Badge badgeContent={participants.length}>
                {!userParticipates &&
                <CalendarTodayIcon className={"fs-60"}/>
                }
                {userParticipates &&
                <EventAvailableIcon fontSize="large"/>
                }
              </Badge>
            </IconButton>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  updateError: state.event.update.updateError,
  updateLoading: state.event.update.updateLoading,
  deleteError: state.event.del.error,
  deleteLoading: state.event.del.loading,
  eventSource: state.event.update.eventSource,
  created: state.event.create.created,
  deleted: state.event.del.deleted,
  updated: state.event.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
