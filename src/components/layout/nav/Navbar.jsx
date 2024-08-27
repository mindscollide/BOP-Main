import React, { useState } from "react";
import Voltmeter from "./../../common/voltMeter/Voltmeter";
import ProfileDropdown from "./../../common/profileDropdown/ProfileDropdown";
import CustomButton from "./../../common/globalButton/button";
import SiteLogoComponent from "./../../common/siteLogo/SiteLogo";
import { useLocation, useNavigate } from "react-router-dom";

const GlobalNavbar = () => {
  const [selectedValue, setSelectedValue] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCalculatorClick = () => {
    // navigate("/calculator");
    window.open("/calculator", "_blank");
  };

  return (
    <>
      <div className="site-header pt-1">
        {/*Container*/}
        <div className="container-fluid page-gutter">
          {/*header inner container*/}
          <div className="header-inner d-flex align-items-center">
            <SiteLogoComponent />
            <div className="ms-auto">
              <div className="d-flex align-items-center">
                {location.pathname !== "/calculator" && (
                  <>
                    <CustomButton
                      applyClass="calcBtn"
                      value="Calculators"
                      size="large"
                      onClick={handleCalculatorClick}
                    />
                    {/*Vol Meter*/}
                    <Voltmeter
                      activeValue={selectedValue}
                      onSelect={(value) => setSelectedValue(value)}
                    />
                  </>
                )}
                {/*User Dropdown*/}
                <ProfileDropdown userName="Michael Hawk" />
              </div>
            </div>
          </div>
          {/*header inner container*/}
        </div>
        {/*Container*/}
      </div>
    </>
  );
};

export default GlobalNavbar;
