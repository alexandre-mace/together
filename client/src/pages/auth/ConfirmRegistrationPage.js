import React from 'react';
import Layout from "../../components/Layout";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import BeerCelebrationSvg from "../../utils/svg/BeerCelebrationSvg";
import Button from '@material-ui/core/Button';
import {PROJECT_NAME} from "../../config/project";
import {authentication} from "../../utils/auth/authentication";

const ConfirmRegistrationPage = (props) => (
  <Layout {...props}>
    <div className="container-fluid full-screen-page d-flex flex-column">
      <div className="row h-100">
        <div className="col-12 text-center mt-5 mb-3">
          <Typography variant="h5" gutterBottom>
            Bravo ! <br/> Vous faites maintenant parti des
            {authentication.currentUserValue.status === "association" ? "associations" : "membres"} de {PROJECT_NAME} !
          </Typography>
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <div>
            <BeerCelebrationSvg/>
          </div>
        </div>
        <div className="col-12 mt-auto text-center">
          <Typography variant="body1" gutterBottom>
            {authentication.currentUserValue.status === "association"
              ? "Ajoutez votre mission et recevez le service des bénévoles de la plateforme 😊"
              : "Découvrez les missions en faveur du climat proches de chez vous 😊"
            }
          </Typography>
        </div>
        <div className="col-12 mt-3 text-center">
          <Link to={'/'}>
            <Button color={"primary"} variant={"contained"}>
              {authentication.currentUserValue.status === "association"
                ? "Accéder à l'interface"
                : "Découvrir"
              }
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default ConfirmRegistrationPage
