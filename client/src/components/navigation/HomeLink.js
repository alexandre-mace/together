import {Link} from "react-router-dom";
import React from "react";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const HomeLink = () => (
  <div className="col-auto">
    <Link to={"/"}>
      <ArrowBackRoundedIcon style={{fontSize: "40px"}} color="primary"/>
    </Link>
  </div>
);
export default HomeLink;
