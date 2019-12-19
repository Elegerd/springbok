import * as React from 'react';
import { withRouter } from "react-router-dom"
import { History } from 'history';
import { signUp } from '../services/auth.service'

interface ISignUpProps {
    history : History
}

class SignUp extends React.Component<ISignUpProps> {

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
    };

    signUp() {
        let data = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        signUp(data.username, data.password, data.email, data.name)
            .then((res: any) => {
                console.log(res);
                this.props.history.push("/");
            })
            .catch(err => console.error(err));
    }

    public render(): JSX.Element {
        return (
            <>
                <input placeholder={'Login'} onChange={e => this.setState({login: e.target.value})}/>
                <input placeholder={'Username'} onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder={'Email'} onChange={e => this.setState({email: e.target.value})}/>
                <input placeholder={'Password'} onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={() => this.signUp()}> Sign Up </button>
            </>
        );
    }
}

// @ts-ignore
export default withRouter(SignUp);