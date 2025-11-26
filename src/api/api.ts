import axios, {AxiosError, AxiosResponse} from 'axios';

export const createApi = () => {
  const api = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('six-cities-token');
      if (token) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('six-cities-token');
      }
      return Promise.reject(error);
    }
  );

  return api;
};
