import * as React from 'react';
import { App } from './App';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, { endpoint: string, messages: string[]}> {
    constructor(props: IMainProps) {
        super(props);
        this.state={
            endpoint:"ws://localhost:3001/echo",
            messages:[]
        }
    }

    componentDidMount(){
        const ws = new WebSocket(this.state.endpoint);
        ws.onopen = () => {
            ws.send(JSON.stringify("Hello world!"))
        };
        ws.onmessage = evt => {
            this.setState({
                messages: this.state.messages.concat(evt.data)
            })
        }
    }

    public render(): JSX.Element {
        return (
            <>
                Main app
                <button onClick={() => {
                    fetch("/echo", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res =>
                        res.json()
                    ).then(res =>
                        console.log(res)
                    );
                }}> CLICK </button>
            </>
        );
    }
}
