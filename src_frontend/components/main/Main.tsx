import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import {connect} from "react-redux";
import { verifyToken, refreshToken } from "../../services/auth";
import {SystemState, UpdateSessionAction} from "../../reducers/sessionTypes";
import {updateSession} from "../../actions/sessionActions";
import {ApplicationState} from "../../reducers";
import Header from '../header/Header';
import routes from '../../routes';
import { Spin } from 'antd';
import './main.css';

interface IMainProps {
    history: History;
    updateSession: (newSession: SystemState) => void,
    session: SystemState;
}

class Main extends React.Component<IMainProps> {

    state = {
        is_loading: true
    };

    componentDidMount(): void {
        verifyToken()
            .then((res: any) => {
                this.props.updateSession({ auth: res.data.auth, user: res.data.user});
                this.setState({ is_loading: false })
            })
            .catch(err => {
                console.error(err);
                refreshToken()
                    .then((res: any) => {
                        this.props.updateSession({ auth: res.data.auth, user: res.data.user});
                        this.setState({ is_loading: false })
                    })
                    .catch(err => {
                        console.error(err);
                        this.props.updateSession({ auth: false, user: null});
                        this.setState({ is_loading: false }, () => {
                            this.props.history.push("/");
                        })
                    });
            })
    }

    public render(): JSX.Element {
        return this.state.is_loading ?
            <Spin style={{margin: 'auto'}} size={"large"}/> :
            <>
                <Header />
                <main>
                    <ConnectedRouter history={this.props.history}>
                        {routes(this.props.session.auth)}
                    </ConnectedRouter>
                </main>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);