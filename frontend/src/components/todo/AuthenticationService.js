import todoApi from './ApiService';

export const SESSION_USERNAME = 'authenticatedUser';
export const SESSION_TOKEN = 'authToken';

class AuthenticationService {
  authenticateBasic(username, password) {
    return todoApi.get('/basicauth', {
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
  }

  authenticate(username, password) {
    return todoApi.post('/authenticate', {
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
}

export default new AuthenticationService();
