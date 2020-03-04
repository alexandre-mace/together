import {authentication} from "./authentication";

const logout = (history) => {
  authentication.logout()
  history.push('/')
};

export default logout;
