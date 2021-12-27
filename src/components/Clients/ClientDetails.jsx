import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import {
  ClientInfo,
  SessionDetails,
  SessionList,
} from "./ClientDetailsCom";

const ClientDetails = () => {
  
  const { path } = useRouteMatch();
  return (
    <div className="clients-section">
      <div className="mb-3">
        <ClientInfo />
      </div>
      <Switch>
        <Route path={`${path}`} exact component={SessionList} />
        <Route path={`${path}/session`} component={SessionDetails} />
      </Switch>
    </div>
  );
};

export default ClientDetails;
