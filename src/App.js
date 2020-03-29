import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import { adminRoutes } from './routers';
import { isLogined } from './utils/auth';

function App() {
  console.log(isLogined(), 'isLogined')
  return (
    // isLogined() ?
      <Switch>
        {
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
        <Redirect to="/404" />
      </Switch>
    // : <Redirect to="/login" />
  )
}

export default App;
