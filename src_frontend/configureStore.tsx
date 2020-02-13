import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from './reducers'

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    );

    const saveState = (state: any) => {
        try {
            // Convert the state to a JSON string
            const serialisedState = JSON.stringify(state);

            // Save the serialised state to localStorage against the key 'app_state'
            window.localStorage.setItem('app_state', serialisedState);
        } catch (err) {
            console.error("Save state:", err)
        }
    };

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
}