import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Private, Public } from "./Routes";
import { PrivateRoute, PublicRoute } from "./AllRoute";
import { createBrowserHistory } from "history";
import { ErrorPage } from "../pages";

export const history = createBrowserHistory();

const RouterConfig = () => {
  return (
    <Router history={history}>
      <Switch>
        {Public.map((item, index) => (
          <PublicRoute key={index} {...item} />
        ))}
        {Private.map((item, index) => (
          <PrivateRoute key={index} {...item} />
        ))}
        <Route path="/404" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export const AppRouter = RouterConfig;
