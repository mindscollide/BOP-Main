import React, { useState } from "react";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import SiteLogo from "./../../../assets/logo.png";
import CustomButton from "../globalButton/button";
import Voltmeter from "../voltMeter/Voltmeter";
import SiteLogoComponent from "../siteLogo/SiteLogo";

const Navbar = () => {
  const [selectedValue, setSelectedValue] = useState(1);

  return (
    <>
      <div className='site-header pt-1'>
        {/*Container*/}
        <div className='container-fluid page-gutter'>
          {/*header inner container*/}
          <div className='header-inner d-flex align-items-center'>
            <SiteLogoComponent />
            <div className='ms-auto'>
              <div className='d-flex align-items-center'>
                <CustomButton
                  applyClass='calcBtn'
                  value='Calculators'
                  size='large'
                />
                {/*Vol Meter*/}
                {import.meta.env.VITE_APP_INCLUDE_TREASURY === "true" && (
                  <Voltmeter
                    activeValue={selectedValue}
                    onSelect={(value) => setSelectedValue(value)}
                  />
                )}

                {/*User Dropdown*/}
                <ProfileDropdown userName='Owais Khan' />
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

export default Navbar;
