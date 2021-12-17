import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "./AuthLayout";
import PrivateLayout from "./PrivateLayout";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth);

  return (
    <section id="sorter-image-app">
      {user.token ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </section>
  );
};
export default Layout;
