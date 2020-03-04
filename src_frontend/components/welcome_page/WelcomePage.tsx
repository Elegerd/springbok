import * as React from 'react';
import { Link } from 'react-router-dom';
import './welcomePage.css';
import { signIn } from "../../services/auth";
import { SystemState, UpdateSessionAction } from "../../reducers/sessionTypes";
import { updateSession } from "../../actions/sessionActions";
import { connect } from "react-redux";
import { History } from "history";
import { Button, Input } from "antd";

interface IWelcomePageProps {
    updateSession: (newSession: SystemState) => void,
    history : History
}

class WelcomePage extends React.Component<IWelcomePageProps> {

    state = {
        username: "",
        password: ""
    };

    onClickSignIn() {
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        signIn(user)
            .then((res: any) => {
                this.props.updateSession(res.data);
                this.props.history.push("/");
            })
            .catch(err => console.error(err));
    }

    public render(): JSX.Element {
        const { username, password } = this.state;

        return (
            <div className={'auth-wrapper'}>
                <div className={'auth-form-wrapper'}>
                    <h1>Будьте на связи везде и всегда!</h1>
                    <div className={'auth-form'}>
                        <Input
                            value={username}
                            onChange={e => this.setState({username: e.target.value})}
                            placeholder="Login" />
                        <Input.Password
                            value={password}
                            onChange={e => this.setState({password: e.target.value})}
                            placeholder="Password" />
                        <Button type="primary" onClick={() => this.onClickSignIn()}>Вход</Button>
                        <Link className={'link-auth'} to="/sign_up"> или присоединетесь сейчас!</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<UpdateSessionAction>) => {
    return {
        updateSession: (newSession: SystemState) => dispatch(updateSession(newSession))
    };
};

export default connect(null, mapDispatchToProps)(WelcomePage);
