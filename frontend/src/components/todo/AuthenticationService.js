import axios from 'axios';
import { BASE_URL } from './Constants';

export const SESSION_USERNAME = 'authenticatedUser';

class AuthenticationService {
  authenticateBasic(username, password) {
    // console.log("ding")
    // return axios.get(BASE_URL + "/users/foo/todos", {headers: {authorization: this.createBasicAuthToken(username, password)}});
    return axios.get(BASE_URL + '/basicauth', {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  authenticate(username, password) {
    return axios.post(BASE_URL + '/authenticate', {
      username,
      password,
    });
  }

  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  createJwtAuthToken(token) {
    return 'Bearer ' + token;
  }

  registerLogin(username, password) {
    sessionStorage.setItem(SESSION_USERNAME, username);
    this.setupAuthInterceptors(this.createBasicAuthToken(username, password));
  }

  registerJwtLogin(username, token) {
    sessionStorage.setItem(SESSION_USERNAME, username);
    this.setupAuthInterceptors(this.createJwtAuthToken(token));
  }

  logout() {
    sessionStorage.removeItem(SESSION_USERNAME);
  }

  currentUser() {
    return sessionStorage.getItem(SESSION_USERNAME);
  }

  isUserLoggedIn() {
    return !(this.currentUser() == null);
  }

  setupAuthInterceptors(basicAuthHeader) {
    // console.log("intercept0")
    if (this.isUserLoggedIn()) {
      // console.log("intercept1")
      axios.interceptors.request.use((config) => {
        // console.log("intercepting")
        config.headers.authorization = basicAuthHeader;
        return config;
      });
    }
  }
}

export default new AuthenticationService();
