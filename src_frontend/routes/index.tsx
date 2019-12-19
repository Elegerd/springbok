import React from 'react'
import { Route, Switch } from 'react-router'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Content from '../components/Content'
import NotFound from '../components/NotFound'
import Home from "../components/Home";

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign_in" component={SignIn} />
            <Route path="/sign_up" component={SignUp} />
            <Route path="/content" component={Content} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default routes