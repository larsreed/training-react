class AuthenticationService {
  registerLogin(username, password) {
    sessionStorage.setItem('authenticatedUser', username);
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
}

export default new AuthenticationService();
