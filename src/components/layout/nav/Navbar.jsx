import React, { useState } from 'react'
import Voltmeter from "./../../common/voltMeter/Voltmeter";
import ProfileDropdown from "./../../common/profileDropdown/ProfileDropdown";
import CustomButton from "./../../common/globalButton/button";
import SiteLogoComponent from "./../../common/siteLogo/SiteLogo";

const NavbarTreasury = () => {

    const [selectedValue, setSelectedValue] = useState(1);

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
                                <CustomButton applyClass="calcBtn" value="Calculators" size="large" />
                                {/*Vol Meter*/}
                                <Voltmeter
                                    activeValue={selectedValue}
                                    onSelect={(value) => setSelectedValue(value)}
                                />
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
    )
}

export default NavbarTreasury