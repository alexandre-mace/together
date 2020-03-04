import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { authentication } from '../../../utils/auth/authentication';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import {
  LinearProgress, Typography,
} from '@material-ui/core';
import {connect} from "react-redux";
import {retrieve} from "../../../actions/user/show";
import AuthenticationSvg from "../../../utils/svg/AuthenticationSvg";
import VisibilityIcon from '@material-ui/icons/Visibility';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          showPassword: false
        }
    }

    toggleShowPassword() {
      this.setState({
        showPassword: !this.state.showPassword
      })
    }

    render() {
        return(
            <div className="">
              <div className="mb-3 d-inline-block">
                <AuthenticationSvg/>
              </div>
              <Typography className={"mt-3"} variant={"h5"}>
                Se connecter
              </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('L\'addresse email est invalide').required('L\'email est requis'),
                        password: Yup.string().required('Le mot de passe est requis')
                    })}
                    onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authentication.login(email, password)
                            .then(
                                () => {
                                    this.props.retrieve(authentication.currentUserValue['@id']);
                                    this.props.history.push('/');
                                    setSubmitting(false);
                                },
                                error => {
                                    setStatus(error);
                                    setSubmitting(false);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => {
                      return (
                      <Form>
                        <div className="form-group">
                          <Field
                            component={TextField}
                            name="email"
                            margin='normal'
                            type="text"
                            label="Votre email"
                            fullWidth
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group d-flex position-relative">
                          <Field
                            component={TextField}
                            name="password"
                            margin='normal'
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Votre mot de passe"
                            fullWidth
                          />
                           <VisibilityIcon className={"show-password"} onClick={() => this.toggleShowPassword()} color={this.state.showPassword ? "primary" : "disabled"}/>
                          <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group text-center">
                          {isSubmitting ? (
                            <LinearProgress/>
                          ) : (
                            <Button
                              disabled={Object.entries(touched).length === 0 || (Object.entries(touched).length > 0 && Object.entries(errors).length > 0 )}
                              type="submit"
                              variant="contained"
                              color={'primary'}>Se connecter</Button>
                          )}
                        </div>
                      </Form>
                      )
                    }}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

