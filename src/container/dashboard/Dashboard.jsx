import { Layout } from "antd";
import React, { useEffect } from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatBox from "@/components/features/chatBox/ChatBox";
import { useSelector } from "react-redux";
import { connectToMqttExternally, mqttReady } from "@/context/MqttContext";
import { useDispatch } from "react-redux";
import { getAllInstrumentsApi } from "@/components/utils/globalApis";
const Dashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  const location = useLocation();
  const chatModal = useSelector((state) => state.modalReducer.chatModal);

  useEffect(() => {
    setTimeout(() => {
      connectToMqttExternally();
    }, 0);
    dispatch(getAllInstrumentsApi({ navigate }));
  }, []);
  return (
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}

      <GlobalNavbar />
      <Content>
        <main className='px-3'>
          <Outlet />
          {chatModal && <ChatBox />}
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
