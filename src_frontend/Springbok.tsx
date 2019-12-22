import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import { App } from './App';
import { Main } from './Main';

export interface SpringbokProps {
    app: App;
}

const store = configureStore();

class Springbok extends React.Component<SpringbokProps> {

    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <Main history={history}/>
            </Provider>
        );
    }
}

export default Springbok;
