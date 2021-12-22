import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { AuthLayout, PrivateLayout } from "../containers";

// Public router components
export const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state?.auth);
  return isAuthenticated ? (
    <PrivateLayout>
      <Redirect to="/clients" from={rest.path} />
    </PrivateLayout>
  ) : (
    <AuthLayout>
      <Route {...rest} component={(props) => <Component {...props} />} />
    </AuthLayout>
  );
};
export const PrivateRoute = ({
  component: Component,
  role: Role = [],
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth?.user);
  const AuthorizedPage = () => {
    if (Role.includes(role)) {
      return (
        <PrivateLayout>
          <Route {...rest} component={(props) => <Component {...props} />} />
        </PrivateLayout>
      );
    } else {
      return <Redirect to="/404" />;
    }
  };

  return isAuthenticated ? (
    <AuthorizedPage />
  ) : (
    <AuthLayout>
      <Redirect to="/" from={rest.path} />
    </AuthLayout>
  );
};
