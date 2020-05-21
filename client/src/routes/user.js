import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/user/';
import UpdateUserPage from "../pages/user/UpdateUserPage";
import RateAssociationPage from "../pages/user/RateAssociationPage";
import {PrivateRoute} from "../utils/security/PrivateRoute";

export default [
  <Route path="/users/create" component={Create} exact key="create" />,
  <Route path="/users/edit/:id" component={UpdateUserPage} exact key="update" />,
  <PrivateRoute path="/users/rate/:id" component={RateAssociationPage} exact key="rate" />,
  <Route path="/users/show/:id" component={Show} exact key="show" />,
  <Route path="/users/" component={List} exact strict key="list" />,
  <Route path="/users/:page" component={List} exact strict key="page" />
];
