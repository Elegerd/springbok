import * as React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {

    public render(): JSX.Element {
        return (
            <>
                <p> This is Home </p>
                <p><Link to="/sign_up">Sign up</Link></p>
                <p><Link to="/sign_in">Sign in</Link></p>
            </>
        );
    }
}

export default Home;