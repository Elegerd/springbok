import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Springbok from './Springbok';

export class App {
    constructor() {
        this.render();
    }

    private render(): void {
        ReactDOM.render(React.createElement(Springbok, { app: this }), document.getElementById("react-root"));
    }
}

new App();
