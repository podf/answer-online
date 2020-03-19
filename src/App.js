import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
// import 'antd/dist/antd.css'
import axios from 'axios';
import { Route, Switch, Redirect } from "react-router-dom";

import { adminRoutes } from './routers';

function App() {
  return (
    <div>
      <h1> 我是app</h1>
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
    </div>
  )
}

export default App;
