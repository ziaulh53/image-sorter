import { Layout } from "antd";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <Layout style={{ padding: "0 50px"}}>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default AuthLayout;
