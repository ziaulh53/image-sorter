import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// Public router components
export const PublicRoute = ({ component: Component, ...rest }) => {
  const { appId } = useSelector((state) => state.auth);
  return appId ? (
    <Redirect to="/app" from={rest.path} />
  ) : (
    <Route {...rest} component={(props) => <Component {...props} />} />
  );
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { appId } = useSelector((state) => state.auth);

  return appId ? (
    <Route {...rest} component={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" from={rest.path} />
  );
};
