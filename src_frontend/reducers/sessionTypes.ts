export const UPDATE_SESSION = 'UPDATE_SESSION';

export interface SystemState {
    auth: boolean,
    user: { username: string, email: string } | null
}

export interface UpdateSessionAction {
    type: typeof UPDATE_SESSION
    payload: SystemState
}

export type SystemActionTypes = UpdateSessionAction