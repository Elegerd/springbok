import React from 'react'
import { Route, Switch } from 'react-router'
import Login from '../components/Login'
import NotFound from '../components/NotFound'
import Home from "../components/Home";

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default routes