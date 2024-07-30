import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf-token'))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['csrf-token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
