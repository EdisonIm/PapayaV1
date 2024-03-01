import axios from 'axios';

import setupInterceptorsTo from './interceptors';

import Config from 'react-native-config';
const instance = axios.create({
  baseURL: Config.API_URL,
  // baseURL: import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_APP_PUBLIC_URL : import.meta.env.VITE_APP_LOCAL_URL,
});

export default setupInterceptorsTo(instance);
