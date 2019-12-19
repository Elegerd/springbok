import { SystemState, SystemActionTypes, UPDATE_SESSION } from './sessionTypes'

const initialState: SystemState = {
    auth: false,
    accessToken: '',
    userName: ''
};

export function systemReducer(
    state = initialState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}