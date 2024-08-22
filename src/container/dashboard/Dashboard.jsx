import { Layout } from "antd";
import React from "react";
import Header from "../../components/layout/header/header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Dashboard;
