import todoApi from './ApiService';

export const SESSION_USERNAME = 'authenticatedUser';
export const SESSION_TOKEN = 'authToken';

class AuthenticationService {
  authenticateBasic(username: string, password: string) {
    return todoApi.get('/basicauth', {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  createBasicAuthToken(username: string, password: string): string {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerLogin(username: string, password: string) {
    let token = this.createBasicAuthToken(username, password);
    sessionStorage.setItem(SESSION_USERNAME, username);
    sessionStorage.setItem(SESSION_TOKEN, token);
  }

  authenticate(username: string, password: string) {
    return todoApi.post('/authenticate', {
      username,
      password,
    });
  }

  createJwtAuthToken(token: string): string {
    return 'Bearer ' + token;
  }

  registerJwtLogin(username: string, inToken: string) {
    let token = this.createJwtAuthToken(inToken);
    sessionStorage.setItem(SESSION_USERNAME, username);
    sessionStorage.setItem(SESSION_TOKEN, token);
  }

  logout() {
    sessionStorage.removeItem(SESSION_USERNAME);
    sessionStorage.removeItem(SESSION_TOKEN);
  }

  currentUser(): string {
    let user= sessionStorage.getItem(SESSION_USERNAME);
    return user? user : "";
  }

  isUserLoggedIn(): boolean {
    return !(this.currentUser() == null);
  }
}

export default new AuthenticationService();
