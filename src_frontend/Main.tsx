import React from 'react'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

interface MainProps {
    history: History;
}

export const Main = ({ history }: MainProps) => {
    return (
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    )
};