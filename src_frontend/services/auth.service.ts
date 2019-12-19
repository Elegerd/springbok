import axios from 'axios'

export function signIn (username: string, password: string) {
    return new Promise((resolve, reject) => {
        axios.post(`api/sign_in`, { username, password })
            .then(response => {
                _setAuthData(response);
                return resolve(response)
            }).catch(error => reject(error))
    })
}

export function signUp (username: string, password: string, email: string, name: string) {
    return new Promise((resolve, reject) => {
        axios.post(`api/sign_up`, { username, password, email, name })
            .then(response => {
                return resolve(response)
            }).catch(error => reject(error))
    })
}

export function getAccessToken () {
    return localStorage.getItem('accessToken')
}

function _setAuthData (response: any) {
    localStorage.setItem('accessToken', response.data.accessToken);
}