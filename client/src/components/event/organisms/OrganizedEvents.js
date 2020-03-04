import React, {useEffect} from "react";
import NoDataSvg from "../../../utils/svg/NoDataSvg";
import {retrieve} from "../../../actions/user/show";
import {authentication} from "../../../utils/auth/authentication";
import {Loader} from "../../utils/Loader";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { del } from '../../../actions/event/delete';
import ManageEvents from "../molecules/ManageEvents";

const OrganizedEvents = (props) => {
  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
    events = user.organizedEvents
  }

  const deleteEvent = (event) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet événement'))
      props.del(event).then(() => {
        props.retrieve(authentication.currentUserValue['@id']);
      });
  };

  const updateEvent = (event) => {
    props.history.push(`/events/edit/${encodeURIComponent(event['@id'])}`)
  };

  return (
    <>
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

      <div className="container mt-5">
        <div className="row mt-3">
          <div className="col text-center">
            <Link to={"/ajouter-un-evenement"}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleRoundedIcon />}
              >
                Ajouter un evenement
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {!props.loading &&
      <>
        <div className="container mt-5 bottom-navigation-padding">
          {user && events && events.length === 0 &&
          <div className="row">
            <div className="col-12 text-center mt-5">
              <NoDataSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p>Aucun événement organisé pour l'instant</p>
            </div>
          </div>
          }
          {events && events.length > 0 &&
          <div className="row">
            <div className="col text-center">
              <p>
                <span className="font-weight-bold">
                  {events.length}
                </span> {events.length === 1 ? 'événement organisé' : 'événements organisés'}
              </p>
            </div>
          </div>
          }
        </div>
        <ManageEvents
          events={events}
          history={props.history}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
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
  deleteError: state.event.del.error,
  deleteLoading: state.event.del.loading,
  deleted: state.event.del.deleted,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => dispatch(del(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizedEvents);
