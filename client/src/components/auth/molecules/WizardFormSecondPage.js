import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {TextField} from "formik-material-ui";
import {Typography} from "@material-ui/core";

const WizardUserFormSecondPage = (props) => (
  <>
    <Typography className={"mt-3"} variant={"h6"}>
      Information de contact (affichées pour les participants)
    </Typography>
    <div className="form-group">
      <Field component={TextField} {...props} value={props.formik.values.contactEmail ? props.formik.values.contactEmail : ''} variant={"filled"} label="Email de contact" margin="normal" fullWidth name="contactEmail" type="text"/>
      <ErrorMessage {...props} name="contactEmail" component="div" className="invalid-feedback"/>
    </div>
    <div className="form-group">
      <Field component={TextField} value={props.formik.values.contactPhone ? props.formik.values.contactPhone : ''} {...props} variant={"filled"} label="Numéro de téléphone de contact" margin="normal" fullWidth name="contactPhone" type="tel"/>
      <ErrorMessage {...props}  name="contactPhone"  component="div" className="invalid-feedback"/>
    </div>
  </>
);
export default connect(WizardUserFormSecondPage)
