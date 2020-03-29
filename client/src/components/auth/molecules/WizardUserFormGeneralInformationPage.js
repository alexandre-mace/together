import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {TextField} from "formik-material-ui";
import {Typography} from "@material-ui/core";

const WizardUserFormGeneralInformationPage = (props) => {
  return (
  <>
    <Typography className={"mt-3"} variant={"h6"}>
      Information du compte
    </Typography>
    <div className="form-group">
      <Field component={TextField} variant={"filled"}
             value={props.formik.values.name ? props.formik.values.name : ''} {...props}
             label={localStorage.getItem("status") === "volunteer" ? "Prénom" : "Nom de votre association"} margin="normal"
             fullWidth name="name" type="text"/>
      <ErrorMessage {...props} name="name" component="div" className="invalid-feedback"/>
    </div>
    <div className="form-group">
      <Field component={TextField} {...props} variant={"filled"}
             value={props.formik.values.email ? props.formik.values.email : ''} label="Email" margin="normal" fullWidth
             name="email" type="text"/>
      <ErrorMessage {...props} name="email" component="div" className="invalid-feedback"/>
    </div>
  </>)
};
export default connect(WizardUserFormGeneralInformationPage)
