import { SystemState, SystemActionTypes, UPDATE_SESSION } from './sessionTypes'

const initialState: SystemState = {
    auth: false,
    user: null
};

export function systemReducer(
    state = initialState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                auth: action.payload.auth,
                user: action.payload.user
            }
        }
        default:
            return state
    }
}