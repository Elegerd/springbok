import * as React from 'react';
import { App } from './App';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, { endpoint: string, messages: string[], ws: WebSocket | null}> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            endpoint: "ws://localhost:3001/",
            messages:[],
            ws: null
        }
    }

    // connectWs() {
    //     let ws = this.state.ws;
    //     if (ws) {
    //         ws.onerror = ws.onopen = ws.onclose = null;
    //         ws.close();
    //     }
    //         this.setState({ws: new WebSocket(`ws://${location.host}`)});
    //         ws.onerror = () => {
    //             console.log('WebSocket error');
    //         };
    //         ws.onopen = () => {
    //             console.log('WebSocket connection established');
    //         };
    //         ws.onclose = () => {
    //             console.log('WebSocket connection closed');
    //             this.setState({ws: null});
    //         };
    //     }
    // }
    //
    // handleResponse(response: Response) {
    //     return response.ok
    //         ? response.json().then((data) => JSON.stringify(data, null, 2))
    //         : Promise.reject(new Error('Unexpected response'));
    // }
    //
    // login() {
    //     fetch('/login', { method: 'POST', credentials: 'same-origin' })
    //         .then(this.handleResponse)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }

    public render(): JSX.Element {
        return (
            <>
                Main app
                <button onClick={() => this.login()}> LOGIN </button>
                <button onClick={() => this.connectWs()}> CONNECT </button>
            </>
        );
    }
}
