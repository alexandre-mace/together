import { handleResponse } from '../handle-response';
import {fetch} from "../dataAccess";

export const authentication = {
    login,
    logout,
    get currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')) }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ email, password })
    };
    return fetch('/authentication_token', requestOptions)
        .then(handleResponse)
        .then(token => {
            return fetch(`/users?email=${email}`)
                .then(user => {return user.json()})
                .then(user => {
                        const storedUser = user['hydra:member'][0];
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(storedUser));
                        localStorage.setItem('currentUserToken', JSON.stringify(token));
                        return storedUser;
                    }
                )

        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserToken');
}
