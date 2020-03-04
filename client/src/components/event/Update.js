import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/event/update';
import { del } from '../../actions/event/delete';
import {Loader} from "../utils/Loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class Update extends Component {
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

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  render() {
    const item = this.props.updated ? this.props.updated : this.props.retrieved;

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

        <div className="container mt-5 pt-md-5">
          <div className="row">
            <div className="col">
              <Link to="/mes-evenements">
                <ArrowBackIcon/>
              </Link>
            </div>
          </div>
          {this.props.updated && (
              <div className="row mt-3">
                <div className="col alert alert-success" role="status">
                  L'évenement {this.props.updated['@id'].name} a été mis à jour avec succès.
                </div>
            </div>
          )}
          {item && (
            <div className="row mt-5">
              <div className="col">
                <Form
                  loading={this.props.updateLoading}
                  update={true}
                  onSubmit={values => this.props.update(item, values)}
                  initialValues={item}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  retrieved: state.event.update.retrieved,
  retrieveError: state.event.update.retrieveError,
  retrieveLoading: state.event.update.retrieveLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(Update);
