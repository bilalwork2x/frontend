import axios, { type AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    const existingHeaders = config.headers as AxiosRequestHeaders;
    const existingAuthHeader = existingHeaders.get('Authorization') ?? '';
    if (token && token !== existingAuthHeader) {
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as unknown as AxiosRequestHeaders;
      config.headers = headers;
    }


    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    return Promise.reject(error);
  }
);
// Response interceptor for handling 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
      clearAPIAuthToken(); // Clear the token
      if (!window.location.pathname.includes('/auth')) {
        window.location.replace("/auth/login");
      }
    }
    return Promise.reject(error);
  }
);
export const setAPIAuthToken = (token: string) => {
  Cookies.set('token', token, { expires: 30 });
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAPIAuthToken = () => {
  Cookies.remove('token');
  api.defaults.headers.common.Authorization = null;
};

export default api;
