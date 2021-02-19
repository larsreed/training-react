import axios from 'axios';
import { BASE_URL } from './Constants';
import { SESSION_TOKEN } from './AuthenticationService';

// created since Axios interceptors kept disappearing :(

const todoApi = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem(SESSION_TOKEN);
    config.headers.Authorization = token ? `${token}` : '';
    return config;
  });

  return instance;
};

export default todoApi();
