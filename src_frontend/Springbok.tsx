import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import { App } from './App';
import Main from './components/main/Main';

export interface SpringbokProps {
    app: App;
}

const preloadedState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('app_state');
        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined
        if (!serialisedState) return undefined;
        const state = JSON.parse(serialisedState);
        return state;
    } catch (err) {
        return undefined;
    }
};

const store = configureStore(preloadedState());

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
