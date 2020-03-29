import Axios from 'axios';
import { getToken } from './auth';

const instance = Axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000
});

// 全局请求拦截，在请求之前执行
instance.interceptors.request.use(
    config => {
        const token = getToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log(token, 'token')
        console.log(config, 'config')
        return config;
    },
    error => Promise.reject(error)
);
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc0NDQwMzE0N2ZmNDE3YmMwMWI3OWIiLCJ1c2VybmFtZSI6IjMiLCJpZGVudGl0eSI6IjEiLCJpYXQiOjE1ODQ2ODk0MjQsImV4cCI6MTU4NDY5MzAyNH0.Lb0HyQ8U2FT3FyH44zZNaDpkhTjrozKWGxfNLOBjRnw


// 全局响应拦截，在响应前拦截
instance.interceptors.response.use(response => response.data);


const get = (url, params) => instance.get(url, { params });
const post = (url, data) => instance.post(url, data);
const put = (url, data) => instance.put(url, data);
const del = url => instance.delete(url);


export { get, post, put, del };