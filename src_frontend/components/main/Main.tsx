import React from 'react'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import routes from '../../routes'
import './main.css'

interface MainProps {
    history: History;
}

export const Main = ({ history }: MainProps) => {
    return (
        <>
            <Header />
            <main>
                <ConnectedRouter history={history}>
                    {routes}
                </ConnectedRouter>
            </main>
            <Footer />
        </>
    )
};