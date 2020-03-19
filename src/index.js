import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './index.css';
import App from './App';
import { mainRouters } from './routers'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Router>
        <Switch>
            {mainRouters.map(route => <Route exact={route.exact} key={route.path} {...route} />)}
            <Route path="/admin" render={routeProps => <App {...routeProps} />} />
            <Redirect to="/404" />
        </Switch>
    </Router>,
    document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
