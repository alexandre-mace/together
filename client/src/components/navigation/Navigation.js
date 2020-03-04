import React from "react";
import Logo from "./Logo";
import AccountLink from "./AccountLink";
import AppBottomNavigation from "./AppBottomNavigation";
import AppTopNavigation from "./AppTopNavigation";
import HomeLink from "./HomeLink";
import {authentication} from "../../utils/auth/authentication";

const Navigation = props => (
  <>
    <div className="container">
      <div className="row align-items-center">
        <Logo history={props.history}/>
        <div className={"d-none d-md-block"}>
          <AppTopNavigation {...props}/>
        </div>
        {authentication.currentUserValue &&
        <AccountLink
          pathname={props.location.pathname}
        />
        }
      </div>
    </div>
    <div className={"d-block d-md-none"}>
      {(props.location.pathname !== '/se-connecter' && props.location.pathname !== '/s\'inscrire') &&
      <AppBottomNavigation {...props}/>
      }
    </div>
  </>
);
export default Navigation;
