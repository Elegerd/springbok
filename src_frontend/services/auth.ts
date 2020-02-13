import request from "../routes/request";
import Fingerprint from "./fingerprint";

export function signIn(user: { username: string; password: string }) {
    return new Promise((resolve, reject) => {
        Fingerprint()
            .then(fingerprint => {
                let data = {
                    username: user.username,
                    password: user.password,
                    fingerprint: fingerprint
                };
                request.post(`/api/users/sign_in`, data)
                    .then(response => {
                        setAuthToken(response.data.token);
                        return resolve(response)
                    })
                    .catch(error => reject(error))
            })
            .catch(err => reject(err));
    });
}

export function signUp (data: { email: string, username: string, password: string }) {
    return new Promise((resolve, reject) => {
        request.post(`/api/users/sign_up`, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function verifyToken() {
    return new Promise((resolve, reject) => {
        request.get('/api/tokens/verification')
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


export function refreshToken() {
    return new Promise((resolve, reject) => {
        Fingerprint()
            .then(fingerprint => {
                let data = {
                    refreshToken: getRefreshToken(),
                    fingerprint: fingerprint
                };
                request.post('/api/tokens/refresh', data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err));
    })
}

export function getAccessToken () {
    return localStorage.getItem('accessToken')
}

export function getRefreshToken () {
    return localStorage.getItem('refreshToken')
}

export function setAuthToken (token: { accessToken: string, refreshToken: string }) {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
}