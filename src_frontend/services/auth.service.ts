import axios from 'axios'

export function signIn (data: { username: string, password: string }) {
    return new Promise((resolve, reject) => {
        axios.post(`api/sign_in`, data)
            .then(response => {
                _setAuthData(response);
                return resolve(response)
            }).catch(error => reject(error))
    })
}

export function signUp (data: { email: string, username: string, password: string }) {
    return new Promise((resolve, reject) => {
        axios.post(`api/sign_up`, data)
            .then(response => {
                return resolve(response)
            }).catch(error => reject(error))
    })
}

export function getAccessToken () {
    return localStorage.getItem('accessToken')
}

export function getRefreshToken () {
    return localStorage.getItem('accessToken')
}

function _setAuthData (response: any) {
    axios.defaults.headers['authorization'] = response.data.token.type + ' ' + response.data.token.accessToken;
    localStorage.setItem('accessToken', response.data.token.accessToken);
    localStorage.setItem('refreshToken', response.data.token.refreshToken);
}