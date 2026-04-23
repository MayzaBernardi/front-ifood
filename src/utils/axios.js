import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}`
});

api.interceptors.response.use(
    (response) => response.data
);


export default api;