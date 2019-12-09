import * as React from 'react';

class Login extends React.Component {

    state = {
        login: "",
        endpoint: "ws://localhost:3001/",
    };

    handleResponse(response: Response) {
        return response.ok
            ? response.json().then((data) => JSON.stringify(data, null, 2))
            : Promise.reject(new Error('Unexpected response'));
    }

    login() {
        let data = {
            name: this.state.login
        };
        fetch('api/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(res => this.handleResponse(res))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    public render(): JSX.Element {
        return (
            <>
                <input onChange={e => this.setState({login: e.target.value})}/>
                <button onClick={() => this.login()}> LOGIN </button>
            </>
        );
    }
}

export default Login;