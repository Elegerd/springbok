import request from "../routes/request";

export function signIn(user: { username: string; password: string }, fingerprint: any) {
    let data = {
        username: user.username,
        password: user.password,
        fingerprint: fingerprint
    };
    return new Promise((resolve, reject) => {
        request.post(`api/sign_in`, data)
            .then(response => {
                setAuthToken(response.data.token);
                return resolve(response)
            })
            .catch(error => reject(error))
    })
}

export function signUp (data: { email: string, username: string, password: string }) {
    return new Promise((resolve, reject) => {
        request.post(`api/sign_up`, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function verifyToken() {
    return new Promise((resolve, reject) => {
        request.get('api/verifyToken')
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export function getAccessToken () {
    return localStorage.getItem('accessToken')
}

export function getRefreshToken () {
    return localStorage.getItem('accessToken')
}

export function setAuthToken (token: { accessToken: string, refreshToken: string }) {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
}