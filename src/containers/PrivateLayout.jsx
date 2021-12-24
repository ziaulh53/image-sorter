import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UsergroupAddOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/modules";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const PrivateLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div style={{ height: "32px", margin: "16px" }}>
          <img
            src="/img/sample-logo.png"
            alt="dfdfd"
            style={{ width: "100%", height: "32px" }}
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
            <Link to="/clients">Clients</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 23px",
          }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <div style={{ cursor: "pointer" }} onClick={onLogout}>
            <LogoutOutlined />
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Image Sorter ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
