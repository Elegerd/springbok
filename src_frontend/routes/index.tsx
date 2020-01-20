import React from 'react'
import { Route, Switch } from 'react-router';
import NotFound from '../components/NotFound';
import SignIn from '../components/sign_in/SignIn';
import SignUp from '../components/sign_up/SignUp';
import Content from '../components/content/Content';
import WelcomePage from '../components/welcome_page/WelcomePage';


const routes = (auth: boolean) => {
        return <Switch>
                        <Route exact path="/" component={auth ? Content : WelcomePage}/>
                        <Route path="/sign_in" component={SignIn}/>
                        <Route path="/sign_up" component={SignUp}/>
                        <Route component={NotFound}/>
                </Switch>
};

export default routes