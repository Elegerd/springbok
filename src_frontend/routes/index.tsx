import React from 'react'
import { Route, Switch } from 'react-router';
import NotFound from '../components/NotFound';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Content from '../components/Content';
import WelcomePage from '../components/welcome_page/WelcomePage';

const routes = (
    <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/content" component={Content} />
        <Route component={NotFound} />
    </Switch>
);

export default routes