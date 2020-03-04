import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Link from "react-router-dom/es/Link";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import format from 'date-fns/format'
import {reset, retrieve, update} from "../../../actions/event/update";
import {del} from "../../../actions/event/delete";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

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

  // let totalMessages = 0;
  // if (props.event.forum) {
  //   totalMessages = props.event.forum.messages.length
  // }

  let eventDate = new Date(props.event.date.slice(0, 19));

  return (
    <Card key={props.event['@id']} className={classes.card}>
      <Link to={`/events/show/${encodeURIComponent(props.event['@id'])}`}>
        <CardHeader
          classes={{title: classes.title}}
          title={`${props.event.name.substring(0, 60)} ${props.event.name.length > 58 ? '...' : ''}`}
          subheader={<div className={"d-flex w-100 justify-content-between"}>
            <div>{props.event.interests.length} {props.event.interests.length > 1 ? "intéressés" : "intéressé"}</div>
            <div>{props.event.participants.length} {props.event.participants.length > 1 ? "participants" : "participant"}</div>
          </div>}
        />
        <CardContent classes={{root: classes.root}} className={"pb-0 pb-md-3"}>
          <div className="d-flex flex-column w-100">
            <div className={"d-none d-md-flex"}>
              <Typography variant={"body1"} >{props.event.description}</Typography>
            </div>
            <div>
              <Typography variant={"body1"} className="mt-2 font-weight-light">{props.event.address}</Typography>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardActions className={'mt-auto d-flex flex-column pt-0'} disableSpacing>
        <div className={"d-flex justify-content-between align-items-center w-100"}>
          <div>
            <Typography variant={"h6"} className="font-weight-light">{format(eventDate, 'HH')}h{format(eventDate, 'mm') !== 0 ? format(eventDate, 'mm') : ''}</Typography>
          </div>
          <div>
          <IconButton
            className={"color-black"}
            size="medium"
            onClick={() => props.updateEvent(props.event)}>
            <EditRoundedIcon fontSize="large"/>
          </IconButton>
          <IconButton
            className={'color-red'}
            size="medium"
            onClick={() => props.deleteEvent(props.event)}>
            <DeleteForeverRoundedIcon fontSize="large"/>
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
