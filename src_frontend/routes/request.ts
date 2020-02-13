import axios from 'axios';

const request = () => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let instance = axios.create(defaultOptions);

    // Set the access token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('accessToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default request();