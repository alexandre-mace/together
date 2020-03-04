import React from "react";
import {ErrorMessage, Field} from "formik";
import {TextField} from "formik-material-ui";

export default (props) => (
  <div>
    <div className="form-group">
      <Field component={TextField} label="Mot de passe" margin="normal" fullWidth name="password" type="password" />
      <ErrorMessage name="password" component="div" className="invalid-feedback" />
    </div>
    <div className="form-group">
      <Field component={TextField} label="Confirmez le mot de passe" margin="normal" fullWidth name="confirmPassword" type="password" />
      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
    </div>
  </div>
);
