import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {TextField} from "formik-material-ui";

const WizardUserFormSecondPage = (props) => (
  <>
    <div className="form-group">
      <Field component={TextField} {...props} value={props.formik.values.contactEmail ? props.formik.values.contactEmail : ''} label="Email affiché pour les participants" margin="normal" fullWidth name="contactEmail" type="text"/>
      <ErrorMessage {...props} name="contactEmail" component="div" className="invalid-feedback"/>
    </div>
    <div className="form-group">
      <Field component={TextField} value={props.formik.values.contactPhone ? props.formik.values.contactPhone : ''} {...props} label="Numéro de téléphone affiché pour les participants" margin="normal" fullWidth name="contactPhone" type="tel"/>
      <ErrorMessage {...props}  name="contactPhone"  component="div" className="invalid-feedback"/>
    </div>
  </>
);
export default connect(WizardUserFormSecondPage)
