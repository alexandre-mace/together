import React from "react";
import {navigationLinks} from "../../config/navigation/navigationLinks";
import {authentication} from "../../utils/auth/authentication";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

const AppTopNavigation = props => (
  <div className={"col-auto"}>
    {navigationLinks.map((link, index) => {
      if ((!authentication.currentUserValue && link.private === false) || authentication.currentUserValue) {
        return (
          <Link key={index} to={`/${link.route}`}>
            <Button className={"ml-3"} variant={props.location.pathname === `/${link.route}` ? "contained" : "text"} color={'primary'}>{link.label}</Button>
          </Link>
        )
      }
    })}
    {!authentication.currentUserValue &&
    <Link to={`/se-connecter`}>
      <Button className={"ml-3"} variant={props.location.pathname === "/se-connecter"? "contained" : "text"} color={'primary'}>Se connecter</Button>
    </Link>
    }
  </div>
);
export default AppTopNavigation;
