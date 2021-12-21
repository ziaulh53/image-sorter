import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ClientList, ClientsDetails } from "../components";

const Client = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={ClientList} />
      <Route path={`${path}/details/:id`} component={ClientsDetails} />
    </Switch>
  );
};

export default Client;
