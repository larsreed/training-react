import axios from 'axios';
import { BASE_URL } from '../../components/todo/Constants';


class HelloWorldService {
  executeHelloWorldService(user) {
    return axios.get(BASE_URL + '/hello-var/' + user);
  }
}

export default new HelloWorldService();
