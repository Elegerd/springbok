import * as React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {

    public render(): JSX.Element {
        return (
            <>
                <p> This is Home </p>
                <Link to="/login">Login</Link>
            </>
        );
    }
}

export default Home;