import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, update, reset } from '../../actions/user/update';
import { del } from '../../actions/user/delete';
import {Loader} from "../utils/Loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RateAssociationForm from "./RateAssociationForm";
import {Typography} from "@material-ui/core";
import {authentication} from "../../utils/auth/authentication";
import Button from "@material-ui/core/Button";
import AppContext from "../../config/context/appContext";
import format from "date-fns/format";

class RateAssociation extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    retrieveLoading: PropTypes.bool.isRequired,
    retrieveError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
  static contextType = AppContext;

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  submitForm = (item, value) => {
    let rates = item.rates ? item.rates : []
    this.props.update(item, {rates: [...rates, value]}).then(() => {
      this.props.update(this.context.user, {ratedEvents: [...this.context.user.ratedEvents, this.context.currentRatedEvent.id]})
    })
  };

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    let eventDate = false;
    if (this.context.currentRatedEvent) {
      eventDate = new Date(this.context.currentRatedEvent.date.slice(0, 19));
    }

    return (
      <div>
        {(this.props.retrieveLoading) && (
          <div className="mt-5">
            <Loader/>
          </div>
        )}
        {this.props.retrieveError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.retrieveError}
          </div>
        )}
        {this.props.updateError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.updateError}
          </div>
        )}
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </div>
        )}

        <div className="container mt-5 pt-md-5">
          {/*<div className="row">*/}
          {/*  <div className="col">*/}
          {/*    <Link to="/compte">*/}
          {/*      <ArrowBackIcon/>*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {this.props.updated && (
            <div className="row px-3 mt-5">
              <div className="col-auto mx-auto alert alert-success" role="status">
                Merci de nous avoir fait part de votre avis 😊
              </div>
              <div className="col-12 text-center mt-5">
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    this.props.history.push("/")
                  }}
                >
                  Revenir à l'application
                </Button>
              </div>
            </div>
          )}

          {(item && this.context.currentRatedEvent && !this.props.updated) && (
            <div className="row mt-5">
              <div className="col-12 text-center">
                <Typography variant="h5" gutterBottom>
                  Nous avons besoin de votre avis pour {this.context.eventsToRate.length} évenements !
                </Typography>
              </div>
              <div className="col-12 mt-5 text-center">
                <Typography variant="body1" gutterBottom>
                  Comment s'est déroulée la mission <b>{this.context.currentRatedEvent.name}</b> datant du {new Date(this.context.currentRatedEvent.date)
                  .toLocaleDateString('fr-FR', {weekday: "long", month: "long", day: "numeric"})} {format(eventDate, 'HH')}h{format(eventDate, 'mm') !== 0 ? format(eventDate, 'mm') : ''} de l'association <span><b>{item.name}</b></span> ?
                </Typography>
              </div>
              <div className="col mt-5 text-center">
                <RateAssociationForm
                  loading={this.props.updateLoading}
                  update={true}
                  onSubmit={values => {

                  }}
                  submitForm={this.submitForm}
                  initialValues={item}
                />
              </div>
              <div className={"col-12 mt-5 pt-5 text-center"}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    this.props.update(this.context.user, {ratedEvents: [...this.context.user.ratedEvents, this.context.currentRatedEvent.id]})
                  }}
                >
                  Je n'ai pas participé à la mission
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  retrieved: state.user.update.retrieved,
  retrieveError: state.user.update.retrieveError,
  retrieveLoading: state.user.update.retrieveLoading,
  updateError: state.user.update.updateError,
  updateLoading: state.user.update.updateLoading,
  deleteError: state.user.del.error,
  deleteLoading: state.user.del.loading,
  eventSource: state.user.update.eventSource,
  created: state.user.create.created,
  deleted: state.user.del.deleted,
  updated: state.user.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(RateAssociation);
