import { SystemState, UPDATE_SESSION, SystemActionTypes } from '../reducers/sessionTypes'

export function updateSession(newSession: SystemState): SystemActionTypes {
    return {
        type: UPDATE_SESSION,
        payload: newSession
    }
}