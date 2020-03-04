import React from "react";
import {logOut} from "../../services/auth";
import {SystemState, UpdateSessionAction} from "../../reducers/sessionTypes";
import {ApplicationState} from "../../reducers";
import {updateSession} from "../../actions/sessionActions";
import {connect} from "react-redux";
import {History} from "history";
import './header.css'


interface IHeaderProps {
    updateSession: (newSession: SystemState) => void,
    history : History;
    session: SystemState;
}

class Header extends React.Component<IHeaderProps> {
    onClickLogOut() {
        logOut()
            .then((res: any) => {
                this.props.updateSession(res.data);
            })
            .catch(err => {
                console.error('Logout:', err);
                this.props.updateSession({auth: false, user: null})
            });
    }

    render(): JSX.Element {
        return (
            <header>
                {this.props.session.auth && <button onClick={() => this.onClickLogOut()}> Logout </button>}
            </header>
        )
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: any = {}) => {
    return { session: state.session }
};

const mapDispatchToProps = (dispatch: React.Dispatch<UpdateSessionAction>) => {
    return {
        updateSession: (newSession: SystemState) => dispatch(updateSession(newSession))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);