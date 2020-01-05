import * as React from 'react';
import { Link } from 'react-router-dom';
import './welcomePage.css';
import Fingerprint from "../../services/fingerprint";
import {signIn} from "../../services/auth";
import {SystemState, UpdateSessionAction} from "../../reducers/sessionTypes";
import {updateSession} from "../../actions/sessionActions";
import {connect} from "react-redux";
import {History} from "history";

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
        Fingerprint().then(fingerprint => {
            signIn(user, fingerprint)
                .then((res: any) => {
                    console.log(res);
                    this.props.updateSession(res.data);
                    this.props.history.push("/content");
                })
                .catch(err => console.error(err));
        }).catch(error => console.error(error));
    }

    public render(): JSX.Element {
        return (
            <div className={'welcome-wrapper'}>
                <div className={'welcome-form'}>
                    <div className={'welcome-form-auth'}>
                        <h1>Будьте на связи везде и всегда!</h1>
                        <div className={'form-auth'}>
                            <input className={'email-input-text'} placeholder={'Электронный адрес или логин'}
                                   onChange={e => this.setState({username: e.target.value})}/>
                            <input className={'password-input-text'} placeholder={'Пароль'}
                                   onChange={e => this.setState({password: e.target.value})}/>
                            <button className={'btn-auth'} onClick={() => this.onClickSignIn()}>Вход</button>
                            <Link className={'link-auth'} to="/sign_up"> или присоединетесь сейчас!</Link>
                        </div>
                    </div>
                    <div className={'welcome-form-img'}>
                        <div className={'rhombus-img'}>
                            <img className={'rhombus-img-springbok'} src="/public/de628Z2.png"  alt={'springbok'}/>
                        </div>
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
