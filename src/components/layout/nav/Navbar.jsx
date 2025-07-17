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
import RFQForwardCorporateModal from "@/container/pages/mainCorporate/rfqModal/RFQForwardCorporateModal/RFQForwardCorporateModal";
import RFQDiscountingCorporateModal from "@/container/pages/mainCorporate/rfqModal/RFQDiscountingCorporateModal/RFQDiscountingCorporateModal";
import SettingModal from "@/components/features/settingsModal/settingModal";
import { setCategoryValue } from "@/store/dealerReducer/dealerSlicer";
import {
  categoryisAdded,
  categoryisDeleted,
  categoryisUpdated,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import {
  setIBuySellData,
  setRfqModalOpen,
} from "@/store/modalSlice/modalSlicer";
import ViewCurrentDeals from "@/components/features/blotter/viewCurrentDeals/ViewCurrentDeals";
import {
  GetCategoryWiseDiscountingRatesApi,
  GetCategoryWiseForwardRatesApi,
  GetCategoryWiseSpotRatesApi,
} from "@/container/pages/mainCategory/categoryActions";
const GlobalNavbar = () => {
  const getAllCategoriesData = useSelector(
    (state) => state.authReducer.getAllCategories
  );
  const settingModalState = useSelector(
    (state) => state.modalReducer.settingModal
  );
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);

  const categoryValue = useSelector(
    (state) => state.dealerReducer.categoryValue
  );

  const isCategoryAdded = useSelector(
    (state) => state.RealtimeActionsSlice.categoryisAdded
  );
  const isCategoryUpdated = useSelector(
    (state) => state.RealtimeActionsSlice.categoryisUpdated
  );
  const isCategoryDeleted = useSelector(
    (state) => state.RealtimeActionsSlice.categoryisDeleted
  );
  const isRfqModalOpen = useSelector(
    (state) => state.modalReducer.rfqModalOpen
  );
  console.log(isRfqModalOpen, "isRfqModalOpenisRfqModalOpen");
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [
    openRfqModalForwardCorporateComponent,
    setOpenRfqModalForwardCorporateComponent,
  ] = useState(false);
  const [
    openRfqModalDiscountingCorporateComponent,
    setOpenRfqModalDiscountingCorporateComponent,
  ] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [outStandingData, setOutStandingData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const handleCalculatorClick = () => {
    window.open("/BOP/calculator", "_blank");
  };
  console.log(allCategories, "allCategoriesallCategories");
  const [viewCurrentDeals, setViewCurrentDeals] = useState(false);
  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeBranch =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const shouldIncludeDealer =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  const shouldIncludeCorporate =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const shouldIncludeTreasury =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

  console.log(shouldIncludeCorporate, "shouldIncludeDealer");

  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );

  const handleChangeCategory = (event) => {
    console.log(event);
    let Data = { CategoryID: event.value };
    dispatch(GetCategoryWiseSpotRatesApi({ navigate, Data }));
    dispatch(GetCategoryWiseForwardRatesApi({ navigate, Data }));
    dispatch(GetCategoryWiseDiscountingRatesApi({ navigate, Data }));

    let obj = {
      value: event.value,
      label: event.label,
    };
    dispatch(setCategoryValue(obj));
  };

  //handle RFQ Condition Under Certain tabs
  const onClickRFQ = () => {
    if (activeTab === "Spot") {
      console.log(typeof setRfqModalOpen, "Handle Spot logic");
      dispatch(setIBuySellData(null)); // Dispatch the action to set the data in the Redux store
      dispatch(setRfqModalOpen(true));
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
          let obj = {
            value: newCategoryMap[0].value,
            label: newCategoryMap[0].label,
          };
          dispatch(setCategoryValue(obj));

          let Data = {
            Category: newCategoryMap[0].value,
          };
          setAllCategories(newCategoryMap);
          console.log(Data, "DataData");
          dispatch(GetCategoryWiseSpotRatesApi({ navigate, Data }));
          dispatch(GetCategoryWiseForwardRatesApi({ navigate, Data }));
          dispatch(GetCategoryWiseDiscountingRatesApi({ navigate, Data }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [getAllCategoriesData]);

  useEffect(() => {
    try {
      if (getBlotterOutstandingData && getBlotterOutstandingData !== null) {
        setOutStandingData(getBlotterOutstandingData.outstandingDeals);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [getBlotterOutstandingData]);

  useEffect(() => {
    if (isCategoryAdded !== null) {
      try {
        const {
          category: { categoryId, offerSpread, bidSpread, category },
        } = isCategoryAdded;
        console.log(isCategoryAdded, "isCategoryAddedisCategoryAdded");
        let isCategoryFind = allCategories.find(
          (categoryObj, index) => categoryObj.value === categoryId
        );

        if (isCategoryFind === undefined) {
          let newCategory = {
            categoryID: categoryId,
            categoryName: category,
            bidSpread: bidSpread,
            offerSpread: offerSpread,
            fK_AssetTypeID: 0,
            fK_UserID: 0,
            fK_BankID: 1,
            label: category,
            value: categoryId,
          };
          setAllCategories((prevCategories) => [
            ...prevCategories,
            newCategory,
          ]);
          dispatch(categoryisAdded(null));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isCategoryAdded]);

  useEffect(() => {
    if (isCategoryUpdated !== null && categoryValue.value !== 0) {
      const {
        category: { categoryId, offerSpread, bidSpread, category },
      } = isCategoryUpdated;

      // Update selected category if it matches the updated one
      if (categoryValue.value === categoryId) {
        const updatedCategoryValue = {
          value: categoryId,
          label: category,
        };
        dispatch(setCategoryValue(updatedCategoryValue));
      }

      // Update the allCategories list
      setAllCategories((prevCategories) =>
        prevCategories.map((categoryObj) => {
          if (categoryObj.value === categoryId) {
            return {
              ...categoryObj,
              categoryID: categoryId,
              categoryName: category,
              bidSpread,
              offerSpread,
              label: category,
              value: categoryId,
            };
          }
          return categoryObj;
        })
      );

      // Reset the updated state
      dispatch(categoryisUpdated(null));
    }
  }, [isCategoryUpdated, categoryValue]);

  useEffect(() => {
    if (isCategoryDeleted !== null && categoryValue.value !== 0) {
      const { categoryID } = isCategoryDeleted;

      setAllCategories((prevCategories) => {
        const updatedCategories = prevCategories.filter(
          (categoryObj) => categoryObj.value !== categoryID
        );

        // If the deleted category is the currently selected one, update selection
        if (
          categoryValue.value === categoryID &&
          updatedCategories.length > 0
        ) {
          const defaultCategory = {
            value: updatedCategories[0].value,
            label: updatedCategories[0].label,
          };
          dispatch(setCategoryValue(defaultCategory));
        }

        return updatedCategories;
      });

      dispatch(categoryisDeleted(null));
    }
  }, [isCategoryDeleted, categoryValue]);

  return (
    <>
      <div className="site-header pt-1">
        <div className="container-fluid page-gutter">
          <div className="header-inner d-flex align-items-center">
            <SiteLogoComponent />
            <div className="ms-auto">
              <div className="d-flex align-items-center gap-2">
                {shouldIncludeTreasury &&
                location.pathname === "/BOP/treasury" &&
                outStandingData.length !== 0 ? (
                  <>
                    <section className="position-relative">
                      <IconElement
                        iconClass={
                          "icon-clock fs-4 color-red px-2 cursor-pointer"
                        }
                        onClick={() => setViewCurrentDeals(!viewCurrentDeals)}
                      />
                      {viewCurrentDeals && (
                        <ViewCurrentDeals
                          setOutStandingData={setOutStandingData}
                          outStandingData={outStandingData}
                        />
                      )}
                    </section>
                  </>
                ) : null}
                {location.pathname !== "/calculator" ? (
                  <>
                    {(shouldIncludeCorporate || shouldIncludeBranch) && (
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
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRfqModalOpen && <RFQModal />}
      {/* <DealViewModal /> */}
      {/* <DiscountingRFQQuoteModal /> */}
      {/* <ForwardRFQQuoteModal /> */}

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
      {settingModalState && <SettingModal />}
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
