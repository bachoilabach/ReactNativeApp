import axios from 'axios';

const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

http.interceptors.request.use(
    (config) => {
        // * Token
        return config;
    },
    (error) => {
        
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('HTTP Error:', error);
        return Promise.reject(error);
    }
);

export default http;