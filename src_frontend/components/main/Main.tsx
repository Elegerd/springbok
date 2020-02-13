import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import {connect} from "react-redux";
import { verifyToken, refreshToken } from "../../services/auth";
import {SystemState, UpdateSessionAction} from "../../reducers/sessionTypes";
import {updateSession} from "../../actions/sessionActions";
import {ApplicationState} from "../../reducers";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import routes from '../../routes';
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
                console.log(res.data);
                this.props.updateSession({ auth: res.data.auth, user: res.data.user});
                this.setState({ is_loading: false })
            })
            .catch(err => {
                console.error(err);
                refreshToken()
                    .then(res => console.log(res))
                    .catch(err => {
                        console.error(err);
                        this.props.updateSession({ auth: false, user: null});
                        this.setState({ is_loading: false })
                    });
            })
    }

    public render(): JSX.Element {
        return (
            <>
                <Header />
                <main>
                    {this.state.is_loading ? null : (
                        <ConnectedRouter history={this.props.history}>
                            {routes(this.props.session.auth)}
                        </ConnectedRouter>
                    )}
                </main>
                <Footer />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);