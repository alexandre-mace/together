import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { retrieve, reset } from '../../../actions/event/show';
import {Loader} from "../../utils/Loader";
import SingleEvent from "../molecules/SingleEvent";

function Show(props) {
  useEffect(() => {
    props.retrieve(decodeURIComponent(props.match.params.id));
  }, []);

  const item = props.retrieved;

  if (item && item.organizator && !item.organizator.name) {
    props.retrieve(decodeURIComponent(props.match.params.id));
  }

  return (
    <div>
      {props.loading && (
        <Loader/>
      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          {props.error}
        </div>
      )}

      {item && (
        <SingleEvent
          history={props.history}
          item={item}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  retrieved: state.event.show.retrieved,
  updated: state.event.show.updated,
  error: state.event.show.error,
  loading: state.event.show.loading,
  eventSource: state.event.show.eventSource,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);
