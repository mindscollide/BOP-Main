import { Layout } from "antd";
import React, { useEffect } from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ResponseMessage } from "@/components/utils/ResponseMessageToast";
import SettingModal from "@/components/features/settingsModal/settingModal";
import { useModal } from "@/context/ModalContext";
import ChatBox from "@/components/features/chatBox/ChatBox";
import { useSelector } from "react-redux";
import { connectToMqttExternally } from "@/context/MqttContext";
import { useDispatch } from "react-redux";
import { getAllInstrumentsApi } from "@/components/utils/globalApis";
const Dashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const location = useLocation();
  const { chatModal, chatModalTransactionId } = useModal();

  useEffect(() => {
    connectToMqttExternally();
    dispatch(getAllInstrumentsApi({ navigate }));
  }, []);
  return (
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}
      <ResponseMessage />

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
