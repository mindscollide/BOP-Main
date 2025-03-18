import { Layout } from "antd";
import React from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { Content } = Layout;
  const location = useLocation();
  return (
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}

      <GlobalNavbar />
      <Content>
        <main className='px-3'>
          <Outlet />
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
