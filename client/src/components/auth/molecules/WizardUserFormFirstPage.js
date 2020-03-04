import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {TextField} from "formik-material-ui";

const WizardUserFormFirstPage = (props) => (
    <>
      <div className="form-group">
        <Field component={TextField} value={props.formik.values.name ? props.formik.values.name : ''} {...props} label="Nom de l'association ou votre prénom" margin="normal" fullWidth name="name" type="text"/>
        <ErrorMessage {...props}  name="name"  component="div" className="invalid-feedback"/>
      </div>
      <div className="form-group">
        <Field component={TextField} {...props} value={props.formik.values.email ? props.formik.values.email : ''} label="Email" margin="normal" fullWidth name="email" type="text"/>
        <ErrorMessage {...props} name="email" component="div" className="invalid-feedback"/>
      </div>
    </>
);
export default connect(WizardUserFormFirstPage)
