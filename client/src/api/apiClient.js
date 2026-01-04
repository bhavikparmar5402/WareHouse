import axios from 'axios';

const resolveBaseUrl = () => {
  // if (import.meta.env.VITE_API_BASE_URL) {
  //   return import.meta.env.VITE_API_BASE_URL;
  // }

  // if (typeof window !== 'undefined' && window.location?.hostname) {
  //   const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  //   const port = import.meta.env.VITE_API_PORT || 5000;
  //   return `${protocol}://${window.location.hostname}:${port}/api`;
  // }

  return 'https://mount-hiring-produces-focusing.trycloudflare.com/api';
};

const apiClient = axios.create({
  // baseURL: resolveBaseUrl(),
  baseURL: '/api',
  withCredentials: true,
});

export default apiClient;
