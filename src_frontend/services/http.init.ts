import axios, { AxiosInstance } from 'axios'
import * as authService from '../services/auth.service'
import { API_URL } from '../.env'

export default class Http {
    private readonly isAuth: Boolean;
    private readonly instance: AxiosInstance;

    constructor (status: { auth: any; }) {
        this.isAuth = status && status.auth ? status.auth : false;
        this.instance = axios.create({
            baseURL: API_URL
        });

        // @ts-ignore
        return this.init()
    }

    init () {
        if (this.isAuth) {
            this.instance.interceptors.request.use(request => {
                request.headers['token'] = authService.getAccessToken();
                return request;
            }, error => {
                return Promise.reject(error)
            });

            return this.instance
        }
        return this.instance
    }
}