import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import {ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, ListItem, List} from "@material-ui/core";
import {reset, retrieve, update} from "../../../actions/event/update";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EventMaxPlacesIndicator from "./EventMaxPlacesIndicator";
import Button from "@material-ui/core/Button";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {connect} from "react-redux";
import {del} from "../../../actions/event/delete";

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

function ManagePendingDemandCard(props) {
  const classes = useStyles();

  return (
    <Card key={props.event['@id']} className={classes.card}>
        <CardHeader
          classes={{title: classes.title}}
          className={"pb-0"}
          title={`${props.event.name.substring(0, 60)} ${props.event.name.length > 58 ? '...' : ''}`}
          subheader={<div className={"d-flex w-100 justify-content-start justify-content-md-end mt-2 mt-md-0"}>
            <div className={"mr-3"}>{props.event.interests.length} {props.event.interests.length > 1 ? "intéressés" : "intéressé"}</div>
            <div>{props.event.participants.length} {props.event.participants.length > 1 ? "participants" : "participant"}</div>
          </div>}
        />
      <CardActions className={'mt-auto d-flex flex-column pt-0'} disableSpacing>
        <div className={"w-100"}>
          <List>
            {props.event.pendingParticipants.map((pendingParticipant, iterator) =>
              <ListItem key={iterator}>
                <ListItemAvatar>
                  <ListItemAvatar>
                    <NotificationsIcon />
                  </ListItemAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={pendingParticipant.name}
                  secondary={<span className={"d-none d-sm-block"}>souhaite participer</span>}
                ><span>souhaite participer</span></ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => props.acceptDemand(props.event, pendingParticipant)}
                    endIcon={<CheckCircleIcon className={"d-none d-md-block"}/>}
                  >
                    <CheckCircleIcon className={"d-inline-block d-md-none"}/>
                    <div className={"d-none d-md-block"}>Accepter</div>
                  </Button>
                  <Button
                    variant="contained"
                    className={'color-red ml-3'}
                    size={"medium"}
                    onClick={() => props.refuseDemand(props.event, pendingParticipant)}
                    endIcon={<DeleteForeverRoundedIcon className={"d-none d-md-block"}/>}
                  >
                    <DeleteForeverRoundedIcon className={"d-inline-block d-md-none"}/>
                    <div className={"d-none d-md-block"}>Refuser</div>
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePendingDemandCard);
