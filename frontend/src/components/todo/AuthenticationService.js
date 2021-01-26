import axios from 'axios';

class AuthenticationService {

  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  authenticate(username, password) {
    // console.log("ding")
    // return axios.get("http://localhost:8080/users/foo/todos", {headers: {authorization: this.createBasicAuthToken(username, password)}});
    return axios.get("http://localhost:8080/basicauth", {headers: {authorization: this.createBasicAuthToken(username, password)}});
  }

  registerLogin(username, password) {
    sessionStorage.setItem('authenticatedUser', username);
    this.setupAuthInterceptors(this.createBasicAuthToken(username, password))
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }

  currentUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  isUserLoggedIn() {
    return !(this.currentUser() == null);
  }

  setupAuthInterceptors(basicAuthHeader) {
    // console.log("intercept0")
    if (this.isUserLoggedIn()) {
      // console.log("intercept1")
      axios.interceptors.request.use(
      (config) =>  {
        // console.log("intercepting")
        config.headers.authorization = basicAuthHeader
        return config;
      })
    }
  }
}

export default new AuthenticationService();
