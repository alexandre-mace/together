import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
import event from './reducers/event/';
import eventRoutes from './routes/event';
import user from './reducers/user/';
import userRoutes from './routes/user';
import './app.scss';
import DiscoverEventsPage from "./pages/event/DiscoverEventsPage";
import AccountPage from "./pages/user/AccountPage";
import OnBoardingPage from "./pages/onboarding/OnBoardingPage";
import {PrivateRoute} from "./utils/security/PrivateRoute";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import InterestedEventsPage from "./pages/event/InterestedEventsPage";
import OrganizedEventsPage from "./pages/event/OrganizedEventsPage";
import ConfirmRegistrationPage from "./pages/auth/ConfirmRegistrationPage";
import ConfirmEventCreatedPage from "./pages/event/ConfirmEventCreatedPage";

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    /* Add your reducers here */
    event,
    user
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        { userRoutes }
        { eventRoutes }
        <Route path="/se-connecter" component={LoginPage} />
        <Route path="/s'inscrire" component={RegisterPage} />
        <PrivateRoute path="/compte" component={AccountPage}/>
        <PrivateRoute path="/mon-agenda" component={InterestedEventsPage}/>
        <PrivateRoute path="/mes-evenements" component={OrganizedEventsPage}/>
        <Route path="/confirmation-inscription" component={ConfirmRegistrationPage} />
        <Route path="/confirmation-evenement-ajouté" component={ConfirmEventCreatedPage} />
        <Route path="/bienvenue" component={OnBoardingPage} />
        <Route path="/" component={DiscoverEventsPage}/>
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
