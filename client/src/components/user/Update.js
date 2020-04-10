import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/user/update';
import { del } from '../../actions/user/delete';
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
    if (this.props.deleted) return <Redirect to=".." />;

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
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </div>
        )}

        <div className="container mt-5 pt-md-5">
          <div className="row">
            <div className="col">
              <Link to="/compte">
                <ArrowBackIcon/>
              </Link>
            </div>
          </div>
          {this.props.updated && (
            <div className="row mt-3">
              <div className="col alert alert-success" role="status">
                Vos informations ont été mises à jour avec succès.
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

export default connect(mapStateToProps, mapDispatchToProps)(Update);
