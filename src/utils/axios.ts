import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG, APP_TOKEN, BASE_API_URL } from 'src/config-global';

// import { BASE_API_URL, APP_TOKEN } from '@/globalConstants'
const baseURL = BASE_API_URL;

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });
const axiosInstance = axios.create({
  baseURL,
  validateStatus(status) {
    return status < 400; // 约束http status<400 的进入resolved
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    refreshToken(response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      window.location.href = '/auth/jwt/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const postFetcher = async (url: string, body: any) => {
  const res = await axiosInstance.post(url, {
    ...body,
  });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    login: '/login',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};

function getToken() {
  return localStorage.getItem(APP_TOKEN);
}

function refreshToken(response: AxiosResponse) {
  const token = response.data && response.data && response.data.token;
  if (token) {
    setToken(token);
  }
}

function setToken(token: string) {
  localStorage.setItem(APP_TOKEN, token);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeToken() {
  localStorage.removeItem(APP_TOKEN);
  axiosInstance.defaults.headers.common.Authorization = '';
  delete axiosInstance.defaults.headers.common.Authorization;
}

export function syncToken(e: StorageEvent) {
  const { key, newValue } = e;
  if (key === APP_TOKEN && newValue) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${newValue}`;
  }
  if (!newValue) {
    delete axiosInstance.defaults.headers?.common?.Authorization;
  }
}
