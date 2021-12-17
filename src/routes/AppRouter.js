import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Private, Public } from "./Routes";
import { PrivateRoute, PublicRoute } from "./AllRoute";
import { createBrowserHistory } from "history";
import { Layout } from "../containers";

const AppRouter = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          {Public.map((item, index) => (
            <PublicRoute key={index} {...item} />
          ))}
          {Private.map((item, index) => (
            <PrivateRoute key={index} {...item} />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
