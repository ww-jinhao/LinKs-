import axios, { type AxiosInstance,type AxiosError,type AxiosResponse,type InternalAxiosRequestConfig } from 'axios';
//创建axios实例
const instance:AxiosInstance = axios.create({
  baseURL:"http://47.236.204.237:3000",
  timeout:3000,
  headers:{
    "Content-Type":"application/json",
  }
})

//请求拦截器，添加token
instance.interceptors.request.use((config:InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, (error: AxiosError)=> {
  return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

export interface Result<T> {
  message: string
  code: number
  data: T
  [key: string]: any
}

export const http = {
  get<T>(url: string, params?: object): Promise<Result<T>> {
    return instance.get<T, Result<T>>(url, {params});
  },
  post<T>(url: string, data?: object): Promise<Result<T>> {
    return instance.post<T, Result<T>>(url, data);
  },

  put<T>(url: string, data?: object): Promise<Result<T>> {
    return instance.put<T, Result<T>>(url, data);
  },

  delete<T>(
    url: string
  ): Promise<Result<T>> {
    return instance.delete<T, Result<T>>(url);
  },
};
