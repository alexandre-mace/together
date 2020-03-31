import React from "react";
import {PROJECT_NAME} from "../../config/project";

const Logo = (props) => (
      <div className="d-none d-md-block col w-100">
        <span className="logo" onClick={() => props.history.push('/')}>{PROJECT_NAME}</span>
      </div>
);
export default Logo;
