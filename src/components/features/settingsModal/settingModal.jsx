import React, { lazy, Suspense } from "react";
import GlobalModal from "../../common/globalModal/Modal";
import "./settingModal.css";
import { Col, Row } from "react-bootstrap";
import { useModal } from "../../../context/ModalContext";
import GlobalTabs from "../../common/tabs/Tabs";
const SettingModal = () => {
  const { settingModal, setSettingModal } = useModal();

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeBranchComponents =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeTreasuryComponents =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeDealerComponents =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeCorporateComponents =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  const SettingusersComponent =
    shouldIncludeCorporateComponents ||
    shouldIncludeBranchComponents ||
    shouldIncludeTreasuryComponents ||
    shouldIncludeDealerComponents
      ? lazy(() =>
          import(
            "../../../components/features/settingsModal/userSettingComponent/SettingusersComponent"
          )
        )
      : null;

  const PassCodeSettingComponent =
    shouldIncludeCorporateComponents ||
    shouldIncludeBranchComponents ||
    shouldIncludeTreasuryComponents ||
    shouldIncludeDealerComponents
      ? lazy(() =>
          import(
            "../../../components/features/settingsModal/PasscodeSettingComponent/PassCodeSettingComponent"
          )
        )
      : null;
  const MarketTimingSettingComponent =
    shouldIncludeDealerComponents || shouldIncludeTreasuryComponents
      ? lazy(() => import("./MarketTimingComponent/MarketTIming"))
      : null;
  //Tabs
  const tabsData = [
    {
      title: "User Settings",
      content: SettingusersComponent && (
        <Suspense fallback={<>Loading Spot...</>}>
          <SettingusersComponent />
        </Suspense>
      ),
    },
    {
      title: "Passcode Setting",
      content: PassCodeSettingComponent && (
        <Suspense fallback={<>Loading... </>}>
          <PassCodeSettingComponent />
        </Suspense>
      ),
    },
    {
      title: "Market Timing",
      content: MarketTimingSettingComponent && (
        <Suspense fallback={<>Loading... </>}>
          <MarketTimingSettingComponent />
        </Suspense>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <GlobalModal
        show={settingModal}
        backdrop='static'
        onHide={() => setSettingModal(false)}
        centered={true}
        className={"ModalClassNameSettings"}
        bodyClassName={"ModalClassNameSettings"}
        headerClassName={"border-0"}
        footerClassName={"border-0"}
        size={"md"}
        closeButton={true}
        modalHeader={true}
        modalBody={
          <>
            <>
              <GlobalTabs
                tabs={
                  !MarketTimingSettingComponent
                    ? tabsData.filter((tbData, index) => index < 2)
                    : tabsData
                }
                defaultActiveKey={"0"}
                tabClass='mb-4 d-flex justify-content-start'
              />
            </>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}></Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default SettingModal;
