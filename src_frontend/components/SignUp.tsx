import * as React from 'react';
import { History } from 'history';
import { signUp } from '../services/auth';

interface ISignUpProps {
    history: History
}

class SignUp extends React.Component<ISignUpProps> {

    state = {
        username: "",
        email: "",
        password: "",
    };

    onClickSignUp() {
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        signUp(data)
            .then((res: any) => {
                console.log(res);
                this.props.history.push("/");
            })
            .catch(err => console.error(err));
    }

    public render(): JSX.Element {
        return (
            <>
                <input placeholder={'Username'} onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder={'Email'} onChange={e => this.setState({email: e.target.value})}/>
                <input placeholder={'Password'} onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={() => this.onClickSignUp()}> Sign Up </button>
            </>
        );
    }
}

export default SignUp;