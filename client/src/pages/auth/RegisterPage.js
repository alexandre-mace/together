import React from 'react';
import Layout from "../../components/Layout";
import Register from "../../components/auth/organisms/Register";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

const RegisterPage = (props) => (
  <Layout {...props}>
    <div className="container min-full-screen-page mt-md-5 pt-md-5">
      <div className="row my-3">
        <div className="col">
            <IconButton onClick={() => props.history.push("/")} className={"color-white"}>
              <ArrowBackIcon/>
            </IconButton>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <Register {...props}/>
        </div>
        <div className="col-12 text-center mt-3">
          <Typography variant={"body1"}>
            Vous avez déjà un compte compte ? <br/>
            <Link to="/se-connecter">
              Se connecter
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  </Layout>
)
export default RegisterPage
