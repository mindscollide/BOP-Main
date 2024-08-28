import React, { Suspense, useState } from "react";
import Voltmeter from "./../../common/voltMeter/Voltmeter";
import ProfileDropdown from "./../../common/profileDropdown/ProfileDropdown";
import CustomButton from "./../../common/globalButton/button";
import SiteLogoComponent from "./../../common/siteLogo/SiteLogo";
import { useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import IconElement from "../../common/IconElement/IconElement";
import RFQModal from "../../../container/pages/mainCorporate/rfqModal/RFQModal";

const GlobalNavbar = () => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [openRfqModal, setOpenRfqModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const handleCalculatorClick = () => {
    window.open("/calculator", "_blank");
  };

  const onClickRFQ = () => {
    setOpenRfqModal(true);
  };

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeBranch =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

  const shouldIncludeCorporate =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const shouldIncludeTreasury =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

  return (
    <>
      <div className="site-header pt-1">
        {/*Container*/}
        <div className="container-fluid page-gutter">
          {/*header inner container*/}
          <div className="header-inner d-flex align-items-center">
            <SiteLogoComponent />
            <div className="ms-auto">
              <div className="d-flex align-items-center gap-2">
                {location.pathname !== "/calculator" ? (
                  <>
                    {shouldIncludeCorporate && (
                      <Suspense fallback={<>Loading RFQ...</>}>
                        <CustomButton
                          applyClass="rfqBtn"
                          value="RFQ"
                          size="small"
                          icon={<IconElement iconClass={"icon-list fs-6"} />}
                          onClick={onClickRFQ}
                        />
                      </Suspense>
                    )}
                    {location.pathname === "/treasury" ||
                      shouldIncludeBranch ||
                      (shouldIncludeCorporate && (
                        <CustomButton
                          applyClass="calcBtn"
                          value="Calculators"
                          size="large"
                          onClick={handleCalculatorClick}
                        />
                      ))}
                    {shouldIncludeTreasury &&
                    location.pathname === "/treasury" ? (
                      <Voltmeter
                        activeValue={selectedValue}
                        onSelect={(value) => setSelectedValue(value)}
                      />
                    ) : null}
                    {location.pathname === "/category" && (
                      <SelectDropdown classNamePrefix={"Category-Dropdown"} />
                    )}
                  </>
                ) : null}
                {/*User Dropdown*/}
                <ProfileDropdown userName="Michael Hawk" />
              </div>
            </div>
          </div>
          {/*header inner container*/}
        </div>
        {/*Container*/}
      </div>

      {openRfqModal ? (
        <>
          <RFQModal
            openRfqModal={openRfqModal}
            setOpenRfqModal={setOpenRfqModal}
          />
        </>
      ) : null}
    </>
  );
};

export default GlobalNavbar;
