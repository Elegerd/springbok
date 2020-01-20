import * as React from 'react';
import { connect } from 'react-redux';
import { updateSession } from '../../actions/sessionActions';
import { History } from 'history';
import { SystemState, UpdateSessionAction } from "../../reducers/sessionTypes";
import { signIn } from '../../services/auth';
import Fingerprint from '../../services/fingerprint';

interface ISignInProps {
    updateSession: (newSession: SystemState) => void,
    history : History
}

class SignIn extends React.Component<ISignInProps> {

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
                    this.props.history.push("/");
                })
                .catch(err => console.error(err));
        }).catch(error => console.error(error));
    }

    public render(): JSX.Element {
        return (
            <>
                <input placeholder={'Username'} onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder={'Password'} onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={() => this.onClickSignIn()}> Sign In </button>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<UpdateSessionAction>) => {
    return {
        updateSession: (newSession: SystemState) => dispatch(updateSession(newSession))
    };
};

export default connect(null, mapDispatchToProps)(SignIn);
