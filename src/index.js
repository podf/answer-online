import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { mainRouters } from './routers'
import * as serviceWorker from './serviceWorker';
import { isLogined } from './utils/auth';

ReactDOM.render(
    <Router>
        {mainRouters.map(route => <Route exact={route.exact} key={route.path} {...route} />)}
        <Route path="/admin" render={routeProps => <App {...routeProps} />} />
        {/* <Redirect to="/404" /> */}
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();
