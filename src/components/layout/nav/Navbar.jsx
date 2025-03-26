import React, { Suspense, useEffect, useState } from "react";
import Voltmeter from "@/components/common/voltMeter/Voltmeter";
import ProfileDropdown from "@/components/common/profileDropdown/ProfileDropdown";
import CustomButton from "@/components/common/globalButton/button";
import SiteLogoComponent from "@/components/common/siteLogo/SiteLogo";
import { useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import IconElement from "@/components/common/IconElement/IconElement";
import RFQModal from "@/container/pages/mainCorporate/rfqModal/RFQModal";
import { useSelector } from "react-redux";

const GlobalNavbar = () => {
  const getAllCategoriesData = useSelector(
    (state) => state.authReducer.getAllCategories
  );

  const [selectedValue, setSelectedValue] = useState(1);
  const [openRfqModal, setOpenRfqModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState({
    value: 0,
    label: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleCalculatorClick = () => {
    window.open("/#/BOP/calculator", "_blank");
  };

  const onClickRFQ = () => {
    setOpenRfqModal(true);
  };

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeBranch =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const shouldIncludeDealer =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  const shouldIncludeCorporate =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const shouldIncludeTreasury =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const handleChangeCategory = (event) => {
    console.log(event);
    setCategoryValue({
      value: event.value,
      label: event.label,
    });
  };

  useEffect(() => {
    if (getAllCategoriesData !== null) {
      try {
        const { categories } = getAllCategoriesData;
        if (categories.length > 0) {
          let newCategoryMap = categories.map((cate, index) => {
            return {
              ...cate,
              label: cate.categoryName,
              value: cate.categoryID,
            };
          });
          setAllCategories(newCategoryMap);
        }
      } catch (error) {}
    }
  }, [getAllCategoriesData]);

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
                    {location.pathname.includes("treasury") &&
                    (shouldIncludeDealer || shouldIncludeTreasury) ? (
                      <CustomButton
                        applyClass="calcBtn"
                        value="Calculators"
                        size="large"
                        onClick={handleCalculatorClick}
                      />
                    ) : null}
                    {shouldIncludeTreasury &&
                    location.pathname.includes("treasury") ? (
                      <Voltmeter
                        activeValue={selectedValue}
                        onSelect={(value) => setSelectedValue(value)}
                      />
                    ) : null}
                    {location.pathname.includes("category") && (
                      <SelectDropdown
                        options={allCategories}
                        placeholder={"Please Select Category"}
                        onChange={handleChangeCategory}
                        value={categoryValue.value !== 0 ? categoryValue : null}
                        classNamePrefix={"Category-Dropdown"}
                      />
                    )}
                  </>
                ) : null}
                {/*User Dropdown*/}
                <ProfileDropdown
                  userName="Michael Hawk"
                  setSettingModal={setSettingModal}
                />
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
