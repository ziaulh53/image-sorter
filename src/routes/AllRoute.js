import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// Public router components
export const PublicRoute = ({ component: Component, ...rest }) => {
  const {isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? (
    <Redirect to="/clients" from={rest.path} />
  ) : (
    <Route {...rest} component={(props) => <Component {...props} />} />
  );
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const {isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Route {...rest} component={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" from={rest.path} />
  );
};
