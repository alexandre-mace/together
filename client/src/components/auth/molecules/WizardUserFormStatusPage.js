import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {Typography} from "@material-ui/core";
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';

const WizardUserFormStatusPage = (props) => (
  <>
    <Typography className={"mt-3"} variant={"h6"}>
      Vous êtes
    </Typography>
    <Field component={RadioGroup} name="status" className={"d-flex justify-content-center flex-row"}
           value={props.formik.values.status ? props.formik.values.status : ''} {...props}
    >
      <FormControlLabel
        value="volunteer"
        control={<Radio/>}
        color={"primary"}
        onChange={() => {
          props.formik.setTouched({"status": true});
          localStorage.setItem("status", "volunteer")
        }}
        label="Un bénévole"
      />
      <FormControlLabel
        value="association"
        control={<Radio/>}
        label="Une association"
        onChange={() => {
          props.formik.setTouched({"status": true});
          localStorage.setItem("status", "association")
        }}
      />
    </Field>
    <ErrorMessage {...props} name="status" component="div" className="invalid-feedback"/>
  </>
);
export default connect(WizardUserFormStatusPage)
