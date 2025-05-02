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
import { useDispatch } from "react-redux";
import { getAllCategoryTableData } from "@/container/pages/mainCategory/categoryActions";
import { useModal } from "@/context/ModalContext";
import { GetAllCounterPartyDataAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { useDealerAndTreasury } from "@/context/DealerAndTreasuryContext";
import RFQForwardCorporateModal from "@/container/pages/mainCorporate/rfqModal/RFQForwardCorporateModal/RFQForwardCorporateModal";
import RFQDiscountingCorporateModal from "@/container/pages/mainCorporate/rfqModal/RFQDiscountingCorporateModal/RFQDiscountingCorporateModal";

const GlobalNavbar = () => {
  const { setSettingModal } = useModal();
  const getAllCategoriesData = useSelector(
    (state) => state.authReducer.getAllCategories
  );
  //Global State of Active tab
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);

  const { categoryValue, setCategoryValue } = useDealerAndTreasury();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [openRfqModal, setOpenRfqModal] = useState(false);
  const [
    openRfqModalForwardCorporateComponent,
    setOpenRfqModalForwardCorporateComponent,
  ] = useState(false);
  const [
    openRfqModalDiscountingCorporateComponent,
    setOpenRfqModalDiscountingCorporateComponent,
  ] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleCalculatorClick = () => {
    window.open("/#/BOP/calculator", "_blank");
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
    let Data = { CategoryID: event.value };
    console.log(Data);

    dispatch(GetAllCounterPartyDataAPI({ Data, navigate }));
    setCategoryValue({
      value: event.value,
      label: event.label,
    });
  };

  //handle RFQ Condition Under Certain tabs
  const onClickRFQ = () => {
    if (activeTab === "Spot") {
      console.log("Handle Spot logic");
      setOpenRfqModal(true);
    } else if (activeTab === "Forwards") {
      console.log("Handle Forwards logic");
      setOpenRfqModalForwardCorporateComponent(true);
    } else if (activeTab === "Discounting") {
      console.log("Handle Discounting logic");
      setOpenRfqModalDiscountingCorporateComponent(true);
    }
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
      <div className='site-header pt-1'>
        {/*Container*/}
        <div className='container-fluid page-gutter'>
          {/*header inner container*/}
          <div className='header-inner d-flex align-items-center'>
            <SiteLogoComponent />
            <div className='ms-auto'>
              <div className='d-flex align-items-center gap-2'>
                {location.pathname !== "/calculator" ? (
                  <>
                    {shouldIncludeCorporate && (
                      <Suspense fallback={<>Loading RFQ...</>}>
                        <CustomButton
                          applyClass='rfqBtn'
                          value='RFQ'
                          size='small'
                          icon={<IconElement iconClass={"icon-list fs-6"} />}
                          onClick={onClickRFQ}
                        />
                      </Suspense>
                    )}
                    {location.pathname.includes("treasury") &&
                    (shouldIncludeDealer || shouldIncludeTreasury) ? (
                      <CustomButton
                        applyClass='calcBtn'
                        value='Calculators'
                        size='large'
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
                  userName={localStorage.getItem("name")}
                  setSettingModal={setSettingModal}
                />
              </div>
            </div>
          </div>
          {/*header inner container*/}
        </div>
        {/*Container*/}
      </div>

      {/* Spot RFQ Modal  */}
      {openRfqModal ? (
        <>
          <RFQModal
            openRfqModal={openRfqModal}
            setOpenRfqModal={setOpenRfqModal}
          />
        </>
      ) : null}

      {/* Forwards RFQ Modal  */}
      {openRfqModalForwardCorporateComponent && (
        <RFQForwardCorporateModal
          openRfqModalForwardCorporateComponent={
            openRfqModalForwardCorporateComponent
          }
          setOpenRfqModalForwardCorporateComponent={
            setOpenRfqModalForwardCorporateComponent
          }
        />
      )}

      {/* Discounting RFQ Modal  */}
      {openRfqModalDiscountingCorporateComponent && (
        <RFQDiscountingCorporateModal
          openRfqModalDiscountingCorporateComponent={
            openRfqModalDiscountingCorporateComponent
          }
          setOpenRfqModalDiscountingCorporateComponent={
            setOpenRfqModalDiscountingCorporateComponent
          }
        />
      )}
    </>
  );
};

export default GlobalNavbar;
