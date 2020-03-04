import React from "react";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Button from "@material-ui/core/Button";

const AccountLink = (props) => (
  <div className="col-auto pl-md-0">
    <Link to={"/compte"}>
      <Button
        variant={props.pathname === '/compte' ? "contained" : "text"}
        color={'primary'}
        className={"d-none d-md-flex"}
        endIcon={
            <AccountCircleRoundedIcon />
        }>
        Mon compte
      </Button>
      <AccountCircleRoundedIcon style={{fontSize: "45px"}} className="account-link-icon d-block d-md-none"/>
    </Link>
  </div>
);
export default AccountLink;
