import * as React from 'react';
import { connect } from 'react-redux'
import { updateSession } from '../actions/sessionActions';
import { withRouter } from "react-router-dom"
import { History } from 'history';
import { SystemState, UpdateSessionAction } from "../reducers/sessionTypes";
import { signIn } from '../services/auth.service'

interface ISignInProps {
    updateSession: (newSession: SystemState) => void,
    history : History
}

class SignIn extends React.Component<ISignInProps> {

    state = {
        username: "",
        password: ""
    };


    signIn() {
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        signIn(data.username, data.password)
            .then((res: any) => {
                console.log(res);
                this.props.updateSession(res.data);
                this.props.history.push("/content");
            })
            .catch(err => console.error(err));
    }

    public render(): JSX.Element {
        return (
            <>
                <input placeholder={'Username'} onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder={'Password'} onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={() => this.signIn()}> Sign In </button>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch: React.Dispatch<UpdateSessionAction>) => {
    return {
        updateSession: (newSession: SystemState) => dispatch(updateSession(newSession))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
