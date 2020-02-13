import * as React from 'react';
import request from '../../routes/request';

class Content extends React.Component {

    verifyToken() {
        request({
            method: 'GET',
            url: '/api/tokens/verification'
        })
            .then(res => console.log(res.data))
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