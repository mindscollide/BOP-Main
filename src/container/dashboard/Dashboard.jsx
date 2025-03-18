import { Layout } from "antd";
import React from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { Content } = Layout;
  return (
    <Layout className="roboto-13">
      <Header
        DealarLink={"/dealer"}
        CategoryLink={"/category"}
        TreasuryLink={"/treasury"}
      />
      <GlobalNavbar />
      <Content>
        <main className="px-3">
        <Outlet />
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
