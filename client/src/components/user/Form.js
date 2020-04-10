import React, { Component } from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {LinearProgress} from "@material-ui/core";

class Form extends Component {
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
        <Field
          component={this.renderField}
          name="name"
          type="text"
          label="Nom de compte"
          variant={"filled"}
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="email"
          type="email"
          label="email"
          variant={"filled"}
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="contactEmail"
          type="email"
          label="Email de contact"
          variant={"filled"}
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="contactPhone"
          type="tel"
          label="Téléphone de contact"
          variant={"filled"}
          placeholder=""
          required={true}
        />
        {/*<Field*/}
        {/*  component={this.renderField}*/}
        {/*  name="password"*/}
        {/*  type="text"*/}
        {/*  variant={"filled"}*/}
        {/*  placeholder="The hashed password"*/}
        {/*  required={true}*/}
        {/*/>*/}

        {!this.props.loading &&
        <Button color="primary" type="submit" variant="contained">
          {this.props.update ? "Enregistrer les modifications" : "Valider"}
        </Button>
        }
        {this.props.loading &&
        <div className={"w-100"}>
          <LinearProgress/>
        </div>
        }
      </form>
    );
  }
}

export default reduxForm({
  form: 'user',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
