import { Layout } from "antd";
import React from "react";
import Header from "../../components/layout/header/header";
import { Outlet } from "react-router-dom";
import GlobalNavbar from "../../components/layout/nav/Navbar";

const Dashboard = () => {
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Header DealarLink={"/dealer"} CategoryLink={"/category"} TreasuryLink={"/treasury"} />
      <GlobalNavbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Dashboard;
