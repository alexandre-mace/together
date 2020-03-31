import React from 'react';
import Layout from "../../components/Layout";
import Login from "../../components/auth/organisms/Login";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";

const LoginPage = (props) => (
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
                    <Login {...props}/>
                </div>

                <div className="col-12 text-center mt-3">
                    <Typography variant={"body1"}>
                        Vous n'avez pas encore de compte ? <br/>
                        <Link to="/s'inscrire">
                            S'inscrire
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    </Layout>
);
export default LoginPage;
