import axios from 'axios';
import { BASE_URL } from './Constants';

export const SESSION_USERNAME = 'authenticatedUser';
export const SESSION_TOKEN = 'authToken';

class AuthenticationService {
  authenticateBasic(username, password) {
    return axios.get(BASE_URL + '/basicauth', {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerLogin(username, password) {
    let token = this.createBasicAuthToken(username, password);
    sessionStorage.setItem(SESSION_USERNAME, username);
    sessionStorage.setItem(SESSION_TOKEN, token);
    this.setupAuthInterceptors();
  }

  authenticate(username, password) {
    return axios.post(BASE_URL + '/authenticate', {
      username,
      password,
    });
  }

  createJwtAuthToken(token) {
    return 'Bearer ' + token;
  }

  registerJwtLogin(username, inToken) {
    let token = this.createJwtAuthToken(inToken);
    sessionStorage.setItem(SESSION_USERNAME, username);
    sessionStorage.setItem(SESSION_TOKEN, token);
    this.setupAuthInterceptors();
  }

  logout() {
    sessionStorage.removeItem(SESSION_USERNAME);
    sessionStorage.removeItem(SESSION_TOKEN);
  }

  currentUser() {
    return sessionStorage.getItem(SESSION_USERNAME);
  }

  isUserLoggedIn() {
    return !(this.currentUser() == null);
  }

  hackBackInterceptors() {
    console.log("Auuuuu")
    console.log(axios.interceptors.request)
    this.setupAuthInterceptors();
  }

  
  setupAuthInterceptors() {
    let header = sessionStorage.getItem(SESSION_TOKEN);
    // console.log("intercept0")
    if (this.isUserLoggedIn()) {
      // console.log("intercept1")
      axios.interceptors.request.use(function todoSecurity(config) {
        // console.log("intercepting")
        config.headers.authorization = header;
        return config;
      });
    }
  }
}

export default new AuthenticationService();
