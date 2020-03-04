import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/event/create';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created)
      return (
        <Redirect
          to={`/confirmation-evenement-ajouté`}
        />
      );

    return (
      <div>
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
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
          <div className="row mt-5">
            <div className="col">
              <Form loading={this.props.loading} onSubmit={this.props.create} values={this.props.item} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.event.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
