import React, { Component } from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {LinearProgress} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

class RateAssociationForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>

        {(data && data.type === 'text' || data.type === 'number' || data.type === 'email' || data.type === 'tel') &&
        <TextField
          {...data.input}
          type={data.type}
          variant={data.variant}
          step={data.step}
          label={data.label}
          required={data.required}
          placeholder={data.placeholder}
          id={`event_${data.input.name}`}
          fullWidth
          multiline={data.multiline}
          rows={data.rows}
        />
        }
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Rating
          name={"rating"}
          size="large"
          onChange={(event, newValue) => {
            this.props.submitForm(this.props.initialValues, newValue)
          }}
        />

        {this.props.loading &&
        <div className={"w-100 m-3"}>
          <LinearProgress/>
        </div>
        }
      </form>
    );
  }
}

export default reduxForm({
  form: 'userRate',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(RateAssociationForm);
