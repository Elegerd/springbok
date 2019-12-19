import * as React from 'react';
import axios from 'axios';

class Content extends React.Component {

    verifyToken() {
        axios({
            method: 'GET',
            url: 'api/verifyToken'
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    public render(): JSX.Element {
        return (
            <>
                <button onClick={() => this.verifyToken()}> Verify Token </button>
            </>
        );
    }
}

export default Content;