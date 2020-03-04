import {authentication} from "../auth/authentication";

const redirectToLoginIfNoUser = (history) => {
  if (!authentication.currentUserValue) {
    history.push('/se-connecter')
  }
};

export default redirectToLoginIfNoUser;
