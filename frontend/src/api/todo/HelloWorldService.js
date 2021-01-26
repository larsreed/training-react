import axios from 'axios';

class HelloWorldService {
  executeHelloWorldService(user) {
    return axios.get('http://localhost:8080/hello-var/' + user);
  }
}

export default new HelloWorldService();
