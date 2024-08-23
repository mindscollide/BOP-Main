import { Layout } from "antd";
import React from "react";
import Header from "../../components/layout/header/header";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/nav/Navbar";

const Dashboard = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header />
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Dashboard;
