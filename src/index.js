import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { mainRouters } from './routers'
import * as serviceWorker from './serviceWorker';
import { isLogined } from './utils/auth';
import Frame from './components/Frame';
import Home from './pages/Home';
import Aside from './pages/Aside';
import Article from './pages/Article';
import Edit from './pages/Edit';


ReactDOM.render(
    <Router>
        {/* <Home>
            <Switch>
                <Route path="/info" component={Aside} />
                <Route path="/edit" component={Edit} />
                <Route path="/main" component={Article} />
                <Redirect to="/404" />
            </Switch>
        </Home> */}
        {mainRouters.map(route => <Route exact={route.exact} key={route.path} {...route} />)}
        <Route path="/admin" render={routeProps => <App {...routeProps} />} />
        <Redirect to="/404" />
    </Router>,
    document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
