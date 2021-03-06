import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DateTimePicker } from "@material-ui/pickers";
import SearchInput from "../utils/SearchInput";
import {Checkbox, FormControlLabel, LinearProgress} from "@material-ui/core";

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  setPosition = ({lat, lng}) => {
    this.props.dispatch(change('event', 'latitude', lat));
    this.props.dispatch(change('event', 'longitude', lng));
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

    let currentDateValue = new Date();

    if (data.type === 'dateTime') {
      if (typeof data.input.value === 'string' && data.input.value !== "" && !this.props.update) {
        const inputValue = data.input.value.replace(new RegExp('-', "g"), '/');
        let date = inputValue.split(' ')[0];
        let time = inputValue.split(' ')[1];

        let year = parseInt(date.split('/')[2]);
        let month = parseInt(date.split('/')[1]);
        let day = parseInt(date.split('/')[0]);
        let hour = parseInt(time.split(':')[0]);
        let minute = parseInt(time.split(':')[1]);

        currentDateValue = new Date(year, month - 1, day, hour, minute, 0)
      }
    }

      return (
      <div className={`form-group`}>

        {(data && data.type === 'text' || data.type === 'number') &&
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
        {(data && data.type === 'checkbox') &&
        <FormControlLabel
          control={
          <Checkbox
          {...data.input}
          checked={data.input.checked}
          required={data.required}
          id={`event_${data.input.name}`}
          color="primary"
          />
        }
          label={data.label}
          />
        }
        {data && data.type === 'dateTime' &&
        <DateTimePicker
          {...data.input}
          onChange={(value) => {
            this.props.dispatch(change('event', 'date', value));
          }}
          autoOk
          inputVariant="filled"
          format="dd/MM/yyyy HH:mm"
          value={
            typeof data.input.value === "object"
              ? data.input.value
              : data.input.value !== ''
                ? currentDateValue
                : new Date()
          }
          ampm={false}
          disablePast
          label={data.label}
          fullWidth
          error={false}
          helperText={null}
        />
        }
        {data && data.type === 'address' &&
          <SearchInput
            {...data.input}
            label={data.label}
            setPosition={this.setPosition}
            placeholder={data.input.value ? data.input.value : false}
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
          variant={"filled"}
          name="name"
          type="text"
          label="Nom"
          required={true}
        />
        <Field
          component={this.renderField}
          name="description"
          variant={"filled"}
          type="text"
          label="Description"
          required={true}
          multiline
          rows="4"
        />
        <Field
          component={this.renderField}
          name="maxPlaces"
          variant={"filled"}
          type="number"
          label="Nombre maximum de bénévoles"
          required={true}
        />
        <Field
          component={this.renderField}
          name="date"
          variant="filled"
          type="dateTime"
          label="Date"
          required={true}
        />
        <Field
          component={this.renderField}
          name="address"
          type="address"
          label="Adresse"
          required={true}
        />
        <Field
          component={this.renderField}
          name="autoAccept"
          type="checkbox"
          label="Auto acceptation de bénévole"
        />
        {!this.props.loading &&
        <Button color="primary" type="submit" variant="contained">
          {this.props.update ? "Enregistrer les modifications" : "Ajouter la mission"}
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
  form: 'event',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: {
    'date': new Date(),
    'autoAccept': false
  }
})(Form);
