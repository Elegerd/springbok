import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import NotFound from '../components/NotFound';
import SignUp from '../components/sign_up/SignUp';
import Content from '../components/content/Content';
import WelcomePage from '../components/welcome_page/WelcomePage';

const routes = (auth: boolean) => {
    const PrivateRoute = ({ component: Component, ...rest } : any) => (
        <Route {...rest} render={(props => (
            auth ? <Component {...props}/> :
                <Redirect to={'/'}/>
        ))}/>
    );

    return  <Switch>
                    <Route exact path="/" component={auth ? Content : WelcomePage}/>
                    <Route path="/sign_up" component={SignUp}/>
                    <PrivateRoute path="/protected" component={Content}/>
                    <Route component={NotFound}/>
            </Switch>
};

export default routes