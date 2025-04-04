import { Layout } from "antd";
import React from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ResponseMessage } from "@/components/utils/ResponseMessageToast";
import SettingModal from "@/components/features/settingsModal/settingModal";
const Dashboard = () => {
  const { Content } = Layout;
  const location = useLocation();
  return (
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}
      <ResponseMessage />

      <GlobalNavbar />
      <Content>
        <main className='px-3'>
          <SettingModal />
          <Outlet />
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
