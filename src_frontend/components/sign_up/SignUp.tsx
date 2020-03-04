import * as React from 'react';
import { History } from 'history';
import { signUp } from '../../services/auth';
import {Button, Input} from "antd";

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
        const { username, password, email } = this.state;

        return (
            <div className={'auth-wrapper'}>
                <div className={'auth-form-wrapper'}>
                    <h1>Создание аккаунта</h1>
                    <div className={'auth-form'}>
                        <Input
                            value={email}
                            onChange={e => this.setState({email: e.target.value})}
                            placeholder="Email" />
                        <Input
                            value={username}
                            onChange={e => this.setState({username: e.target.value})}
                            placeholder="Login" />
                        <Input.Password
                            value={password}
                            onChange={e => this.setState({password: e.target.value})}
                            placeholder="Password" />
                        <Button type="primary" onClick={() => this.onClickSignUp()}>Зарегистрироваться</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;