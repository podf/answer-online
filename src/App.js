import React from 'react';
import 'antd/dist/antd.css';
import { Route, Switch, Redirect } from "react-router-dom";

import Frame from '../src/components/Frame';
import { adminRoutes } from './routers';
import { isLogined } from './utils/auth';

function App() {
  console.log(isLogined(), 'isLogined')
  return (
    <Frame>
      <Switch>
        {
          // isLogined() ?
          adminRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={routeProps => {
                  return <route.component {...routeProps} />
                }}
              />
            )
          })
        }
        {/* Bug 一直重定向到404页面 */}
        {/* <Redirect to="/404" /> */}
      </Switch>
    </Frame>
  )
}

export default App;
