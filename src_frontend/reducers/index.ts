import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import { systemReducer } from './sessionReducer'
import { SystemState } from './sessionTypes'


export interface ApplicationState {
    session: SystemState,
    router: RouterState
}

const rootReducer = (history: History) => combineReducers<ApplicationState>({
    session: systemReducer,
    router: connectRouter(history)
});

export default rootReducer;