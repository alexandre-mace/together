import React, {useState} from "react";
import {ErrorMessage, Field} from "formik";
import {TextField} from "formik-material-ui";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="form-group">
        <div className="d-flex position-relative">
          <Field component={TextField} variant={"filled"} label="Mot de passe" margin="normal" fullWidth name="password"
                 type={showPassword ? 'text' : 'password'}
          />
          <VisibilityIcon className={"show-password"} onClick={() => setShowPassword(!showPassword)} color={showPassword ? "primary" : "disabled"}/>
          <ErrorMessage name="password" component="div" className="invalid-feedback"/>
        </div>
      </div>
      <div className="form-group">
        <div className="d-flex position-relative">
          <Field component={TextField} variant={"filled"} label="Confirmez le mot de passe" margin="normal" fullWidth
                 name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
          />
          <VisibilityIcon className={"show-password"} onClick={() => setShowConfirmPassword(!showConfirmPassword)} color={showConfirmPassword ? "primary" : "disabled"}/>
        </div>
        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
      </div>
    </div>
  )
};
